import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/authCookies";
import { isLocale } from "@/lib/i18n/config";

/**
 * POST /api/auth/programs  { courses: ["facilities-management", …], lang }
 * The signed-in trainee applies for more programs (Apply for a course in the Trainee Dashboard).
 * Sent to Drupal (ewa_content_api: POST /api/auth/programs) with the session kept in the
 * httpOnly cookie; programs already on the account are kept.
 * Answers { ok: true, added, programs } · 400 { error: "invalid" } · 401 { error: "signed_out" } · 503 { error: "unavailable" }
 */
export async function POST(request: NextRequest) {
  // only this site's own pages may apply (the session cookie is sent automatically)
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) return NextResponse.json({ error: "signed_out" }, { status: 401 });
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const data = await request.json().catch(() => null);
  const courses: string[] = Array.isArray(data?.courses)
    ? data.courses.filter((c: unknown): c is string => typeof c === "string" && /^[a-z0-9-]{1,120}$/.test(c))
    : [];
  if (!courses.length) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const lang = isLocale(data?.lang) ? data.lang : "en";

  try {
    const res = await fetch(`${base}/api/auth/programs?_format=json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Cookie: session },
      body: JSON.stringify({ courses, lang }),
      cache: "no-store",
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok) return NextResponse.json({ ok: true, added: result.added ?? [], programs: result.programs ?? [] });
    if (res.status === 401 || res.status === 403) return NextResponse.json({ error: "signed_out" }, { status: 401 });
    if (res.status === 400) return NextResponse.json({ error: "invalid" }, { status: 400 });
    console.error("Drupal apply for programs failed", res.status, result);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  } catch (error) {
    console.error("Drupal apply for programs request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
