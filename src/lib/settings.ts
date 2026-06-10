import { db } from "@/db";
import { settings, type RegistrationMode } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await db.query.settings.findFirst({ where: eq(settings.key, key) });
  return row ? (row.value as T) : fallback;
}

export async function setSetting(key: string, value: unknown): Promise<void> {
  await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({ target: settings.key, set: { value } });
}

export function getRegistrationMode(): Promise<RegistrationMode> {
  return getSetting<RegistrationMode>("registration_mode", "open");
}

export function getDiscordWebhookUrl(): Promise<string> {
  return getSetting<string>("discord_webhook_url", "");
}
