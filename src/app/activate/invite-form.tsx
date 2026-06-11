import { redeemInviteAction } from "./actions";

const ERRORS: Record<string, string> = {
  invalid: "That invite code doesn't exist.",
  expired: "That invite code has expired.",
  exhausted: "That invite code has no uses left.",
  not_pending: "Your account doesn't need activation.",
};

export default function InviteForm({ error, next }: { error?: string; next?: string }) {
  return (
    <div className="glass-card fade-up flex flex-col gap-4 p-8">
      <h1 className="text-brand text-center text-2xl font-bold tracking-tight">
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
        <button className="btn btn-brand rounded-xl">Activate</button>
      </form>
    </div>
  );
}
