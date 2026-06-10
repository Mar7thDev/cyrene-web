"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { invites, launcherTokens, sessions, users, type UserRole, type UserStatus, type RegistrationMode } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { generateInviteCode } from "@/lib/invites";
import { setSetting } from "@/lib/settings";

export async function setUserStatus(userId: string, status: UserStatus) {
  const session = await requireAdmin();
  if (userId === session.user.id) throw new Error("You cannot change your own status");
  await db.update(users).set({ status }).where(eq(users.id, userId));
  if (status === "banned") {
    // Revoke web sessions and launcher tokens immediately.
    await db.delete(sessions).where(eq(sessions.userId, userId));
    await db
      .update(launcherTokens)
      .set({ revokedAt: new Date() })
      .where(eq(launcherTokens.userId, userId));
  }
  revalidatePath("/admin/users");
}

export async function setUserRole(userId: string, role: UserRole) {
  const session = await requireAdmin();
  if (userId === session.user.id) throw new Error("You cannot change your own role");
  await db.update(users).set({ role }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
}

export async function createInvite(formData: FormData) {
  const session = await requireAdmin();
  const maxUses = Math.max(1, parseInt(String(formData.get("maxUses") ?? "1"), 10) || 1);
  const days = parseInt(String(formData.get("expiresDays") ?? "0"), 10) || 0;
  const note = String(formData.get("note") ?? "").trim() || null;
  await db.insert(invites).values({
    code: generateInviteCode(),
    maxUses,
    expiresAt: days > 0 ? new Date(Date.now() + days * 86400_000) : null,
    note,
    createdBy: session.user.id,
  });
  revalidatePath("/admin/invites");
}

export async function revokeInvite(inviteId: string) {
  await requireAdmin();
  await db.update(invites).set({ revoked: true }).where(eq(invites.id, inviteId));
  revalidatePath("/admin/invites");
}

export async function updateRegistrationMode(mode: RegistrationMode) {
  await requireAdmin();
  await setSetting("registration_mode", mode);
  revalidatePath("/admin/settings");
}

export async function updateDiscordWebhook(formData: FormData) {
  await requireAdmin();
  const url = String(formData.get("webhookUrl") ?? "").trim();
  if (url && !url.startsWith("https://discord.com/api/webhooks/")) {
    throw new Error("Invalid Discord webhook URL");
  }
  await setSetting("discord_webhook_url", url);
  revalidatePath("/admin/settings");
}
