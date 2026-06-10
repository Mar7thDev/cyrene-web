import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { launcherTokens } from "@/db/schema";
import { authenticateLauncher, launcherError } from "@/lib/launcher-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const result = await authenticateLauncher(req);
  if (!result.ok) {
    return launcherError(result.error, result.error === "unauthorized" ? 401 : 403);
  }
  await db
    .update(launcherTokens)
    .set({ revokedAt: new Date() })
    .where(eq(launcherTokens.id, result.tokenId));
  return NextResponse.json({ ok: true });
}
