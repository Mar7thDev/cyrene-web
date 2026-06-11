import { NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { launcherTokens, users } from "@/db/schema";
import { authenticateLauncher, launcherError, normalizeDeviceId } from "@/lib/launcher-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const result = await authenticateLauncher(req);
  if (!result.ok) {
    return launcherError(result.error, result.error === "unauthorized" ? 401 : 403);
  }

  const body = await req.json().catch(() => ({}));
  await db
    .update(users)
    .set({
      lastSeenAt: new Date(),
      launcherVersion: String(body.version ?? "").slice(0, 40) || null,
      os: String(body.os ?? "").slice(0, 40) || null,
      lastIp: result.ip === "unknown" ? undefined : result.ip,
    })
    .where(eq(users.id, result.user.id));

  // Backfill the device fingerprint on tokens issued before it was collected.
  const deviceId = normalizeDeviceId(body.device_id);
  if (deviceId) {
    await db
      .update(launcherTokens)
      .set({ deviceId })
      .where(and(eq(launcherTokens.id, result.tokenId), isNull(launcherTokens.deviceId)));
  }

  return NextResponse.json({ ok: true });
}
