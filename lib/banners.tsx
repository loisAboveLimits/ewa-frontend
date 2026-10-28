import type { ReactNode } from "react";
import { absoluteUrl, getPage, type DrupalPage } from "@/lib/drupal";
import type { Locale } from "@/lib/i18n/config";
import type { PageKey } from "@/lib/pages";

/**
 * Drupal node id (content type "Pages") behind each Next.js page.
 * The banner image, main title and sub title come from that node through the View
 * "EWA API's" → REST export "api/page/{nid}/{lang}".
 * Leave a page out (or empty) to keep the built-in banner from the dictionaries.
 */
export const pageNids: Partial<Record<PageKey, string>> = {
  home: "1",
  about: "3",
  why: "4",
  community: "5",
  users: "6",
  join: "7",
  contact: "8",
  programs: "9",
  campus: "10",
  registration: "11",
  rules: "12",
  awards: "13",
  login: "14",
  media: "15",
  events: "16",
  news: "17",
  stories: "18",
  graduate: "19",
  gallery: "20",
};

export type BannerData = { image?: string; title?: ReactNode; subtitle?: ReactNode };

/**
 * Banner details of a page from Drupal, in the visitor's language.
 * Only the values Drupal actually has are returned — PageBanner keeps its own value for the rest.
 * If the Arabic translation doesn't exist yet, the dictionary text stays and only the
 * English banner image is used. Never throws: if Drupal is down, the page shows its built-in banner.
 */
export async function getBanner(page: PageKey, locale: Locale): Promise<BannerData> {
  const { node, english } = await loadPage(page, locale);
  if (node) {
    return {
      image: imageOf(node),
      title: html(node.field_main_title) ?? html(node.title),
      subtitle: html(node.field_sub_title),
    };
  }
  // no translation in this language → borrow just the image from English
  return english ? { image: imageOf(english) } : {};
}

/**
 * <title> and meta description of a page: main title and sub title as plain text.
 * Empty when the page isn't mapped, has no translation in this language, or Drupal is down —
 * the caller then keeps the dictionary text.
 */
export async function getPageMeta(page: PageKey, locale: Locale): Promise<{ title?: string; description?: string }> {
  const { node } = await loadPage(page, locale);
  if (!node) return {};
  return {
    title: text(node.field_main_title) || text(node.title) || undefined,
    description: text(node.field_sub_title) || undefined,
  };
}

/**
 * The page's node in this language (+ the English one when the translation is missing).
 * Banner and metadata ask for the same URLs, so Next.js fetches them only once per request.
 */
async function loadPage(page: PageKey, locale: Locale): Promise<{ node: DrupalPage | null; english: DrupalPage | null }> {
  const nid = pageNids[page];
  if (!nid) return { node: null, english: null };
  try {
    const node = await getPage(nid, locale);
    const english = !node && locale !== "en" ? await getPage(nid, "en") : null;
    return { node, english };
  } catch (error) {
    console.error(`Drupal page "${page}" (node ${nid}) could not be loaded`, error);
    return { node: null, english: null };
  }
}

const imageOf = (node: DrupalPage) => (node.banner ? absoluteUrl(node.banner.trim()) : undefined);

/**
 * Main title / sub title use the "Default" text formatter, so Drupal sends HTML such as
 * "<p>Energy &amp; Water<br>Academy</p>". The <p> wrappers are removed (they aren't allowed
 * inside <h1>/<p>); paragraphs become line breaks and inline markup (<br>, <strong>,
 * <span class="fnt-orange">…) is kept.
 */
function html(value?: string): ReactNode | undefined {
  const clean = (value ?? "")
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br>")
    .replace(/<\/?p[^>]*>/gi, "")
    .trim();
  if (!clean.replace(/<br\s*\/?>/gi, "").trim()) return undefined;
  return <span dangerouslySetInnerHTML={{ __html: clean }} />;
}

/** HTML from Drupal → one line of plain text (for <title> / meta description). */
function text(value?: string): string {
  return (value ?? "")
    .replace(/<br\s*\/?>|<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, e: string) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " })[e] ?? "")
    .replace(/\s+/g, " ")
    .trim();
}
