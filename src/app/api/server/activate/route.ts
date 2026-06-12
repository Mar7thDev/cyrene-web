import { NextResponse } from "next/server";
import { createPrivateKey, sign as cryptoSign } from "node:crypto";
import { eq } from "drizzle-orm";
import { authenticateLauncher, launcherError } from "@/lib/launcher-auth";
import { db } from "@/db";
import { launcherTokens } from "@/db/schema";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const HWID_RE = /^[0-9a-f]{64}$/; // SHA-256 hex (32 bytes)
const NONCE_RE = /^[0-9a-f]{48}$/; // 24-byte client nonce
const MAGIC = Buffer.from("M7HACT01", "ascii");
const TTL_SECONDS = 3600;

// Server startup activation gate. The server proves possession of a valid
// launcher token, the token binds to the first server HWID it activates, and
// we return an ECDSA P-256 (SHA-256, IEEE-P1363) signature over
// {magic|hwid|nonce|exp}. The server verifies it with its embedded public key,
// so a forged (MITM'd / localhost) activation response is useless — the
// attacker has no signing key. This is a deterrent gate, not an unbreakable lock.
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`activate:${ip}`, 20, 60_000)) return launcherError("slow_down", 429);

  const auth = await authenticateLauncher(req);
  if (!auth.ok) return launcherError(auth.error, auth.error === "unauthorized" ? 401 : 403);

  let body: { hwid?: unknown; nonce?: unknown; version?: unknown };
  try {
    body = await req.json();
  } catch {
    return launcherError("bad_request", 400);
  }
  const hwid = String(body.hwid ?? "").toLowerCase();
  const nonceHex = String(body.nonce ?? "").toLowerCase();
  if (!HWID_RE.test(hwid) || !NONCE_RE.test(nonceHex)) return launcherError("bad_request", 400);

  const skB64 = process.env.ACTIVATION_SIGN_SK;
  if (!skB64) return launcherError("server_misconfigured", 500);
  let signingKey;
  try {
    signingKey = createPrivateKey({
      key: Buffer.from(skB64, "base64"),
      format: "der",
      type: "pkcs8",
    });
  } catch {
    return launcherError("server_misconfigured", 500);
  }

  // Bind the launcher token to the first server HWID that activates with it;
  // reject activations of the same token from a different machine.
  const rows = await db
    .select({ serverHwid: launcherTokens.serverHwid })
    .from(launcherTokens)
    .where(eq(launcherTokens.id, auth.tokenId))
    .limit(1);
  const bound = rows[0]?.serverHwid ?? null;
  if (bound && bound !== hwid) return launcherError("hwid_mismatch", 403);
  if (!bound) {
    await db
      .update(launcherTokens)
      .set({ serverHwid: hwid, serverActivatedAt: new Date() })
      .where(eq(launcherTokens.id, auth.tokenId));
  }

  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const expBuf = Buffer.alloc(8);
  expBuf.writeBigInt64LE(BigInt(exp));
  const msg = Buffer.concat([
    MAGIC,
    Buffer.from(hwid, "hex"),
    Buffer.from(nonceHex, "hex"),
    expBuf,
  ]);
  const sig = cryptoSign("sha256", msg, { key: signingKey, dsaEncoding: "ieee-p1363" });

  return NextResponse.json({
    hwid,
    nonce: nonceHex,
    exp,
    sig: sig.toString("base64"),
  });
}
