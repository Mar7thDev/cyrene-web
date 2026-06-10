import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { Pin } from "lucide-react";
import { db } from "@/db";
import { news } from "@/db/schema";

export const metadata = { title: "News" };
export const dynamic = "force-dynamic";

export default async function NewsListPage() {
  const posts = await db.query.news.findMany({
    where: and(eq(news.published, true)),
    orderBy: [desc(news.pinned), desc(news.publishedAt)],
    limit: 60,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-sky-500">
        News
      </h1>
      {posts.length === 0 ? (
        <p className="text-base-content/50">Nothing here yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/news/${p.slug}`}
              className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-md shadow-pink-100/40 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {p.coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.coverUrl} alt="" className="w-full h-36 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  {p.pinned && <Pin size={14} className="text-pink-500 shrink-0" />}
                  <h2 className="font-semibold line-clamp-2">{p.title}</h2>
                </div>
                {p.summary && <p className="text-sm text-base-content/50 mt-1 line-clamp-2">{p.summary}</p>}
                <p className="text-xs text-base-content/40 mt-2">
                  {p.publishedAt?.toISOString().slice(0, 10)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
