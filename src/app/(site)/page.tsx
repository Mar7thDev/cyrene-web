import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Languages,
  Newspaper,
  RefreshCw,
  Rocket,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Reveal from "@/components/reveal";
import { GithubIcon } from "@/components/brand-icons";
import { getDict } from "@/lib/i18n";

const RELEASES_URL = "https://github.com/Mar7thDev/CyreneLauncher/releases/latest";
const GITHUB_URL = "https://github.com/Mar7thDev/CyreneLauncher";
const DISCORD_URL = "https://discord.gg/CyreneEchoes";

export async function generateMetadata() {
  const { t } = await getDict();
  // `absolute` bypasses the "%s · Cyrene Launcher" template from the root layout.
  return { title: { absolute: t.home.metaTitle } };
}

export default async function LandingPage() {
  const { t } = await getDict();
  const h = t.home;

  const features = [
    { icon: Rocket, ...h.features.oneClick },
    { icon: Newspaper, ...h.features.news },
    { icon: Languages, ...h.features.languagePacks },
    { icon: RefreshCw, ...h.features.clientUpdates },
    { icon: UserRound, ...h.features.accountSync },
    { icon: ShieldCheck, ...h.features.openSource },
  ];

  const steps = [h.steps.download, h.steps.pickServer, h.steps.play];

  return (
    <div className="flex flex-col gap-28 pb-8">
      {/* hero */}
      <section className="flex flex-col items-center pt-16 text-center sm:pt-24">
        <div className="fade-up">
          <Image
            src="/appicon.png"
            alt=""
            width={84}
            height={84}
            priority
            className="rounded-3xl shadow-xl shadow-pink-200/60 ring-1 ring-white/80"
          />
        </div>

        <h1 className="fade-up d1 mt-8 max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
          {h.heroTitleLine1}
          <br />
          <span className="text-brand">{h.heroTitleLine2}</span>
        </h1>

        <p className="fade-up d2 mt-6 max-w-xl text-lg leading-relaxed text-base-content/55">
          {h.heroSubtitle}
        </p>

        <div className="fade-up d3 mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={RELEASES_URL} className="btn btn-lg btn-brand rounded-2xl px-7">
            <Download className="h-5 w-5" /> {h.downloadWindows}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-lg glass rounded-2xl border-pink-100 px-7 text-base-content/70 hover:border-pink-300 hover:text-pink-600"
          >
            <GithubIcon className="h-5 w-5" /> {h.viewSource}
          </a>
        </div>

        <p className="fade-up d4 mt-6 text-sm text-base-content/40">
          {h.heroNote}
        </p>
      </section>

      {/* features */}
      <section>
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {h.featuresTitleA}<span className="text-brand">{h.featuresTitleB}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base-content/50">
            {h.featuresSubtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <div className="glass-card glass-card-hover h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/15 via-violet-500/15 to-sky-500/15 text-pink-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/55">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* steps */}
      <section>
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {h.stepsTitleA}<span className="text-brand">{h.stepsTitleB}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="glass-card h-full p-6 text-center">
                <span className="text-brand mx-auto block text-4xl font-extrabold">{i + 1}</span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/55">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Reveal>
          <div className="glass-card relative overflow-hidden p-10 text-center sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-500/10 via-violet-500/10 to-sky-500/10"
            />
            <h2 className="relative text-3xl font-bold tracking-tight">{h.ctaTitle}</h2>
            <p className="relative mx-auto mt-3 max-w-md text-base-content/55">
              {h.ctaSubtitle}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={RELEASES_URL} className="btn btn-brand rounded-2xl px-6">
                <Download className="h-4 w-4" /> {h.ctaDownload}
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost rounded-2xl px-6 text-base-content/60 hover:text-pink-600"
              >
                {h.ctaDiscord} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
