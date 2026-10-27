// Language routing (Next 16 "proxy", formerly middleware).
//   /about      → default language (rewritten internally to /<default>/about, URL stays /about)
//   /ar/about   → Arabic
//   /en/about   → redirected to /about when "en" is the default, so each page has one URL
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, LOCALE_HEADER, splitLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, path } = splitLocale(pathname);

  // Default language never shows a prefix. 307 (temporary) so browsers don't cache it
  // forever — the default may change later.
  if (locale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url, 307);
  }

  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale ?? defaultLocale);

  if (locale) return NextResponse.next({ request: { headers } });

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, API routes, /imgs and any file with an extension (favicon.ico, robots.txt…)
  matcher: ["/((?!api|_next|imgs|.*\\..*).*)"],
};
