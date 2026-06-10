"use server";

import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { deviceCodes } from "@/db/schema";
import { redeemInvite } from "@/lib/invites";

export async function redeemInviteAction(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/activate");
  const code = String(formData.get("code") ?? "");
  const result = await redeemInvite(session.user.id, code);
  const next = String(formData.get("next") ?? "");
  if (result === "ok") {
    redirect(next || "/profile");
  }
  redirect(`/activate?error=${result}${next ? `&next=${encodeURIComponent(next)}` : ""}`);
}

async function resolveDevice(userCode: string) {
  const session = await auth();
  if (!session?.user || session.user.status !== "active") redirect("/activate");
  const dc = await db.query.deviceCodes.findFirst({
    where: and(eq(deviceCodes.userCode, userCode), eq(deviceCodes.status, "pending")),
  });
  if (!dc || dc.expiresAt < new Date()) {
    redirect(`/activate?code=${encodeURIComponent(userCode)}&error=device_gone`);
  }
  return { dc, session };
}

export async function approveDeviceAction(userCode: string) {
  const { dc, session } = await resolveDevice(userCode);
  await db
    .update(deviceCodes)
    .set({ status: "approved", userId: session.user.id })
    .where(eq(deviceCodes.id, dc.id));
  redirect(`/activate?code=${encodeURIComponent(userCode)}&done=approved`);
}

export async function denyDeviceAction(userCode: string) {
  const { dc } = await resolveDevice(userCode);
  await db.update(deviceCodes).set({ status: "denied" }).where(eq(deviceCodes.id, dc.id));
  redirect(`/activate?code=${encodeURIComponent(userCode)}&done=denied`);
}
