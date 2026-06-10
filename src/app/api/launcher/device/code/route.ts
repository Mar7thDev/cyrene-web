import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { deviceCodes } from "@/db/schema";
import { sha256 } from "@/lib/launcher-auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getBaseUrl } from "@/lib/base-url";

export const dynamic = "force-dynamic";

const EXPIRES_IN = 600; // seconds
const INTERVAL = 5;

// Crockford base32 without ambiguous characters.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function userCode(): string {
  const bytes = randomBytes(8);
  let out = "";
  for (let i = 0; i < 8; i++) {
    if (i === 4) out += "-";
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

export async function POST(req: Request) {
  if (!rateLimit(`device-code:${clientIp(req)}`, 10, 60_000)) {
    return NextResponse.json({ error: "slow_down" }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const clientInfo = {
    version: String(body.version ?? "").slice(0, 40),
    os: String(body.os ?? "").slice(0, 40),
    hostname: String(body.hostname ?? "").slice(0, 80),
  };

  const deviceCode = randomBytes(32).toString("hex");
  const code = userCode();
  await db.insert(deviceCodes).values({
    deviceCodeHash: sha256(deviceCode),
    userCode: code,
    clientInfo,
    expiresAt: new Date(Date.now() + EXPIRES_IN * 1000),
  });

  return NextResponse.json({
    device_code: deviceCode,
    user_code: code,
    verification_uri_complete: `${getBaseUrl()}/activate?code=${code}`,
    expires_in: EXPIRES_IN,
    interval: INTERVAL,
  });
}
