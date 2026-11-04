import { absoluteUrl, drupalHtml } from "@/lib/drupal";
import { pagePaths } from "@/lib/pages";
import { intlLocale, type Locale } from "@/lib/i18n/config";
import { careerPath, type CareerDetail, type CareerJob } from "@/lib/careerJobs";

export type { CareerDetail, CareerJob } from "@/lib/careerJobs";
export { builtInCareer, builtInCareers } from "@/lib/careerJobs";

/** One item of GET /api/careers/{langcode} and GET /api/career/{slug}/{langcode} (module "ewa_content_api"). */
type CareerJson = {
  nid: number;
  slug?: string;
  href?: string;
  title: string;
  main_title?: string;
  date?: string;
  published?: string;
  location?: string;
  image?: { image: string; alt: string } | null;
  link?: string;
  excerpt?: string;
  content?: string;
};

const shortDate = (iso: string, locale: Locale) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(intlLocale(locale), { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
};

/** Same rule as the Drupal module's Slug::make — used only if an older module sends no slug. */
const slugify = (text: string) =>
  text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function toJob(c: CareerJson, locale: Locale): CareerJob {
  const iso = c.date || c.published || "";
  const slug = c.slug || slugify(c.main_title || c.title) || `career-${c.nid}`;
  return {
    id: `career-${c.nid}`,
    slug,
    title: c.main_title || c.title,
    date: iso ? shortDate(iso, locale) : "",
    dateTime: iso || undefined,
    location: c.location ?? "",
    image: c.image?.image ? absoluteUrl(c.image.image) : undefined,
    href: careerPath(slug),
  };
}

/**
 * Published careers from Drupal in the visitor's language, newest first.
 * Returns null when Drupal can't be reached or has no careers (→ the built-in jobs).
 */
export async function getCareers(locale: Locale): Promise<CareerJob[] | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/careers/${locale}?_format=json`, {
      next: { revalidate: 60, tags: ["careers"] },
    });
    if (!res.ok) return null;
    const rows: CareerJson[] = await res.json();
    if (!Array.isArray(rows) || !rows.length) return null;
    return rows.map((c) => toJob(c, locale));
  } catch (error) {
    console.error("Drupal careers could not be loaded", error);
    return null;
  }
}

/**
 * One career by slug (made in Drupal from its English Main Title), in the visitor's language.
 * Returns null when Drupal doesn't have it or can't be reached.
 */
export async function getCareer(slug: string, locale: Locale): Promise<CareerDetail | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base || !/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const res = await fetch(`${base}/api/career/${slug}/${locale}?_format=json`, {
      next: { revalidate: 60, tags: [`career:${slug}`] },
    });
    if (!res.ok) return null;
    const c: CareerJson = await res.json();
    if (!c?.nid) return null;
    const job = toJob(c, locale);
    return {
      ...job,
      imageAlt: c.image?.alt || job.title,
      excerpt: c.excerpt ?? "",
      html: c.content ? drupalHtml(c.content) : "",
      applyHref: c.link || pagePaths.registration,
    };
  } catch (error) {
    console.error(`Drupal career "${slug}" could not be loaded`, error);
    return null;
  }
}
