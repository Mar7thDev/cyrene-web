import { BookOpen, Download, HelpCircle, LifeBuoy, Link2, Newspaper } from "lucide-react";
import Reveal from "@/components/reveal";

export const metadata = { title: "Docs" };

const DISCORD_URL = "https://discord.gg/CyreneEchoes";

// Placeholder index — individual guides will live at /docs/<slug> as they're written.
const sections = [
  {
    icon: Download,
    title: "Getting started",
    body: "Download, first launch, choosing your game path and server profile.",
  },
  {
    icon: Link2,
    title: "Account & linking",
    body: "Signing in with Discord or GitHub and linking the launcher to your account.",
  },
  {
    icon: Newspaper,
    title: "News & announcements",
    body: "How server announcements reach the launcher and the website.",
  },
  {
    icon: BookOpen,
    title: "Tools",
    body: "Language packs, client updates, and the built-in utilities.",
  },
  {
    icon: LifeBuoy,
    title: "Troubleshooting",
    body: "Common launch issues and how to fix them.",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    body: "Short answers to the questions we get most often.",
  },
];

export default function DocsPage() {
  return (
    <div className="pt-6">
      <div className="fade-up text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-brand">Docs</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base-content/50">
          Guides for installing, configuring and using Cyrene Launcher.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <div className="glass-card relative h-full p-6 opacity-80">
              <span className="absolute right-4 top-4 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-500">
                Coming soon
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/15 via-violet-500/15 to-sky-500/15 text-pink-600">
                <s.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/55">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12" delay={0.1}>
        <p className="text-center text-sm text-base-content/45">
          The docs are still being written — in the meantime, ask on{" "}
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="link-hover text-pink-600 underline">
            Discord
          </a>
          .
        </p>
      </Reveal>
    </div>
  );
}
