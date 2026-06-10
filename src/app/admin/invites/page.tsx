import { desc } from "drizzle-orm";
import { db } from "@/db";
import { invites } from "@/db/schema";
import { createInvite, revokeInvite } from "../actions";

export const metadata = { title: "Invites" };
export const dynamic = "force-dynamic";

export default async function AdminInvitesPage() {
  const allInvites = await db.query.invites.findMany({ orderBy: [desc(invites.createdAt)] });
  const now = new Date();

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
        <h1 className="text-xl font-bold mb-4">Create invite</h1>
        <form action={createInvite} className="flex flex-wrap items-end gap-3">
          <label className="form-control">
            <span className="label-text text-xs mb-1">Max uses</span>
            <input name="maxUses" type="number" min={1} defaultValue={1} className="input input-sm input-bordered w-24" />
          </label>
          <label className="form-control">
            <span className="label-text text-xs mb-1">Expires (days, 0 = never)</span>
            <input name="expiresDays" type="number" min={0} defaultValue={7} className="input input-sm input-bordered w-32" />
          </label>
          <label className="form-control flex-1 min-w-40">
            <span className="label-text text-xs mb-1">Note</span>
            <input name="note" type="text" placeholder="optional" className="input input-sm input-bordered w-full" />
          </label>
          <button className="btn btn-sm bg-linear-to-r from-pink-500 to-sky-500 border-none text-white">Generate</button>
        </form>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
        <h2 className="text-xl font-bold mb-4">Invites ({allInvites.length})</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Code</th>
                <th>Uses</th>
                <th>Expires</th>
                <th>Note</th>
                <th>State</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allInvites.map((inv) => {
                const expired = !!inv.expiresAt && inv.expiresAt < now;
                const exhausted = inv.usedCount >= inv.maxUses;
                const state = inv.revoked ? "revoked" : expired ? "expired" : exhausted ? "used up" : "active";
                return (
                  <tr key={inv.id}>
                    <td className="font-mono">{inv.code}</td>
                    <td>{inv.usedCount} / {inv.maxUses}</td>
                    <td className="text-xs">{inv.expiresAt ? inv.expiresAt.toISOString().slice(0, 10) : "never"}</td>
                    <td className="text-xs">{inv.note ?? "—"}</td>
                    <td>
                      <span className={`badge badge-sm ${state === "active" ? "badge-success" : "badge-ghost"}`}>{state}</span>
                    </td>
                    <td className="text-right">
                      {state === "active" && (
                        <form action={revokeInvite.bind(null, inv.id)}>
                          <button className="btn btn-xs btn-error btn-outline">Revoke</button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
