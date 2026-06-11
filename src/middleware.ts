import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, detectLocale } from "@/lib/i18n/config";

/**
 * On a visitor's first request (no language cookie yet) pick a locale from their
 * browser's Accept-Language header and persist it. Once the cookie exists — set
 * here or via the in-app switcher — we leave it untouched.
 */
export function middleware(request: NextRequest) {
  if (request.cookies.has(LOCALE_COOKIE)) return NextResponse.next();

  const locale = detectLocale(request.headers.get("accept-language"));

  // Expose the choice to this same render, then persist it on the response.
  request.cookies.set(LOCALE_COOKIE, locale);
  const response = NextResponse.next({ request });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Run on page routes only. Exclude all of `_next` (incl. the webpack-hmr / RSC
  // dev channels — otherwise middleware runs on every hot update and slows it
  // down), API routes, the favicon, and anything with a file extension.
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
