"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/db";
import { news } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { announceNews } from "@/lib/discord-webhook";
import { getBaseUrl } from "@/lib/base-url";

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  // Random suffix keeps non-latin titles (which slugify to "") unique.
  return base || `post-${crypto.randomUUID().slice(0, 8)}`;
}

function revalidateNews(slug?: string) {
  revalidatePath("/admin/news");
  revalidatePath("/news");
  if (slug) revalidatePath(`/news/${slug}`);
}

export async function saveNews(formData: FormData) {
  const session = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const contentMd = String(formData.get("contentMd") ?? "");
  const pinned = formData.get("pinned") === "on";
  if (!title) throw new Error("Title is required");

  let coverUrl = String(formData.get("coverUrl") ?? "").trim() || null;
  const cover = formData.get("cover");
  if (cover instanceof File && cover.size > 0) {
    const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "data", "uploads");
    const coversDir = path.join(uploadDir, "covers");
    await mkdir(coversDir, { recursive: true });
    const safeName = cover.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${crypto.randomUUID()}-${safeName}`;
    await writeFile(path.join(coversDir, fileName), Buffer.from(await cover.arrayBuffer()));
    coverUrl = `/uploads/covers/${fileName}`;
  }

  if (id) {
    const [updated] = await db
      .update(news)
      .set({ title, summary, contentMd, pinned, coverUrl, updatedAt: new Date() })
      .where(eq(news.id, id))
      .returning();
    revalidateNews(updated?.slug);
  } else {
    const [created] = await db
      .insert(news)
      .values({
        slug: slugify(title),
        title,
        summary,
        contentMd,
        pinned,
        coverUrl,
        authorId: session.user.id,
      })
      .returning();
    revalidateNews(created.slug);
    redirect(`/admin/news/${created.id}/edit`);
  }
}

export async function setPublished(id: string, published: boolean) {
  await requireAdmin();
  const existing = await db.query.news.findFirst({ where: eq(news.id, id) });
  if (!existing) throw new Error("Post not found");

  const firstPublish = published && !existing.publishedAt;
  const [updated] = await db
    .update(news)
    .set({
      published,
      publishedAt: firstPublish ? new Date() : existing.publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(news.id, id))
    .returning();

  if (firstPublish) await announceNews(updated, getBaseUrl());
  revalidateNews(updated.slug);
}

export async function deleteNews(id: string) {
  await requireAdmin();
  const [deleted] = await db.delete(news).where(eq(news.id, id)).returning();
  revalidateNews(deleted?.slug);
}
