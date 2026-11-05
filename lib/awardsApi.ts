import { absoluteUrl, drupalHtml } from "@/lib/drupal";
import { awardImages, type Award } from "@/lib/awards";
import { intlLocale, type Locale } from "@/lib/i18n/config";

/** One item of GET /api/awards/{langcode} (Drupal module "ewa_content_api", content type "awards"). */
type AwardJson = {
  nid: number;
  title: string;
  main_title?: string;
  date?: string;
  published?: string;
  image?: { image: string; alt: string } | null;
  excerpt?: string;
  content?: string;
};

/** "2025-05-31" → "May 2025" / "مايو 2025" */
const monthYear = (iso: string, locale: Locale) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(intlLocale(locale), { month: "long", year: "numeric", timeZone: "UTC" }).format(d);
};

/**
 * Awards from Drupal in the visitor's language, by their date field, newest first
 * (the API sorts them). Returns null when Drupal can't be reached or has no awards
 * (→ the built-in awards in lib/awards.tsx).
 */
export async function getDrupalAwards(locale: Locale): Promise<Award[] | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/awards/${locale}?_format=json`, {
      next: { revalidate: 60, tags: ["awards"] },
    });
    if (!res.ok) return null;
    const rows: AwardJson[] = await res.json();
    if (!Array.isArray(rows) || !rows.length) return null;

    return rows.map((a, i) => {
      const iso = a.date || a.published || "";
      const html = a.content || (a.excerpt ? `<p>${a.excerpt}</p>` : "");
      return {
        id: `award-${a.nid}`,
        date: iso ? monthYear(iso, locale) : "",
        dateTime: iso || undefined,
        title: a.main_title || a.title,
        image: a.image?.image ? absoluteUrl(a.image.image) : awardImages[i % awardImages.length],
        body: null,
        html: drupalHtml(html),
      };
    });
  } catch (error) {
    console.error("Drupal awards could not be loaded", error);
    return null;
  }
}
