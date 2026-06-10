import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { and, eq } from "drizzle-orm";
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
    <article className="mx-auto max-w-3xl">
      <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 overflow-hidden">
        {post.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverUrl} alt="" className="w-full max-h-80 object-cover" />
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-base-content/40 mb-6">{post.publishedAt?.toISOString().slice(0, 10)}</p>
          <div className="prose prose-pink max-w-none">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {post.contentMd}
            </Markdown>
          </div>
        </div>
      </div>
    </article>
  );
}
