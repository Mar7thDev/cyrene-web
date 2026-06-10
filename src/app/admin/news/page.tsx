import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { news } from "@/db/schema";
import { deleteNews, setPublished } from "./actions";

export const metadata = { title: "News" };
export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const posts = await db.query.news.findMany({ orderBy: [desc(news.createdAt)] });

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">News ({posts.length})</h1>
        <Link href="/admin/news/new" className="btn btn-sm bg-linear-to-r from-pink-500 to-sky-500 border-none text-white">
          New post
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>State</th>
              <th>Published</th>
              <th>Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-2">
                    {p.pinned && <span className="badge badge-xs badge-secondary">pinned</span>}
                    <span className="font-medium">{p.title}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge badge-sm ${p.published ? "badge-success" : "badge-ghost"}`}>
                    {p.published ? "published" : "draft"}
                  </span>
                </td>
                <td className="text-xs">{p.publishedAt ? p.publishedAt.toISOString().slice(0, 10) : "—"}</td>
                <td className="text-xs">{p.updatedAt.toISOString().slice(0, 10)}</td>
                <td>
                  <div className="flex gap-1 justify-end">
                    <Link href={`/admin/news/${p.id}/edit`} className="btn btn-xs btn-outline">Edit</Link>
                    <form action={setPublished.bind(null, p.id, !p.published)}>
                      <button className={`btn btn-xs btn-outline ${p.published ? "" : "btn-success"}`}>
                        {p.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={deleteNews.bind(null, p.id)}>
                      <button className="btn btn-xs btn-error btn-outline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
