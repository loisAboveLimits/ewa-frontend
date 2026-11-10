import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/authCookies";

/** The profile fields a trainee may change from My Profile (Drupal checks the same list). */
const EDITABLE = [
  "firstName", "fatherName", "grandfatherName", "lastName", "gender", "dob", "height", "weight",
  "mobile", "altMobile", "relation",
  "qualification", "major", "graduationYear", "englishLevel", "stepGrade", "gpa", "university",
  "employed", "socialInsurance", "qiwa", "commercialReg", "hrdf", "referral",
] as const;

/**
 * POST /api/auth/profile  { firstName, mobile, … }
 * Saves the signed-in trainee's details in Drupal (ewa_content_api: POST /api/auth/profile),
 * sending the Drupal session kept in the httpOnly cookie.
 * Answers { ok: true } · 400 { error: "invalid", fields } · 401 { error: "signed_out" } · 503 { error: "unavailable" }
 */
export async function POST(request: NextRequest) {
  // only this site's own pages may save (the session cookie is sent automatically)
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
  if (!data || typeof data !== "object") return NextResponse.json({ error: "invalid" }, { status: 400 });
  const body = Object.fromEntries(EDITABLE.filter((k) => k in data).map((k) => [k, data[k]]));
  if (!Object.keys(body).length) return NextResponse.json({ error: "invalid" }, { status: 400 });

  try {
    const res = await fetch(`${base}/api/auth/profile?_format=json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Cookie: session },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok) return NextResponse.json({ ok: true });
    if (res.status === 401 || res.status === 403) return NextResponse.json({ error: "signed_out" }, { status: 401 });
    if (res.status === 400) return NextResponse.json({ error: "invalid", fields: result.fields }, { status: 400 });
    console.error("Drupal profile update failed", res.status, result);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  } catch (error) {
    console.error("Drupal profile update request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
