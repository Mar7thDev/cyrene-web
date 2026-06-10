import Link from "next/link";
import { Download, Newspaper } from "lucide-react";

const RELEASES_URL = "https://github.com/Mar7thDev/CyreneLauncher/releases/latest";
const DISCORD_URL = "https://discord.gg/CyreneEchoes";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-16">
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-violet-500 to-sky-500">
        Cyrene Launcher
      </h1>
      <p className="max-w-xl text-base-content/60">
        A clean, fast launcher for Honkai: Star Rail private servers — one click to patch and play,
        with news, language packs, and client updates built in.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={RELEASES_URL}
          className="btn btn-lg bg-linear-to-r from-pink-500 via-violet-500 to-sky-500 border-none text-white shadow-lg shadow-pink-300/50"
        >
          <Download className="w-5 h-5" /> Download for Windows
        </a>
        <Link href="/news" className="btn btn-lg btn-ghost border border-pink-200 bg-white/60">
          <Newspaper className="w-5 h-5" /> News
        </Link>
      </div>
      <a href={DISCORD_URL} className="link link-hover text-sm text-base-content/50">
        Join our Discord →
      </a>
    </div>
  );
}
