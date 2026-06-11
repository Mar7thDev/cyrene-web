import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { CalendarDays, Newspaper, Pin } from "lucide-react";
import { db } from "@/db";
import { news } from "@/db/schema";
import Reveal from "@/components/reveal";

export const metadata = { title: "News" };
export const dynamic = "force-dynamic";

function fmtDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function NewsListPage() {
  const posts = await db.query.news.findMany({
    where: and(eq(news.published, true)),
    orderBy: [desc(news.pinned), desc(news.publishedAt)],
    limit: 60,
  });

  return (
    <div>
      <div className="fade-up pt-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-brand">News</span>
        </h1>
        <p className="mt-3 text-base-content/50">Announcements and updates from the team.</p>
      </div>

      {posts.length === 0 ? (
        <div className="fade-up d2 mx-auto mt-16 flex max-w-sm flex-col items-center gap-3 text-center text-base-content/40">
          <Newspaper className="h-10 w-10" />
          <p>Nothing here yet — check back soon.</p>
        </div>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <Link href={`/news/${p.slug}`} className="group block h-full">
                <article className="glass-card glass-card-hover h-full overflow-hidden">
                  <div className="relative h-36 overflow-hidden">
                    {p.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.coverUrl}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400/15 via-violet-400/15 to-sky-400/15">
                        <Newspaper className="h-8 w-8 text-pink-400/50" />
                      </div>
                    )}
                    {p.pinned && (
                      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-pink-500/90 px-2.5 py-1 text-xs font-medium text-white shadow-md backdrop-blur-sm">
                        <Pin size={11} /> Pinned
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-pink-600">
                      {p.title}
                    </h2>
                    {p.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-base-content/50 line-clamp-2">{p.summary}</p>
                    )}
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-base-content/40">
                      <CalendarDays size={13} /> {fmtDate(p.publishedAt)}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
