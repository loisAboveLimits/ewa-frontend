import { absoluteUrl, drupalHtml } from "@/lib/drupal";
import type { NewsItem } from "@/lib/news";

/** GET {DRUPAL_BASE_URL}/api/media/post/{category}/{slug}/{lang} (Drupal module "ewa_content_api"). */
type PostImage = { mid: number; image: string; alt: string };
type PostJson = {
  nid: number;
  slug: string;
  href: string;
  category: { tid: number; slug: string; name: string };
  title: string;
  main_title: string;
  excerpt: string;
  date: string; // UTC ISO, e.g. 2027-02-15T07:01:00Z
  published?: string; // publishing date, UTC ISO
  featured: boolean;
  weight: number;
  image: PostImage | null;
  content?: string; // HTML
  gallery?: PostImage[];
};

export type MediaPost = {
  nid: number;
  slug: string;
  href: string;
  category: { slug: string; name: string };
  title: string;
  excerpt: string;
  date: string;
  featured: boolean;
  image: { src: string; alt: string } | null;
  html: string;
  gallery: { src: string; alt: string }[];
};

const isFileName = (s: string) => /\.(jpe?g|png|webp|gif|svg|avif|bmp)$/i.test(s.trim());
const toImage = (img: PostImage, fallbackAlt: string) => ({
  src: absoluteUrl(img.image),
  alt: img.alt && !isFileName(img.alt) ? img.alt : fallbackAlt,
});

/**
 * One Media Center post by category + slug, in the given language.
 * The slug is made in Drupal from the post's English Main Title, so it is the same in /en and /ar.
 * Returns null when there is no such post in that language or Drupal can't be reached.
 */
export async function getMediaPost(category: string, slug: string, lang: string): Promise<MediaPost | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base || !/^[a-z0-9-]+$/.test(category) || !/^[a-z0-9-]+$/.test(slug)) return null;

  try {
    const res = await fetch(`${base}/api/media/post/${category}/${slug}/${lang}?_format=json`, {
      next: { revalidate: 60, tags: [`media-post:${category}/${slug}`] },
    });
    if (!res.ok) return null; // 404 = no such post (in this language)
    const p: PostJson = await res.json();
    const title = p.main_title || p.title;

    return {
      nid: p.nid,
      slug: p.slug,
      href: p.href,
      category: { slug: p.category.slug, name: p.category.name },
      title,
      excerpt: p.excerpt,
      date: p.date,
      featured: p.featured,
      image: p.image ? toImage(p.image, title) : null,
      html: drupalHtml(p.content ?? "").trim(),
      gallery: (p.gallery ?? []).map((g, i) => toImage(g, `${title} ${i + 1}`)),
    };
  } catch (error) {
    console.error(`Drupal media post ${category}/${slug} (${lang}) could not be loaded`, error);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Media Center category page sections                                 */
/* ------------------------------------------------------------------ */


/**
 * "featured" → section 1: posts with Featured checked (3)
 * "latest"   → section 2: Events = upcoming, soonest first; other categories = latest (3)
 * "posts"    → section 3: all posts, newest first
 */
export type MediaSection = "featured" | "latest" | "posts";

/** Shown when a post has no image in Drupal */
export const PLACEHOLDER_IMAGE = "/imgs/slides/media5.jpg";

/**
 * One section of a Media Center category ("events", "news-articles", … or "all") from Drupal,
 * as NewsItems for the existing components. Dates: Events use their Date field, every other
 * category its publishing date (worked out in Drupal).
 * Returns null only when Drupal can't be reached or doesn't know the category — an empty
 * array means the category simply has no posts for that section.
 */
export async function getMediaSection(
  section: MediaSection,
  category: string,
  lang: string,
  limit = 3,
): Promise<NewsItem[] | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base || !/^[a-z0-9-]+$/.test(category)) return null;

  const query = section === "posts" ? "_format=json" : `_format=json&limit=${limit}`;
  try {
    const res = await fetch(`${base}/api/media/${section}/${category}/${lang}?${query}`, {
      next: { revalidate: 60, tags: [`media:${category}`] },
    });
    if (!res.ok) return null;
    const rows: PostJson[] = await res.json();
    if (!Array.isArray(rows)) return null;

    // a post tagged with several categories can come back more than once: keep the first
    const seen = new Set<number>();
    const unique = rows.filter((p) => !seen.has(p.nid) && (seen.add(p.nid), true));

    return unique.map((p) => {
      const title = p.main_title || p.title;
      return {
        id: `post-${p.nid}-${p.category.slug}`,
        category: p.category.name,
        title,
        excerpt: p.excerpt || undefined,
        date: p.date,
        published: p.published || p.date,
        image: p.image ? absoluteUrl(p.image.image) : PLACEHOLDER_IMAGE,
        href: p.href,
      };
    });
  } catch (error) {
    console.error(`Drupal media ${section} for "${category}" (${lang}) could not be loaded`, error);
    return null;
  }
}
