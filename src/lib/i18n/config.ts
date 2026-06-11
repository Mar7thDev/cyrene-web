// Pure constants/helpers only — no `next/headers` import, so this file is safe to
// import from middleware (Edge runtime) as well as Server Components.

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** One year, in seconds — how long the language choice sticks. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/** Picks the best supported locale from an `Accept-Language` header value. */
export function detectLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  // e.g. "zh-CN,zh;q=0.9,en;q=0.8" — take the tag of each entry, in priority order.
  const tags = acceptLanguage.split(",").map((part) => part.trim().split(";")[0].toLowerCase());
  for (const tag of tags) {
    if (tag.startsWith("zh")) return "zh";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}
