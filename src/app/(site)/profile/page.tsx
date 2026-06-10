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
    <div className="mx-auto max-w-lg">
      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="avatar">
            <div className="w-16 rounded-full ring-2 ring-pink-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.image ?? "/avatar-fallback.svg"} alt={user.name ?? "avatar"} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="flex gap-2 mt-1">
              <span className={`badge badge-sm ${user.status === "active" ? "badge-success" : user.status === "pending" ? "badge-warning" : "badge-error"}`}>
                {user.status}
              </span>
              {user.role === "admin" && <span className="badge badge-sm badge-secondary">admin</span>}
              {isOnline(user.lastSeenAt) && <span className="badge badge-sm badge-info">online</span>}
            </div>
          </div>
        </div>

        {user.status === "pending" && (
          <div className="alert alert-warning text-sm mb-4">
            Your account is awaiting activation. Enter an invite code on the{" "}
            <a href="/activate" className="link">activation page</a>.
          </div>
        )}

        <div className="space-y-2 text-sm">
          <Row label="Linked accounts" value={linked.map((a) => a.provider).join(", ") || "—"} />
          <Row label="Joined" value={user.createdAt.toISOString().slice(0, 10)} />
          <Row label="Last seen" value={user.lastSeenAt ? user.lastSeenAt.toISOString().replace("T", " ").slice(0, 16) + " UTC" : "—"} />
          <Row label="Launcher" value={user.launcherVersion ? `${user.launcherVersion} (${user.os ?? "?"})` : "Not linked yet"} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-pink-100/60 pb-2">
      <span className="text-base-content/50">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
