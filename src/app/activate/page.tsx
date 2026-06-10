import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { deviceCodes } from "@/db/schema";
import Navbar from "@/components/navbar";
import InviteForm from "./invite-form";
import DeviceCard from "./device-card";

export const metadata = { title: "Activate" };
export const dynamic = "force-dynamic";

export default async function ActivatePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; code?: string; done?: string }>;
}) {
  const { error, next, code, done } = await searchParams;
  const session = await auth();

  const selfUrl = `/activate${code ? `?code=${encodeURIComponent(code)}` : next ? `?next=${encodeURIComponent(next)}` : ""}`;
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(selfUrl)}`);
  }

  let content: React.ReactNode;
  if (session.user.status === "banned") {
    content = <div className="alert alert-error">This account has been banned.</div>;
  } else if (session.user.status === "pending") {
    // Must redeem an invite first; come back here afterwards for device approval.
    content = <InviteForm error={error} next={code ? selfUrl : next} />;
  } else if (code) {
    const device = await db.query.deviceCodes.findFirst({
      where: eq(deviceCodes.userCode, code.trim().toUpperCase()),
    });
    content = <DeviceCard device={device ?? null} done={done} error={error} />;
  } else {
    redirect(next || "/profile");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-20">{content}</main>
    </>
  );
}
