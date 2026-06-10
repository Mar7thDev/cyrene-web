import { getDiscordWebhookUrl, getRegistrationMode } from "@/lib/settings";
import type { RegistrationMode } from "@/db/schema";
import { updateDiscordWebhook, updateRegistrationMode } from "../actions";

export const metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

const MODES: { value: RegistrationMode; label: string; desc: string }[] = [
  { value: "open", label: "Open", desc: "Anyone can sign up with Discord or GitHub." },
  { value: "invite", label: "Invite only", desc: "New accounts stay pending until they redeem an invite code." },
  { value: "closed", label: "Closed", desc: "No new sign-ups. Existing users can still sign in." },
];

export default async function AdminSettingsPage() {
  const [mode, webhookUrl] = await Promise.all([getRegistrationMode(), getDiscordWebhookUrl()]);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
        <h1 className="text-xl font-bold mb-1">Registration</h1>
        <p className="text-sm text-base-content/50 mb-4">Controls how new users can join.</p>
        <div className="flex flex-col gap-2">
          {MODES.map((m) => (
            <form key={m.value} action={updateRegistrationMode.bind(null, m.value)}>
              <button
                type="submit"
                className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                  mode === m.value
                    ? "bg-linear-to-r from-pink-500 to-sky-500 text-white border-transparent shadow-md"
                    : "bg-white hover:bg-pink-50 border-pink-200/60"
                }`}
              >
                <span className="font-semibold w-24 shrink-0">{m.label}</span>
                <span className={`text-sm ${mode === m.value ? "text-white/80" : "text-base-content/50"}`}>{m.desc}</span>
              </button>
            </form>
          ))}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
        <h2 className="text-xl font-bold mb-1">Discord webhook</h2>
        <p className="text-sm text-base-content/50 mb-4">Published news is announced to this channel. Leave empty to disable.</p>
        <form action={updateDiscordWebhook} className="flex gap-2">
          <input
            name="webhookUrl"
            type="url"
            defaultValue={webhookUrl}
            placeholder="https://discord.com/api/webhooks/…"
            className="input input-sm input-bordered flex-1"
          />
          <button className="btn btn-sm bg-linear-to-r from-pink-500 to-sky-500 border-none text-white">Save</button>
        </form>
      </div>
    </div>
  );
}
