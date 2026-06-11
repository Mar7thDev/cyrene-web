import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { bans, users } from "@/db/schema";
import { addBan, removeBan } from "../actions";

export const metadata = { title: "Bans" };
export const dynamic = "force-dynamic";

export default async function AdminBansPage() {
  const allBans = await db
    .select({ ban: bans, userName: users.name })
    .from(bans)
    .leftJoin(users, eq(users.id, bans.userId))
    .orderBy(desc(bans.createdAt));

  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
        <h1 className="text-xl font-bold mb-4">Add ban</h1>
        <form action={addBan} className="flex flex-wrap items-end gap-3">
          <label className="form-control">
            <span className="label-text text-xs mb-1">Type</span>
            <select name="kind" className="select select-bordered select-sm w-32">
              <option value="ip">IP</option>
              <option value="device">Device ID</option>
            </select>
          </label>
          <label className="form-control flex-1 min-w-60">
            <span className="label-text text-xs mb-1">Value</span>
            <input name="value" required className="input input-bordered input-sm w-full font-mono" placeholder="1.2.3.4 or sha-256 device id" />
          </label>
          <label className="form-control flex-1 min-w-40">
            <span className="label-text text-xs mb-1">Reason (optional)</span>
            <input name="reason" className="input input-bordered input-sm w-full" />
          </label>
          <button className="btn btn-sm btn-error btn-outline">Ban</button>
        </form>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
        <h1 className="text-xl font-bold mb-4">Device / IP bans ({allBans.length})</h1>
        {allBans.length === 0 ? (
          <p className="text-sm text-base-content/50">
            No bans. Banning a user automatically blocklists their devices and IPs.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Linked user</th>
                  <th>Reason</th>
                  <th>Added</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allBans.map(({ ban, userName }) => (
                  <tr key={ban.id}>
                    <td>
                      <span className={`badge badge-sm ${ban.kind === "ip" ? "badge-info" : "badge-secondary"}`}>
                        {ban.kind}
                      </span>
                    </td>
                    <td className="font-mono text-xs max-w-60 truncate" title={ban.value}>{ban.value}</td>
                    <td className="text-xs">{userName ?? "—"}</td>
                    <td className="text-xs">{ban.reason ?? "—"}</td>
                    <td className="text-xs">{ban.createdAt.toISOString().slice(0, 10)}</td>
                    <td>
                      <div className="flex justify-end">
                        <form action={removeBan.bind(null, ban.id)}>
                          <button className="btn btn-xs btn-outline">Lift</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
