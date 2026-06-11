import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, CalendarDays, Pin } from "lucide-react";
import { db } from "@/db";
import { news } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.query.news.findFirst({
    where: and(eq(news.slug, slug), eq(news.published, true)),
  });
  if (!post) notFound();

  return (
    <article className="fade-up mx-auto max-w-3xl">
      <Link
        href="/news"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-base-content/45 transition-colors hover:text-pink-600"
      >
        <ArrowLeft size={15} /> All news
      </Link>

      <div className="glass-card overflow-hidden">
        {post.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverUrl} alt="" className="max-h-80 w-full object-cover" />
        )}
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-3 text-xs text-base-content/40">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              {post.publishedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            {post.pinned && (
              <span className="flex items-center gap-1 rounded-full bg-pink-500/10 px-2 py-0.5 font-medium text-pink-600">
                <Pin size={11} /> Pinned
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          {post.summary && <p className="mt-3 text-base-content/55">{post.summary}</p>}

          <div className="prose prose-pink mt-8 max-w-none prose-headings:tracking-tight prose-a:text-pink-600">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {post.contentMd}
            </Markdown>
          </div>
        </div>
      </div>
    </article>
  );
}
