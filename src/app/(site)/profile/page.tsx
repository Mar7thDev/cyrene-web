import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { accounts, users } from "@/db/schema";
import { isOnline } from "@/lib/presence";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/profile");

  const user = await db.query.users.findFirst({ where: eq(users.id, session.user.id) });
  if (!user) redirect("/login");
  const linked = await db.query.accounts.findMany({ where: eq(accounts.userId, user.id) });

  return (
    <div className="fade-up mx-auto max-w-lg pt-6">
      <div className="glass-card overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-pink-400/25 via-violet-400/25 to-sky-400/25" />
        <div className="-mt-10 px-8 pb-8">
          <div className="avatar">
            <div className="w-20 rounded-full shadow-lg ring-4 ring-white/90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.image ?? "/avatar-fallback.svg"} alt={user.name ?? "avatar"} />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">{user.name}</h1>
            <span className={`badge badge-sm ${user.status === "active" ? "badge-success" : user.status === "pending" ? "badge-warning" : "badge-error"} badge-soft`}>
              {user.status}
            </span>
            {user.role === "admin" && <span className="badge badge-sm badge-secondary badge-soft">admin</span>}
            {isOnline(user.lastSeenAt) && (
              <span className="badge badge-sm badge-info badge-soft gap-1">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" /> online
              </span>
            )}
          </div>

          {user.status === "pending" && (
            <div className="alert alert-warning mt-4 text-sm">
              Your account is awaiting activation. Enter an invite code on the{" "}
              <a href="/activate" className="link">activation page</a>.
            </div>
          )}

          <div className="mt-6 space-y-2.5 text-sm">
            <Row label="Linked accounts" value={linked.map((a) => a.provider).join(", ") || "—"} />
            <Row label="Joined" value={user.createdAt.toISOString().slice(0, 10)} />
            <Row label="Last seen" value={user.lastSeenAt ? user.lastSeenAt.toISOString().replace("T", " ").slice(0, 16) + " UTC" : "—"} />
            <Row label="Launcher" value={user.launcherVersion ? `${user.launcherVersion} (${user.os ?? "?"})` : "Not linked yet"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-pink-100/60 pb-2.5">
      <span className="text-base-content/45">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
