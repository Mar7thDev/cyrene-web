import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { news } from "@/db/schema";
import NewsEditor from "../../editor";
import { saveNews } from "../../actions";

export const metadata = { title: "Edit post" };
export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.query.news.findFirst({ where: eq(news.id, id) });
  if (!post) notFound();

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Edit post</h1>
        <span className={`badge ${post.published ? "badge-success" : "badge-ghost"}`}>
          {post.published ? "published" : "draft"}
        </span>
      </div>
      <NewsEditor post={post} action={saveNews} />
    </div>
  );
}
