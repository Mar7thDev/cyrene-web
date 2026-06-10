import type { NewsPost } from "@/db/schema";
import { getDiscordWebhookUrl } from "./settings";

// Announces a freshly published post to the configured Discord channel.
// Failures are logged and swallowed — publishing must not depend on Discord.
export async function announceNews(post: NewsPost, baseUrl: string): Promise<void> {
  const webhookUrl = await getDiscordWebhookUrl();
  if (!webhookUrl) return;

  const embed: Record<string, unknown> = {
    title: post.title,
    description: post.summary || undefined,
    url: `${baseUrl}/news/${post.slug}`,
    color: 0xec4899,
    timestamp: (post.publishedAt ?? new Date()).toISOString(),
  };
  if (post.coverUrl) {
    embed.image = { url: post.coverUrl.startsWith("http") ? post.coverUrl : `${baseUrl}${post.coverUrl}` };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
    if (!res.ok) console.error("Discord webhook failed:", res.status, await res.text());
  } catch (err) {
    console.error("Discord webhook failed:", err);
  }
}
