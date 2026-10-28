export type DrupalPage = {
  nid: string;
  title: string;
  field_main_title: string; // HTML (text_default formatter)
  field_sub_title: string;  // HTML
  field_content: string; 
  field_slug: string;
  banner: string;           // e.g. /ewa/sites/default/files/banner.jpg
};

/** One item from the EWA Menu API module (GET /api/menu/{menu}/{lang}). */
export type DrupalMenuItem = {
  id: string;          // stable key, e.g. "menu_link_content:8c1e…"
  title: string;       // already translated to {lang}
  description: string;
  url: string;         // full Drupal URL, e.g. /ewa/ar/about
  path: string;        // alias only, e.g. /about — use this with the localized <Link>
  external: boolean;
  weight: number;
  expanded: boolean;
  children: DrupalMenuItem[];
};

const BASE = process.env.DRUPAL_BASE_URL!;
const ORIGIN = process.env.DRUPAL_ORIGIN!;

export async function getPage(nid: string, lang = "en"): Promise<DrupalPage | null> {
  const res = await fetch(`${BASE}/api/page/${nid}/${lang}?_format=json`, {
    next: { revalidate: 60 }, // re-fetch from Drupal at most once a minute
  });
  if (!res.ok) throw new Error(`Drupal API error ${res.status}`);
  const data: DrupalPage[] = await res.json(); // Views REST export always returns an array
  return data[0] ?? null;
}

export async function getSection(nid: string, lang = "en"): Promise<DrupalPage | null> {
  const res = await fetch(`${BASE}/api/section/${nid}/${lang}?_format=json`, {
    next: { revalidate: 60 }, // re-fetch from Drupal at most once a minute
  });
  if (!res.ok) throw new Error(`Drupal API error ${res.status}`);
  const data: DrupalPage[] = await res.json(); // Views REST export always returns an array
  return data[0] ?? null;
}

/**
 * A whole Drupal menu as a tree (custom module "ewa_menu_api", not a View).
 * getMenu("main", "ar") → GET {DRUPAL_BASE_URL}/api/menu/main/ar
 */
export async function getMenu(menu = "main", lang = "en"): Promise<DrupalMenuItem[]> {
  const res = await fetch(`${BASE}/api/menu/${menu}/${lang}`, {
    next: { revalidate: 60, tags: [`menu:${menu}`] }, // re-fetch from Drupal at most once a minute
  });
  if (!res.ok) throw new Error(`Drupal menu API error ${res.status}`);
  return res.json();
}

// "URL to image" gives a relative path, so make it absolute
export const absoluteUrl = (path?: string) =>
  path ? (path.startsWith("http") ? path : `${ORIGIN}${path}`) : "";

/* ------------------------------------------------------------------ */
/* Any Views "REST export" display                                     */
/* ------------------------------------------------------------------ */

export type ViewRequest = {
  /** The display's path without "api/" or the "%" parts, e.g. "section" for api/section/%/% */
  path: string;
  /** Contextual filters in order, e.g. [12] for the nid. */
  args?: (string | number)[];
  /** Language, appended as the LAST contextual filter. `false` = the view has no language argument. */
  lang?: string | false;
  /** Extra query string, e.g. exposed filters or { page: 1 } */
  params?: Record<string, string | number | boolean>;
  /** Seconds to cache the response (default 60). */
  revalidate?: number;
};

/**
 * GET {DRUPAL_BASE_URL}/api/{path}/{...args}/{lang}?_format=json
 * fetchView({ path: "section", args: [12], lang: "ar" }) → rows of the view (always an array).
 * Throws on network / HTTP errors — <DrupalView> catches them for you.
 */
export async function fetchView<T = Record<string, string>>({
  path,
  args = [],
  lang = "en",
  params = {},
  revalidate = 60,
}: ViewRequest): Promise<T[]> {
  const segments = [path.replace(/^\/?(api\/)?|\/$/g, ""), ...args, ...(lang ? [lang] : [])]
    .map((s) => String(s).split("/").map(encodeURIComponent).join("/"))
    .join("/");
  const query = new URLSearchParams({ _format: "json", ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  const url = `${BASE}/api/${segments}?${query}`;

  const res = await fetch(url, { next: { revalidate, tags: [`view:${path}`] } });
  if (!res.ok) throw new Error(`Drupal view error ${res.status} — ${url}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Field HTML from Drupal ready for dangerouslySetInnerHTML:
 * file / image links (/ewa/sites/default/files/…) become absolute so they load from Drupal.
 */
export function drupalHtml(html?: string): string {
  return (html ?? "").replace(/(src|href)="(\/[^"\/][^"]*\/sites\/[^"]*|\/sites\/[^"]*)"/g, (_, attr, path) => `${attr}="${absoluteUrl(path)}"`);
}

/** Removes the <p> wrapper Drupal puts around short text fields (titles), keeping inline markup. */
export function inlineHtml(html?: string): string {
  return drupalHtml(html)
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br>")
    .replace(/<\/?p[^>]*>/gi, "")
    .trim();
}
