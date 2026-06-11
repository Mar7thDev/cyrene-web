import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import Reveal from "@/components/reveal";
import { GithubIcon } from "@/components/brand-icons";
import { getDict } from "@/lib/i18n";

export async function generateMetadata() {
  const { t } = await getDict();
  return { title: t.about.metaTitle };
}

const GITHUB_URL = "https://github.com/Mar7thDev/CyreneLauncher";
const DISCORD_URL = "https://discord.gg/CyreneEchoes";

export default async function AboutPage() {
  const { t } = await getDict();
  const a = t.about;

  return (
    <div className="mx-auto max-w-2xl pt-6">
      <div className="fade-up flex flex-col items-center text-center">
        <Image src="/appicon.png" alt="" width={72} height={72} className="rounded-2xl shadow-lg shadow-pink-200/60" />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          {a.titleA} <span className="text-brand">{a.titleB}</span>
        </h1>
      </div>

      <Reveal className="mt-10">
        <div className="glass-card space-y-4 p-8 leading-relaxed text-base-content/65">
          <p>
            {a.p1a}
            <strong className="text-base-content">{a.p1b}</strong>
            {a.p1c}
          </p>
          <p>{a.p2}</p>
          <p>{a.p3}</p>
        </div>
      </Reveal>

      <Reveal className="mt-6" delay={0.1}>
        <div className="grid gap-4 sm:grid-cols-2">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="glass-card glass-card-hover flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/15 to-violet-500/15 text-pink-600">
              <GithubIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">{a.sourceTitle}</h2>
              <p className="text-sm text-base-content/50">{a.sourceBody}</p>
            </div>
          </a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="glass-card glass-card-hover flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-500/15 text-violet-600">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">{a.communityTitle}</h2>
              <p className="text-sm text-base-content/50">{a.communityBody}</p>
            </div>
          </a>
        </div>
      </Reveal>

      <Reveal className="mt-10" delay={0.15}>
        <p className="flex items-center justify-center gap-1.5 text-center text-sm text-base-content/40">
          {a.madeWith} <Heart className="h-4 w-4 fill-pink-400 text-pink-400" /> {a.byCommunity}
        </p>
      </Reveal>
    </div>
  );
}
