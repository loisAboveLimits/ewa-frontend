import { absoluteUrl, fetchView } from "@/lib/drupal";
import type { GalleryImage } from "@/lib/gallery";
import type { Locale } from "@/lib/i18n/config";

/** "EWA Media Center API's" → REST API - Gallery: one row per gallery image. */
type GalleryRow = { nid: string; title?: string; image?: string; alt?: string };
/** ewa_content_api → /api/media/posts/all/{lang}: posts with their main image. */
type PostRow = { nid: number; main_title?: string; title?: string; image?: { image: string; alt: string } | null };

/**
 * The ticker's frame shapes (width / height), used in turn — Drupal doesn't send image sizes,
 * so photos are cropped to these frames like the original design (wide, standard, tall).
 */
const RATIOS = [1.75, 2.3, 0.75, 1.5, 3.2, 0.8];

const isFileName = (s: string) => /\.(jpe?g|png|webp|gif|svg|avif|bmp)$/i.test(s.trim());
const altText = (alt: string | undefined, title: string | undefined) =>
  alt && !isFileName(alt) ? alt.trim() : (title ?? "").replace(/\s*-\s*(EN|AR)$/i, "").trim();

/**
 * Every image in the Media Center, in the visitor's language: the main image of each post
 * (all categories, newest first) then every gallery photo, without duplicates — one flat list.
 * Returns null when Drupal can't be reached or has no images (→ built-in photos).
 */
export async function getMediaCenterImageList(locale: Locale): Promise<GalleryImage[] | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return null;

  // 1. main images of the posts
  let posts: PostRow[] = [];
  try {
    const res = await fetch(`${base}/api/media/posts/all/${locale}?_format=json`, { next: { revalidate: 60, tags: ["media:all"] } });
    if (res.ok) posts = await res.json();
  } catch (error) {
    console.error("Drupal media posts (images) could not be loaded", error);
  }

  // 2. all gallery photos ("Not applicable"/"Not specified" language nodes are picked up too)
  let gallery: GalleryRow[] = [];
  try {
    for (const lang of [locale, "zxx", "und"]) {
      gallery = await fetchView<GalleryRow>({ path: "media/gallery", args: ["all"], lang });
      if (gallery.length) break;
    }
  } catch (error) {
    console.error("Drupal media gallery (images) could not be loaded", error);
  }

  const seen = new Set<string>();
  const images: Omit<GalleryImage, "ratio">[] = [];
  const add = (path: string | undefined, alt: string) => {
    if (!path) return;
    const src = absoluteUrl(path.trim());
    if (seen.has(src)) return;
    seen.add(src);
    images.push({ src, alt });
  };

  for (const p of Array.isArray(posts) ? posts : []) add(p.image?.image, altText(p.image?.alt, p.main_title || p.title));
  for (const g of gallery) add(g.image, altText(g.alt, g.title));

  if (!images.length) return null;
  return images.map((img, i) => ({ ...img, ratio: RATIOS[i % RATIOS.length] }));
}

/**
 * The same images split into 2 ticker rows (GalleryTicker on /media-center).
 * Returns null when Drupal can't be reached or has no images (→ the ticker's built-in photos).
 */
export async function getMediaCenterImages(locale: Locale): Promise<GalleryImage[][] | null> {
  const images = await getMediaCenterImageList(locale);
  if (!images) return null;

  // alternate the images between the two rows so each row gets a mix
  const rows: GalleryImage[][] = [[], []];
  images.forEach((img, i) => rows[i % 2].push(img));
  return rows.filter((r) => r.length);
}
