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