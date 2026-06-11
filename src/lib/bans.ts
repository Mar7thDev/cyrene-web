import { and, eq, or } from "drizzle-orm";
import { db } from "@/db";
import { bans, launcherTokens, users, type BanKind } from "@/db/schema";

/** True if the given device fingerprint or IP is on the blocklist. */
export async function isBanned({
  deviceId,
  ip,
}: {
  deviceId?: string | null;
  ip?: string | null;
}): Promise<boolean> {
  const conds = [];
  if (deviceId) conds.push(and(eq(bans.kind, "device"), eq(bans.value, deviceId)));
  if (ip && ip !== "unknown") conds.push(and(eq(bans.kind, "ip"), eq(bans.value, ip)));
  if (conds.length === 0) return false;
  const hit = await db.select({ id: bans.id }).from(bans).where(or(...conds)).limit(1);
  return hit.length > 0;
}

/**
 * Bans every device fingerprint and IP ever seen for this user
 * (launcher tokens + last heartbeat IP). Called when an account is banned.
 */
export async function banUserArtifacts(userId: string, reason?: string) {
  const tokens = await db.select().from(launcherTokens).where(eq(launcherTokens.userId, userId));
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

  const rows: { kind: BanKind; value: string; userId: string; reason: string | null }[] = [];
  const seen = new Set<string>();
  const add = (kind: BanKind, value: string | null | undefined) => {
    if (!value || value === "unknown") return;
    const key = `${kind}:${value}`;
    if (seen.has(key)) return;
    seen.add(key);
    rows.push({ kind, value, userId, reason: reason ?? null });
  };

  for (const t of tokens) {
    add("device", t.deviceId);
    add("ip", t.lastIp);
  }
  add("ip", user?.lastIp);

  if (rows.length > 0) await db.insert(bans).values(rows).onConflictDoNothing();
}

/** Lifts all device/IP bans that were created for this user. */
export async function unbanUserArtifacts(userId: string) {
  await db.delete(bans).where(eq(bans.userId, userId));
}
