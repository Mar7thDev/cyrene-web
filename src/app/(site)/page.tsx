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

const RELEASES_URL = "https://github.com/Mar7thDev/CyreneLauncher/releases/latest";
const GITHUB_URL = "https://github.com/Mar7thDev/CyreneLauncher";
const DISCORD_URL = "https://discord.gg/CyreneEchoes";

const features = [
  {
    icon: Rocket,
    title: "One click to play",
    body: "Patch, configure and launch in a single click — no manual file edits, no guesswork.",
  },
  {
    icon: Newspaper,
    title: "News built in",
    body: "Server announcements and game news land right inside the launcher the moment they're published.",
  },
  {
    icon: Languages,
    title: "Language packs",
    body: "Install and switch game text languages without re-downloading the client.",
  },
  {
    icon: RefreshCw,
    title: "Client updates",
    body: "Fetch official client diff packages and keep your installation current.",
  },
  {
    icon: UserRound,
    title: "Account sync",
    body: "Sign in with Discord or GitHub and link the launcher to your account in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Open source",
    body: "Every line of the launcher is public on GitHub. Audit it, fork it, contribute to it.",
  },
];

const steps = [
  {
    title: "Download",
    body: "Grab the latest release for Windows — a single portable executable.",
  },
  {
    title: "Pick a server",
    body: "Choose your game path and server profile. The launcher handles the patching.",
  },
  {
    title: "Play",
    body: "Hit launch. Sign in later to sync your account and see who's online.",
  },
];

export default function LandingPage() {
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
          Launch the stars,
          <br />
          <span className="text-brand">skip the setup.</span>
        </h1>

        <p className="fade-up d2 mt-6 max-w-xl text-lg leading-relaxed text-base-content/55">
          A clean, fast launcher for Honkai: Star Rail private servers — one click to patch and play,
          with news, language packs and client updates built in.
        </p>

        <div className="fade-up d3 mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={RELEASES_URL} className="btn btn-lg btn-brand rounded-2xl px-7">
            <Download className="h-5 w-5" /> Download for Windows
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-lg glass rounded-2xl border-pink-100 px-7 text-base-content/70 hover:border-pink-300 hover:text-pink-600"
          >
            <GithubIcon className="h-5 w-5" /> View source
          </a>
        </div>

        <p className="fade-up d4 mt-6 text-sm text-base-content/40">
          Free · Open source · Windows 10+
        </p>
      </section>

      {/* features */}
      <section>
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Everything in <span className="text-brand">one place</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base-content/50">
            The tedious parts of running a private server client, handled for you.
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
            Up and running in <span className="text-brand">three steps</span>
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
            <h2 className="relative text-3xl font-bold tracking-tight">Ready when you are.</h2>
            <p className="relative mx-auto mt-3 max-w-md text-base-content/55">
              Download the launcher, join the community, and get back to the stars.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={RELEASES_URL} className="btn btn-brand rounded-2xl px-6">
                <Download className="h-4 w-4" /> Download
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost rounded-2xl px-6 text-base-content/60 hover:text-pink-600"
              >
                Join our Discord <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
