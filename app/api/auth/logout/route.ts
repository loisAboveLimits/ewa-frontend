import { NextResponse, type NextRequest } from "next/server";
import { LOGOUT_COOKIE, SESSION_COOKIE, USER_COOKIE, safeNext } from "@/lib/authCookies";
import { defaultLocale, isLocale, localizeHref } from "@/lib/i18n/config";

/**
 * POST /api/auth/logout  (form field "lang" = en | ar, optional "next")
 * Ends the Drupal session (core POST /user/logout?_format=json&token=…), clears this site's
 * sign-in cookies and goes to the sign-in page.
 */
export async function POST(request: NextRequest) {
  const base = process.env.DRUPAL_BASE_URL;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const token = request.cookies.get(LOGOUT_COOKIE)?.value;

  if (base && session && token) {
    try {
      await fetch(`${base}/user/logout?_format=json&token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { Cookie: session, Accept: "application/json" },
        cache: "no-store",
      });
    } catch (error) {
      console.error("Drupal logout request failed", error);
    }
  }

  const form = await request.formData().catch(() => null);
  const lang = String(form?.get("lang") ?? "");
  const next = safeNext(String(form?.get("next") ?? ""), "/login");
  const target = new URL(localizeHref(next, isLocale(lang) ? lang : defaultLocale), request.url);

  // 303: the browser follows with a GET
  const response = NextResponse.redirect(target, 303);
  for (const name of [SESSION_COOKIE, LOGOUT_COOKIE, USER_COOKIE]) response.cookies.delete(name);
  return response;
}

/**
 * GET /api/auth/logout?lang=ar&next=/users/dashboard
 * Used when Drupal says the session has ended (expired / signed out in Drupal): only clears this
 * site's sign-in cookies and opens the sign-in page, coming back to `next` after signing in.
 */
export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") ?? "";
  const next = safeNext(request.nextUrl.searchParams.get("next"), "");
  const login = localizeHref("/login", isLocale(lang) ? lang : defaultLocale) + (next ? `?next=${encodeURIComponent(next)}` : "");
  const response = NextResponse.redirect(new URL(login, request.url), 307);
  for (const name of [SESSION_COOKIE, LOGOUT_COOKIE, USER_COOKIE]) response.cookies.delete(name);
  return response;
}
