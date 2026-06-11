import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import Reveal from "@/components/reveal";
import { GithubIcon } from "@/components/brand-icons";

export const metadata = { title: "About" };

const GITHUB_URL = "https://github.com/Mar7thDev/CyreneLauncher";
const DISCORD_URL = "https://discord.gg/CyreneEchoes";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl pt-6">
      <div className="fade-up flex flex-col items-center text-center">
        <Image src="/appicon.png" alt="" width={72} height={72} className="rounded-2xl shadow-lg shadow-pink-200/60" />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          About <span className="text-brand">Cyrene</span>
        </h1>
      </div>

      <Reveal className="mt-10">
        <div className="glass-card space-y-4 p-8 leading-relaxed text-base-content/65">
          <p>
            Cyrene Launcher is a free, open-source desktop launcher for Honkai: Star Rail private
            servers, built and maintained by <strong className="text-base-content">Mar7thDev</strong>.
            It takes the fiddly parts of setting up a private server client — patching, configuration,
            language packs, client updates — and turns them into a single click.
          </p>
          <p>
            This website is the launcher&apos;s companion: server news and announcements, account
            management, and device sign-in all live here.
          </p>
          <p>
            The project is a community effort made for learning and preservation purposes. It is not
            affiliated with, endorsed by, or connected to HoYoverse or COGNOSPHERE PTE. LTD. in any way.
            Honkai: Star Rail and all related assets are trademarks of their respective owners.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-6" delay={0.1}>
        <div className="grid gap-4 sm:grid-cols-2">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="glass-card glass-card-hover flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/15 to-violet-500/15 text-pink-600">
              <GithubIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Source code</h2>
              <p className="text-sm text-base-content/50">Star, fork or contribute on GitHub.</p>
            </div>
          </a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="glass-card glass-card-hover flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-500/15 text-violet-600">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Community</h2>
              <p className="text-sm text-base-content/50">Get help and updates on Discord.</p>
            </div>
          </a>
        </div>
      </Reveal>

      <Reveal className="mt-10" delay={0.15}>
        <p className="flex items-center justify-center gap-1.5 text-center text-sm text-base-content/40">
          Made with <Heart className="h-4 w-4 fill-pink-400 text-pink-400" /> by the community.
        </p>
      </Reveal>
    </div>
  );
}
