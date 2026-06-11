import Link from "next/link";
import Image from "next/image";
import { getDict } from "@/lib/i18n";

const RELEASES_URL = "https://github.com/Mar7thDev/CyreneLauncher/releases/latest";
const GITHUB_URL = "https://github.com/Mar7thDev/CyreneLauncher";
const DISCORD_URL = "https://discord.gg/CyreneEchoes";

export default async function Footer() {
  const { t } = await getDict();
  const f = t.footer;

  const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
      title: f.product,
      links: [
        { label: f.download, href: RELEASES_URL, external: true },
        { label: f.news, href: "/news" },
        { label: f.docs, href: "/docs" },
      ],
    },
    {
      title: f.community,
      links: [
        { label: f.discord, href: DISCORD_URL, external: true },
        { label: f.github, href: GITHUB_URL, external: true },
      ],
    },
    {
      title: f.legal,
      links: [
        { label: f.about, href: "/about" },
        { label: f.terms, href: "/terms" },
        { label: f.privacy, href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-pink-100/70 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/appicon.png" alt="" width={36} height={36} className="rounded-lg shadow-sm" />
              <span className="text-brand font-bold tracking-tight">Cyrene Launcher</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-base-content/45">
              {f.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((l) =>
                    <li key={l.label}>
                      {l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-base-content/60 transition-colors hover:text-pink-600"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-sm text-base-content/60 transition-colors hover:text-pink-600">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-pink-100/70 pt-6 text-xs text-base-content/40 sm:flex-row">
          <p>{f.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <p>{f.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
