import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { authenticateLauncher, launcherError } from "@/lib/launcher-auth";

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
    })
    .where(eq(users.id, result.user.id));

  return NextResponse.json({ ok: true });
}
