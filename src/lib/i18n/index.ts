import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { zh } from "./dictionaries/zh";

export type { Locale, Dictionary };
export { locales, defaultLocale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, zh };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Reads the visitor's chosen locale from the cookie, falling back to the default. */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

/** Convenience for Server Components: resolves the current locale and its dictionary. */
export async function getDict(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
