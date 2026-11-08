import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";

/**
 * POST /api/auth/password/forgot  { identifier, lang }
 * Asks Drupal (ewa_content_api) to e-mail a one-time reset link. Answers the same whether or
 * not the account exists, so the form can't be used to find out who has an account.
 */
export async function POST(request: NextRequest) {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const body = await request.json().catch(() => ({}));
  const identifier = String(body.identifier ?? "").trim();
  const lang = isLocale(body.lang) ? body.lang : "en";
  if (!identifier) return NextResponse.json({ error: "invalid" }, { status: 400 });

  try {
    const res = await fetch(`${base}/api/auth/password/forgot?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
      },
      body: JSON.stringify({ identifier, lang }),
      cache: "no-store",
    });
    if (res.status === 429) return NextResponse.json({ error: "too_many" }, { status: 429 });
    if (!res.ok) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Drupal password reset request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
