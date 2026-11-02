import type { ReactNode } from "react";
import DrupalHtml from "@/components/drupal/DrupalHtml";
import { getPageContent } from "@/lib/pageContent";
import { getLocale } from "@/lib/i18n/server";

/**
 * Shows the HTML "Content" field of a Drupal page node, in the visitor's language
 * (view "EWA Pages API's" → REST export /api/page/content/{nid}/{lang}).
 *
 *   <DrupalContent nid={3} id="about" />
 *   <DrupalContent nid={3} id="about" fallback={<section id="about">…</section>} />
 *
 * If the content already is a <section>, that section gets the `id` (no extra wrapper);
 * otherwise it is wrapped in <section id={id} className={className}>.
 */
export default async function DrupalContent({
  nid,
  id,
  className = "",
  lang,
  englishFallback = false,
  fallback = null,
}: {
  /** Node id of the Drupal page. */
  nid: string | number;
  /** HTML id of the section, e.g. "about". */
  id?: string;
  /** Classes for the wrapper <section> (only used when the content isn't a <section> itself). */
  className?: string;
  /** Language — default: the visitor's language. */
  lang?: string;
  /** Show the English content when this language has none (default false). */
  englishFallback?: boolean;
  /** Shown when Drupal has no content (in this language) or can't be reached. */
  fallback?: ReactNode;
}) {
  const language = lang ?? (await getLocale());

  let html = await getPageContent(nid, language);
  if (!html && englishFallback && language !== "en") html = await getPageContent(nid, "en");
  if (!html) return <>{fallback}</>;

  // content is one <section>…</section>: give it the id instead of nesting another section
  if (/^<section\b[\s\S]*<\/section>$/i.test(html)) {
    if (id) {
      html = /^<section\b[^>]*\sid="/i.test(html)
        ? html.replace(/^(<section\b[^>]*\sid=")[^"]*"/i, `$1${id}"`)
        : html.replace(/^<section\b/i, `<section id="${id}"`);
    }
    return <DrupalHtml html={html} className="drpl-view-contents" />;
  }

  return <DrupalHtml as="section" html={html} id={id} className={className} />;
}
