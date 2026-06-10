import { desc } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { isOnline } from "@/lib/presence";
import { auth } from "@/auth";
import { setUserRole, setUserStatus } from "../actions";

export const metadata = { title: "Users" };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  const allUsers = await db.query.users.findMany({ orderBy: [desc(users.createdAt)] });
  const onlineCount = allUsers.filter((u) => isOnline(u.lastSeenAt)).length;

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Users ({allUsers.length})</h1>
        <span className="badge badge-info">{onlineCount} online</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Role</th>
              <th>Launcher</th>
              <th>Last seen</th>
              <th>Joined</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => {
              const self = u.id === session?.user.id;
              return (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-7 rounded-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={u.image ?? "/avatar-fallback.svg"} alt="" />
                        </div>
                      </div>
                      <span className="font-medium">{u.name}</span>
                      {isOnline(u.lastSeenAt) && <span className="w-2 h-2 rounded-full bg-success inline-block" title="online" />}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-sm ${u.status === "active" ? "badge-success" : u.status === "pending" ? "badge-warning" : "badge-error"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>{u.role}</td>
                  <td className="text-xs">{u.launcherVersion ? `${u.launcherVersion} / ${u.os ?? "?"}` : "—"}</td>
                  <td className="text-xs">{u.lastSeenAt ? u.lastSeenAt.toISOString().replace("T", " ").slice(0, 16) : "—"}</td>
                  <td className="text-xs">{u.createdAt.toISOString().slice(0, 10)}</td>
                  <td>
                    {!self && (
                      <div className="flex gap-1 justify-end">
                        {u.status === "pending" && (
                          <form action={setUserStatus.bind(null, u.id, "active")}>
                            <button className="btn btn-xs btn-success btn-outline">Approve</button>
                          </form>
                        )}
                        {u.status !== "banned" ? (
                          <form action={setUserStatus.bind(null, u.id, "banned")}>
                            <button className="btn btn-xs btn-error btn-outline">Ban</button>
                          </form>
                        ) : (
                          <form action={setUserStatus.bind(null, u.id, "active")}>
                            <button className="btn btn-xs btn-success btn-outline">Unban</button>
                          </form>
                        )}
                        {u.role === "user" ? (
                          <form action={setUserRole.bind(null, u.id, "admin")}>
                            <button className="btn btn-xs btn-outline">Make admin</button>
                          </form>
                        ) : (
                          <form action={setUserRole.bind(null, u.id, "user")}>
                            <button className="btn btn-xs btn-outline">Demote</button>
                          </form>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
