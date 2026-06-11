import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { deviceCodes, launcherTokens, users } from "@/db/schema";
import { newLauncherToken, sha256 } from "@/lib/launcher-auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { isBanned } from "@/lib/bans";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!rateLimit(`device-token:${clientIp(req)}`, 30, 60_000)) {
    return NextResponse.json({ error: "slow_down" }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const deviceCode = String(body.device_code ?? "");
  if (!deviceCode) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const dc = await db.query.deviceCodes.findFirst({
    where: eq(deviceCodes.deviceCodeHash, sha256(deviceCode)),
  });
  if (!dc) return NextResponse.json({ error: "invalid_grant" }, { status: 400 });

  if (dc.expiresAt < new Date() || dc.status === "expired") {
    return NextResponse.json({ error: "expired_token" }, { status: 400 });
  }
  if (dc.status === "denied") {
    return NextResponse.json({ error: "access_denied" }, { status: 400 });
  }
  if (dc.status === "consumed") {
    return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
  }
  if (dc.status === "pending" || !dc.userId) {
    return NextResponse.json({ error: "authorization_pending" }, { status: 400 });
  }

  const user = await db.query.users.findFirst({ where: eq(users.id, dc.userId) });
  if (!user) return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
  if (user.status === "banned") return NextResponse.json({ error: "account_banned" }, { status: 403 });
  if (user.status === "pending") return NextResponse.json({ error: "account_pending" }, { status: 403 });

  const ip = clientIp(req);
  if (await isBanned({ deviceId: dc.clientInfo?.deviceId, ip })) {
    return NextResponse.json({ error: "account_banned" }, { status: 403 });
  }

  const token = newLauncherToken();
  await db.insert(launcherTokens).values({
    userId: user.id,
    tokenHash: sha256(token),
    deviceName: dc.clientInfo?.hostname || null,
    deviceId: dc.clientInfo?.deviceId || null,
    lastIp: ip === "unknown" ? null : ip,
  });
  await db.update(deviceCodes).set({ status: "consumed" }).where(eq(deviceCodes.id, dc.id));

  return NextResponse.json({
    token,
    user: { id: user.id, name: user.name, image: user.image, role: user.role },
  });
}
