import { BookOpen, Download, HelpCircle, LifeBuoy, Link2, Newspaper } from "lucide-react";
import Reveal from "@/components/reveal";
import { getDict } from "@/lib/i18n";

export async function generateMetadata() {
  const { t } = await getDict();
  return { title: t.docs.metaTitle };
}

const DISCORD_URL = "https://discord.gg/CyreneEchoes";

export default async function DocsPage() {
  const { t } = await getDict();
  const d = t.docs;

  // Placeholder index — individual guides will live at /docs/<slug> as they're written.
  const sections = [
    { icon: Download, ...d.sections.gettingStarted },
    { icon: Link2, ...d.sections.account },
    { icon: Newspaper, ...d.sections.news },
    { icon: BookOpen, ...d.sections.tools },
    { icon: LifeBuoy, ...d.sections.troubleshooting },
    { icon: HelpCircle, ...d.sections.faq },
  ];

  return (
    <div className="pt-6">
      <div className="fade-up text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-brand">{d.title}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base-content/50">
          {d.subtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <div className="glass-card relative h-full p-6 opacity-80">
              <span className="absolute right-4 top-4 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-500">
                {d.comingSoon}
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
          {d.stillWritingBefore}
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="link-hover text-pink-600 underline">
            Discord
          </a>
          {d.stillWritingAfter}
        </p>
      </Reveal>
    </div>
  );
}
