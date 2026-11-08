// Language routing (Next 16 "proxy", formerly middleware).
//   /about      → default language (rewritten internally to /<default>/about, URL stays /about)
//   /ar/about   → Arabic
//   /en/about   → redirected to /about when "en" is the default, so each page has one URL
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, LOCALE_HEADER, localizeHref, splitLocale } from "@/lib/i18n/config";
import { DASHBOARD_PATH, SESSION_COOKIE, isProtectedPath, safeNext } from "@/lib/authCookies";

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

  // Signed-in pages (Trainee Dashboard): no sign-in cookie → sign-in page, coming back here after.
  // (The page itself checks the session with Drupal; this only saves a round trip.)
  const signedIn = request.cookies.has(SESSION_COOKIE);
  const lang = locale ?? defaultLocale;
  if (!signedIn && isProtectedPath(path)) {
    const url = request.nextUrl.clone();
    url.pathname = localizeHref("/login", lang);
    url.search = `?next=${encodeURIComponent(path + request.nextUrl.search)}`;
    return NextResponse.redirect(url, 307);
  }
  // Already signed in → the sign-in page goes straight to the dashboard (or ?next=)
  if (signedIn && (path === "/login" || path.startsWith("/login/"))) {
    const next = safeNext(request.nextUrl.searchParams.get("next"), DASHBOARD_PATH);
    return NextResponse.redirect(new URL(localizeHref(next, lang), request.url), 307);
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
