// Career types + the built-in jobs — no Drupal code here, so client components can import it.
import { pagePaths } from "@/lib/pages";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** A job card of the Join page careers carousel. */
export type CareerJob = {
  id: string;
  slug: string;
  title: string;
  /** shown date, e.g. "Dec 25, 2026" (Arabic month names on /ar) */
  date: string;
  /** ISO date for <time dateTime> */
  dateTime?: string;
  location: string;
  image?: string;
  /** the career's inner page: /career/{slug} */
  href: string;
};

/** A career's inner page (/career/[slug]). */
export type CareerDetail = CareerJob & {
  imageAlt: string;
  excerpt: string;
  /** Drupal content (HTML), "" when the career has none */
  html: string;
  /** "Apply" button — the career's Link field, else the registration page */
  applyHref: string;
};

/** A career's inner page URL. */
export const careerPath = (slug: string) => `/career/${slug}`;

/* ------------------------------------------------------------------ */
/*  Built-in jobs (dictionary join.careers) — used when Drupal is down */
/* ------------------------------------------------------------------ */

const builtInImages = [
  "/imgs/slides/media1.jpg",
  "/imgs/slides/media2.jpg",
  "/imgs/slides/media3.jpg",
  "/imgs/slides/media4.jpg",
  "/imgs/slides/media5.jpg",
];

/** Built-in jobs; slugs are job-1, job-2… so they match in both languages. */
export function builtInCareers(t: Dictionary): CareerJob[] {
  return t.join.careers.map((job, i) => ({
    id: `builtin-${i}`,
    slug: `job-${i + 1}`,
    title: job.title,
    date: job.date,
    location: job.location,
    image: builtInImages[i % builtInImages.length],
    href: careerPath(`job-${i + 1}`),
  }));
}

/** The built-in job for /career/job-N, or null. */
export function builtInCareer(slug: string, t: Dictionary): CareerDetail | null {
  const job = builtInCareers(t).find((j) => j.slug === slug);
  if (!job) return null;
  return { ...job, imageAlt: job.title, excerpt: "", html: "", applyHref: pagePaths.registration };
}
