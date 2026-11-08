import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";

/**
 * POST /api/auth/register  (the registration form data + password + lang)
 * Creates the trainee's Drupal account (ewa_content_api: POST /api/auth/register).
 * Answers { status: "active" | "pending" } or { error, fields }.
 */
export async function POST(request: NextRequest) {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const data = await request.json().catch(() => null);
  if (!data || typeof data !== "object") return NextResponse.json({ error: "invalid" }, { status: 400 });
  const body = { ...data, lang: isLocale(data.lang) ? data.lang : "en" };
  delete body.passwordConfirm;

  try {
    const res = await fetch(`${base}/api/auth/register?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok) return NextResponse.json({ status: result.status === "active" ? "active" : "pending" }, { status: 201 });
    if ([400, 403, 409, 429].includes(res.status)) {
      return NextResponse.json({ error: result.error ?? "invalid", fields: result.fields }, { status: res.status });
    }
    console.error("Drupal registration failed", res.status, result);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  } catch (error) {
    console.error("Drupal registration request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
