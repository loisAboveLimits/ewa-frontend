import { NextResponse, type NextRequest } from "next/server";
import { drupalSessionFrom } from "@/lib/auth";
import { LOGOUT_COOKIE, SESSION_COOKIE, USER_COOKIE } from "@/lib/authCookies";

/**
 * POST /api/auth/login  { identifier, password, remember }
 * Signs in with Drupal (ewa_content_api: POST /api/auth/login) and keeps Drupal's session in
 * httpOnly cookies on this site. The password only passes through this server, never stored.
 */
export async function POST(request: NextRequest) {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  let body: { identifier?: string; password?: string; remember?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const identifier = String(body.identifier ?? "").trim();
  const password = String(body.password ?? "");
  if (!identifier || !password) return NextResponse.json({ error: "invalid" }, { status: 400 });

  let res: Response;
  try {
    res = await fetch(`${base}/api/auth/login?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // the visitor's IP for Drupal's flood control (used when Drupal trusts this server as a reverse proxy)
        "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
      },
      body: JSON.stringify({ identifier, password }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Drupal login request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  if (res.status === 429) return NextResponse.json({ error: "too_many" }, { status: 429 });
  if (!res.ok) return NextResponse.json({ error: "failed" }, { status: 401 });

  const session = drupalSessionFrom(res);
  const user: { display_name?: string; name?: string; logout_token?: string } = await res.json().catch(() => ({}));
  if (!session) {
    console.error("Drupal login returned no session cookie");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true, name: user.display_name || user.name || "" });
  const secure = process.env.NODE_ENV === "production";
  // "remember me" → keep for 30 days, otherwise until the browser closes
  const maxAge = body.remember ? 60 * 60 * 24 * 30 : undefined;
  const base_ = { path: "/", sameSite: "lax" as const, secure, maxAge };

  response.cookies.set(SESSION_COOKIE, session, { ...base_, httpOnly: true });
  if (user.logout_token) response.cookies.set(LOGOUT_COOKIE, user.logout_token, { ...base_, httpOnly: true });
  response.cookies.set(USER_COOKIE, encodeURIComponent(user.display_name || user.name || ""), { ...base_, httpOnly: false });
  return response;
}
