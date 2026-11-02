import { absoluteUrl, fetchView } from "@/lib/drupal";

/** One row of "EWA Media Center API's" → REST API - Gallery (GET /api/media/gallery/{nid|all}/{lang}). */
type GalleryRow = { nid: string; title?: string; delta?: string; image?: string; alt?: string };

export type GalleryPhoto = { src: string; alt: string };

/**
 * The gallery images of a Media Center node, in gallery order, in the given language
 * ("Not applicable"/"Not specified" language nodes are picked up too).
 * Returns [] when the node has no images or Drupal can't be reached.
 */
export async function getMediaGallery(nid: string | number, locale: string): Promise<GalleryPhoto[]> {
  let rows: GalleryRow[] = [];
  try {
    for (const lang of [locale, "zxx", "und"]) {
      rows = await fetchView<GalleryRow>({ path: "media/gallery", args: [nid], lang });
      if (rows.length) break;
    }
  } catch (error) {
    console.error(`Drupal media gallery (node ${nid}) could not be loaded`, error);
    return [];
  }

  return rows
    .filter((row) => row.image)
    .map((row) => ({
      src: absoluteUrl(row.image!.trim()),
      // media names that are just the file name ("media2.jpg") make poor alt text
      alt: /\.(jpe?g|png|webp|gif|svg|avif|bmp)$/i.test(row.alt ?? "") ? "" : (row.alt ?? "").trim(),
    }));
}
