import { absoluteUrl, fetchView } from "@/lib/drupal";
import type { Locale } from "@/lib/i18n/config";

/** One row of the "EWA Partners API's" view — one gallery image (GET /api/partners/{nid|all}/{lang}). */
type PartnerRow = {
  nid: string;
  title: string;
  delta: string | number;
  image: string; // /ewa/sites/default/files/…
  alt: string;   // media name
};

export type GalleryImage = { src: string; alt: string };

/** One "Partners & Accreditations" node with its gallery as its own array. */
export type Gallery = { nid: string; title: string; images: GalleryImage[] };

/**
 * Every Partners & Accreditations node, each with its own array of logos:
 *   [{ nid: "20", title: "Strategic Partners", images: [{ src, alt }, …] },
 *    { nid: "21", title: "Accreditations",     images: [{ src, alt }, …] }]
 * Pass `nid` to get just one gallery. Returns [] if Drupal can't be reached.
 *
 * Logo galleries are often saved with the language "Not applicable" (zxx) or
 * "Not specified" (und) instead of English/Arabic, so those are tried when the
 * visitor's language has nothing.
 */
export async function getGalleries(locale: Locale, nid?: string | number): Promise<Gallery[]> {
  let rows: PartnerRow[] = [];
  try {
    for (const lang of [locale, "zxx", "und"]) {
      rows = await fetchView<PartnerRow>({ path: "partners", args: [nid ?? "all"], lang });
      if (rows.length) break;
    }
  } catch (error) {
    console.error("Drupal partners view could not be loaded", error);
    return [];
  }

  const galleries = new Map<string, Gallery>();
  for (const row of rows) {
    if (!row.image) continue;
    const gallery = galleries.get(row.nid) ?? { nid: row.nid, title: row.title, images: [] };
    // media names that are just the file name ("partner2.svg") make poor alt text — leave those empty
    const alt = /\.(svg|png|jpe?g|webp|gif|bmp)$/i.test(row.alt ?? "") ? "" : row.alt;
    gallery.images.push({ src: absoluteUrl(row.image.trim()), alt });
    galleries.set(row.nid, gallery);
  }
  return [...galleries.values()];
}

/** The logos of one gallery (node id), or [] — e.g. `await getGallery(locale, 20)` */
export async function getGallery(locale: Locale, nid: string | number): Promise<GalleryImage[]> {
  return (await getGalleries(locale, nid))[0]?.images ?? [];
}
