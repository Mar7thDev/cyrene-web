import { NextResponse } from "next/server";
import { authenticateLauncher, launcherError } from "@/lib/launcher-auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const result = await authenticateLauncher(req);
  if (!result.ok) {
    return launcherError(result.error, result.error === "unauthorized" ? 401 : 403);
  }
  const { user } = result;
  return NextResponse.json({
    user: { id: user.id, name: user.name, image: user.image, role: user.role },
  });
}
