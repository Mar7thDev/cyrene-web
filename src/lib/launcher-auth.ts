import { createHash, randomBytes } from "node:crypto";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { launcherTokens, users, type User } from "@/db/schema";
import { isBanned } from "@/lib/bans";
import { clientIp } from "@/lib/rate-limit";

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function newLauncherToken(): string {
  return `clt_${randomBytes(32).toString("hex")}`;
}

/** Device fingerprints are SHA-256 hex; anything else is dropped. */
export function normalizeDeviceId(value: unknown): string | null {
  const v = String(value ?? "").toLowerCase();
  return /^[0-9a-f]{64}$/.test(v) ? v : null;
}

export type LauncherAuthResult =
  | { ok: true; user: User; tokenId: string; ip: string }
  | { ok: false; error: "unauthorized" | "account_banned" | "account_pending" };

// Validates the launcher's Bearer token: hash match, not revoked, user not
// banned, and neither the device fingerprint nor the caller IP blocklisted.
export async function authenticateLauncher(req: Request): Promise<LauncherAuthResult> {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token.startsWith("clt_")) return { ok: false, error: "unauthorized" };

  const row = await db
    .select({ token: launcherTokens, user: users })
    .from(launcherTokens)
    .innerJoin(users, eq(users.id, launcherTokens.userId))
    .where(and(eq(launcherTokens.tokenHash, sha256(token)), isNull(launcherTokens.revokedAt)))
    .limit(1);
  if (row.length === 0) return { ok: false, error: "unauthorized" };

  const { token: tokenRow, user } = row[0];
  if (user.status === "banned") return { ok: false, error: "account_banned" };
  if (user.status === "pending") return { ok: false, error: "account_pending" };

  const ip = clientIp(req);
  if (await isBanned({ deviceId: tokenRow.deviceId, ip })) {
    return { ok: false, error: "account_banned" };
  }

  await db
    .update(launcherTokens)
    .set({ lastUsedAt: new Date(), lastIp: ip === "unknown" ? tokenRow.lastIp : ip })
    .where(eq(launcherTokens.id, tokenRow.id));

  return { ok: true, user, tokenId: tokenRow.id, ip };
}

export function launcherError(error: string, status: number): Response {
  return Response.json({ error }, { status });
}
