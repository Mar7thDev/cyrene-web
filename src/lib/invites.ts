import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { invites, users } from "@/db/schema";

// Crockford base32 without ambiguous characters.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function randomBlock(len: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

export function generateInviteCode(): string {
  return `CYRENE-${randomBlock(4)}-${randomBlock(4)}`;
}

export type RedeemResult = "ok" | "invalid" | "expired" | "exhausted" | "not_pending";

// Activates a pending user with an invite code. The use-count increment is
// guarded in SQL so concurrent redemptions cannot overshoot maxUses.
export async function redeemInvite(userId: string, rawCode: string): Promise<RedeemResult> {
  const code = rawCode.trim().toUpperCase();
  const invite = await db.query.invites.findFirst({
    where: and(eq(invites.code, code), eq(invites.revoked, false)),
  });
  if (!invite) return "invalid";
  if (invite.expiresAt && invite.expiresAt < new Date()) return "expired";
  if (invite.usedCount >= invite.maxUses) return "exhausted";

  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user || user.status !== "pending") return "not_pending";

  const updated = await db
    .update(invites)
    .set({ usedCount: sql`${invites.usedCount} + 1` })
    .where(and(eq(invites.id, invite.id), sql`${invites.usedCount} < ${invite.maxUses}`))
    .returning({ id: invites.id });
  if (updated.length === 0) return "exhausted";

  await db
    .update(users)
    .set({ status: "active", inviteCodeUsed: code })
    .where(eq(users.id, userId));
  return "ok";
}
