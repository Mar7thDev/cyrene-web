import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { news } from "@/db/schema";
import { getBaseUrl } from "@/lib/base-url";

export const dynamic = "force-dynamic";

// Returns the launcher's NewsItem[] shape (see CyreneLauncher
// internal/news-service/news.go). Pinned posts sort first.
export async function GET() {
  const posts = await db.query.news.findMany({
    where: eq(news.published, true),
    orderBy: [desc(news.pinned), desc(news.publishedAt)],
    limit: 30,
  });
  const baseUrl = getBaseUrl();

  const items = posts.map((p) => {
    const publishedAt = p.publishedAt ?? p.createdAt;
    const coverUrl = p.coverUrl
      ? p.coverUrl.startsWith("http")
        ? p.coverUrl
        : `${baseUrl}${p.coverUrl}`
      : "";
    return {
      id: p.slug,
      title: p.title,
      intro: p.summary,
      image: coverUrl,
      url: `${baseUrl}/news/${p.slug}`,
      time: publishedAt.toISOString().slice(0, 10),
      timestamp: Math.floor(publishedAt.getTime() / 1000),
      type: "",
      pinned: p.pinned,
    };
  });

  return NextResponse.json(items, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
  });
}
