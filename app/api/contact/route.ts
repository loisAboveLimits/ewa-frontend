import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";

/**
 * Contact forms → Drupal webform "ewa_contact_us" (ewa_content_api: /api/webform/{id}).
 *
 * GET  /api/contact?lang=ar  → { options: { sponsorship: [{ value, label }] } }
 * POST /api/contact          { sponsorship, fname, lname, email, phone, message, lang, page, website }
 *   201 { ok } · 400 { error: "invalid", fields } · 403 closed · 429 too_many · 503 unavailable
 */
const WEBFORM = "ewa_contact_us";

/** form field name on the site → webform element key in Drupal */
const FIELDS = {
  sponsorship: "sponsorship",
  fname: "first_name",
  lname: "last_name",
  email: "email",
  phone: "telephone_mobile",
  message: "comments",
} as const;
type FieldName = keyof typeof FIELDS;

const base = () => process.env.DRUPAL_BASE_URL;

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  if (!base()) return NextResponse.json({ options: {} }, { status: 503 });
  try {
    const res = await fetch(`${base()}/api/webform/${WEBFORM}?_format=json&lang=${isLocale(lang) ? lang : "en"}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return NextResponse.json({ options: {} }, { status: 503 });
    const { options = {}, open = true } = await res.json();
    return NextResponse.json({ options, open });
  } catch {
    return NextResponse.json({ options: {} }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  // only this site's own pages may submit
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!base()) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid" }, { status: 400 });

  // spam trap: the hidden "website" field is only filled in by bots — pretend it worked
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true }, { status: 201 });

  const data: Record<string, string> = {};
  for (const [name, key] of Object.entries(FIELDS)) {
    const value = body[name];
    if (typeof value === "string") data[key] = value.trim().slice(0, 5000);
  }

  try {
    const res = await fetch(`${base()}/api/webform/${WEBFORM}?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Forwarded-For": request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
      },
      body: JSON.stringify({
        lang: isLocale(body.lang) ? body.lang : "en",
        page: typeof body.page === "string" ? body.page.slice(0, 200) : "contact",
        data,
      }),
      cache: "no-store",
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok) return NextResponse.json({ ok: true }, { status: 201 });
    if (res.status === 400 && result.fields) {
      // Drupal's element keys → this site's field names
      const fields: Partial<Record<FieldName, string>> = {};
      for (const [name, key] of Object.entries(FIELDS) as [FieldName, string][]) {
        if (result.fields[key]) fields[name] = result.fields[key];
      }
      return NextResponse.json({ error: "invalid", fields }, { status: 400 });
    }
    if (res.status === 403 || res.status === 429) return NextResponse.json({ error: result.error ?? "closed" }, { status: res.status });
    console.error("Drupal contact webform failed", res.status, result);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  } catch (error) {
    console.error("Drupal contact webform request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
