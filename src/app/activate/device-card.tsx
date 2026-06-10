import { Monitor } from "lucide-react";
import type { deviceCodes } from "@/db/schema";
import { approveDeviceAction, denyDeviceAction } from "./actions";

type DeviceCode = typeof deviceCodes.$inferSelect;

export default function DeviceCard({
  device,
  done,
  error,
}: {
  device: DeviceCode | null;
  done?: string;
  error?: string;
}) {
  if (done === "approved") {
    return (
      <Shell>
        <div className="alert alert-success text-sm">Device authorized. You can return to the launcher.</div>
      </Shell>
    );
  }
  if (done === "denied") {
    return (
      <Shell>
        <div className="alert text-sm">Request denied. You can close this page.</div>
      </Shell>
    );
  }
  if (!device || error === "device_gone" || device.expiresAt < new Date() || device.status !== "pending") {
    return (
      <Shell>
        <div className="alert alert-warning text-sm">
          This sign-in request is no longer valid. Start the sign-in again from the launcher.
        </div>
      </Shell>
    );
  }

  const info = device.clientInfo ?? {};
  return (
    <Shell>
      <p className="text-sm text-base-content/60 text-center">
        A launcher is asking to sign in with your account. Only approve if this is you.
      </p>
      <div className="bg-white/80 border border-pink-100 rounded-xl p-4 flex items-center gap-3">
        <Monitor className="text-pink-400 shrink-0" />
        <div className="text-sm">
          <p className="font-semibold">{info.hostname || "Unknown device"}</p>
          <p className="text-base-content/50">
            Cyrene Launcher {info.version || "?"} · {info.os || "?"}
          </p>
          <p className="text-base-content/40 font-mono text-xs mt-1">{device.userCode}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <form action={denyDeviceAction.bind(null, device.userCode)} className="flex-1">
          <button className="btn btn-outline w-full">Deny</button>
        </form>
        <form action={approveDeviceAction.bind(null, device.userCode)} className="flex-1">
          <button className="btn w-full bg-linear-to-r from-pink-500 to-sky-500 border-none text-white">
            Approve
          </button>
        </form>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-sky-500">
        Launcher sign-in
      </h1>
      {children}
    </div>
  );
}
