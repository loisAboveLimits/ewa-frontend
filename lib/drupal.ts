export type DrupalPage = {
  nid: string;
  title: string;
  field_main_title: string; // HTML (text_default formatter)
  field_sub_title: string;  // HTML
  field_slug: string;
  banner: string;           // e.g. /ewa/sites/default/files/banner.jpg
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

// "URL to image" gives a relative path, so make it absolute
export const absoluteUrl = (path?: string) =>
  path ? (path.startsWith("http") ? path : `${ORIGIN}${path}`) : "";