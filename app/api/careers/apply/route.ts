import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";

/**
 * Career applications → Drupal webform "ewa_careers" (ewa_content_api: /api/webform/{id}).
 *
 * GET  /api/careers/apply?lang=ar
 *   → { options: { years_of_experience: [{ value, label }] }, cv: { extensions, max_mb } | null }
 *     cv is null while the webform has no file element (the form then hides the CV field);
 *     the file element may be keyed "cv" or "resume" (or be the webform's only file element)
 * POST /api/careers/apply   multipart form data:
 *   careerId (career node id), name, email, phone (5XXXXXXXX), experience, message, cv (file),
 *   lang, page, website (spam trap)
 *   201 { ok } · 400 { error: "invalid", fields } · 403 closed · 429 too_many · 503 unavailable
 * Drupal fills in "position" from the career's Main Title.
 */
const WEBFORM = "ewa_careers";
const MAX_MB = 5;
/** CVs are documents — whatever else the webform element allows */
const CV_EXTENSIONS = ["pdf", "doc", "docx"];
const CV_KEYS = ["cv", "resume"];

/** form field name on the site → webform element key in Drupal */
const FIELDS = {
  careerId: "career_id",
  name: "full_name",
  email: "email",
  phone: "mobile_number",
  experience: "years_of_experience",
  message: "cover_letter",
} as const;
type FieldName = keyof typeof FIELDS;

const base = () => process.env.DRUPAL_BASE_URL;

type FileRules = { extensions: string[]; max_mb: number };
type WebformInfo = { options: Record<string, { value: string; label: string }[]>; files: Record<string, FileRules>; open: boolean };

/** The webform's options and file elements (cached 5 minutes); null when Drupal can't be reached. */
async function webformInfo(lang: string): Promise<WebformInfo | null> {
  if (!base()) return null;
  try {
    const res = await fetch(`${base()}/api/webform/${WEBFORM}?_format=json&lang=${isLocale(lang) ? lang : "en"}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const { options = {}, files = {}, open = true } = await res.json();
    return { options, files, open };
  } catch {
    return null;
  }
}

/** The CV element: keyed "cv" / "resume", else the only file element; with document-only rules. */
function cvElement(info: WebformInfo | null): { key: string; rules: FileRules } | null {
  const files = info?.files ?? {};
  const keys = Object.keys(files);
  const key = CV_KEYS.find((k) => files[k]) ?? (keys.length === 1 ? keys[0] : undefined);
  if (!key) return null;
  const allowed = (files[key].extensions ?? []).filter((x) => CV_EXTENSIONS.includes(x));
  return {
    key,
    rules: {
      extensions: allowed.length ? allowed : CV_EXTENSIONS,
      max_mb: Math.min(Number(files[key].max_mb) || MAX_MB, MAX_MB),
    },
  };
}

export async function GET(request: NextRequest) {
  const info = await webformInfo(request.nextUrl.searchParams.get("lang") ?? "en");
  if (!info) return NextResponse.json({ options: {}, cv: null }, { status: 503 });
  return NextResponse.json({ options: info.options, cv: cvElement(info)?.rules ?? null, open: info.open });
}

export async function POST(request: NextRequest) {
  // only this site's own pages may submit
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!base()) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const text = (name: string) => {
    const v = form.get(name);
    return typeof v === "string" ? v.trim().slice(0, 5000) : "";
  };

  // spam trap: the hidden "website" field is only filled in by bots — pretend it worked
  if (text("website")) return NextResponse.json({ ok: true }, { status: 201 });

  const lang = text("lang");
  const phone = text("phone").replace(/\D/g, "");
  const data: Record<string, string> = {
    career_id: text("careerId").replace(/^career-/, ""),
    full_name: text("name"),
    email: text("email"),
    mobile_number: phone ? `+966${phone}` : "",
    years_of_experience: text("experience"),
    cover_letter: text("message"),
  };

  const files: Record<string, { name: string; data: string }> = {};
  const cv = form.get("cv");
  const cvEl = cvElement(await webformInfo(lang));
  if (cvEl && cv instanceof File && cv.size > 0) {
    const ext = cv.name.split(".").pop()?.toLowerCase() ?? "";
    if (!cvEl.rules.extensions.includes(ext)) return NextResponse.json({ error: "invalid", fields: { cv: "type" } }, { status: 400 });
    if (cv.size > cvEl.rules.max_mb * 1024 * 1024) return NextResponse.json({ error: "invalid", fields: { cv: "size" } }, { status: 400 });
    files[cvEl.key] = { name: cv.name, data: Buffer.from(await cv.arrayBuffer()).toString("base64") };
  }

  try {
    const res = await fetch(`${base()}/api/webform/${WEBFORM}?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Forwarded-For": request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
      },
      body: JSON.stringify({ lang: isLocale(lang) ? lang : "en", page: text("page") || "career", data, files }),
      cache: "no-store",
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok) return NextResponse.json({ ok: true }, { status: 201 });
    if (res.status === 400 && result.fields) {
      // Drupal's element keys → this site's field names
      const fields: Partial<Record<FieldName | "cv", string>> = {};
      for (const [name, key] of Object.entries(FIELDS) as [FieldName, string][]) {
        if (result.fields[key]) fields[name] = result.fields[key];
      }
      if (cvEl && result.fields[cvEl.key]) fields.cv = result.fields[cvEl.key];
      return NextResponse.json({ error: "invalid", fields }, { status: 400 });
    }
    if (res.status === 403 || res.status === 429) return NextResponse.json({ error: result.error ?? "closed" }, { status: res.status });
    console.error("Drupal careers webform failed", res.status, result);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  } catch (error) {
    console.error("Drupal careers webform request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
