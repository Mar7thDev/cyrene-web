import { redeemInviteAction } from "./actions";

const ERRORS: Record<string, string> = {
  invalid: "That invite code doesn't exist.",
  expired: "That invite code has expired.",
  exhausted: "That invite code has no uses left.",
  not_pending: "Your account doesn't need activation.",
};

export default function InviteForm({ error, next }: { error?: string; next?: string }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-sky-500">
        Activate your account
      </h1>
      <p className="text-sm text-base-content/60 text-center">
        Registration is invite-only right now. Enter an invite code to finish signing up.
      </p>
      {error && <div className="alert alert-error text-sm">{ERRORS[error] ?? "Activation failed."}</div>}
      <form action={redeemInviteAction} className="flex flex-col gap-3">
        {next && <input type="hidden" name="next" value={next} />}
        <input
          name="code"
          type="text"
          required
          placeholder="CYRENE-XXXX-XXXX"
          className="input input-bordered w-full font-mono text-center uppercase"
          autoComplete="off"
        />
        <button className="btn bg-linear-to-r from-pink-500 to-sky-500 border-none text-white">Activate</button>
      </form>
    </div>
  );
}
