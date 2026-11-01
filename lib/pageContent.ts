import { absoluteUrl, fetchView } from "@/lib/drupal";

/** One row of the "REST API - Pages (Contents)" display (GET /api/page/content/{nid}/{lang}). */
type PageContentRow = { nid: string; field_content?: string };

/**
 * The HTML body ("Content" field) of a Drupal page node in one language.
 * Returns "" when the node has no content in that language or Drupal can't be reached.
 */
export async function getPageContent(nid: string | number, lang: string): Promise<string> {
  try {
    const [row] = await fetchView<PageContentRow>({ path: "page/content", args: [nid], lang });
    return normalizeContentHtml(row?.field_content ?? "");
  } catch (error) {
    console.error(`Drupal page content (node ${nid}, ${lang}) could not be loaded`, error);
    return "";
  }
}

// Built from pieces on purpose: Tailwind scans this file for class names and a literal
// pattern here would make it generate a broken background class.
const BG = "b" + "g-\\[url\\(";
const BG_TAG = new RegExp(`<([a-z][\\w-]*)\\b([^>]*?)\\sclass="([^"]*\\b${BG}[^\\]]+\\)\\][^"]*)"([^>]*)>`, "gi");
const BG_CLASS = new RegExp(`\\b${BG}([^)]+)\\)\\]`);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/**
 * Makes body HTML that was pasted from the Next.js code safe to render as plain HTML:
 * - {/* comments *\/}                → removed
 * - <SectionTitle>Text</SectionTitle> → the site's leaf-icon heading
 * - <Image … />                       → <img … />
 * - attr={150} / attr={"x"}           → attr="150"
 * - className="…"                     → class="…"
 * - Tailwind "bg url" arbitrary classes → inline background-image (Tailwind never builds classes
 *                                       that only exist in Drupal, so the image would be missing).
 *   (Don't write a literal example of such a class in this file — Tailwind scans comments too.)
 * - /ewa/sites/… file links           → absolute Drupal URLs
 */
export function normalizeContentHtml(html: string): string {
  let out = html.trim();
  if (!out) return "";

  out = out.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");

  out = out.replace(
    /<SectionTitle(?:\s+as="(h1|h2|h3)")?\s*>([\s\S]*?)<\/SectionTitle>/g,
    (_, tag = "h2", text) =>
      `<div class="flex items-center gap-3 md:gap-4">` +
      `<img src="/imgs/icons/title.svg" alt="" aria-hidden="true" width="45" height="114" class="h-auto w-[22px] shrink-0 sm:w-[30px] lg:w-[40px]">` +
      `<${tag} class="font-bold title fnt-green">${text.trim()}</${tag}></div>`
  );

  out = out.replace(/<Image\b/g, "<img");
  out = out.replace(/(\s[\w-]+)=\{\s*(?:"([^"]*)"|'([^']*)'|([^}\s]+))\s*\}/g, (_, attr, d, s, raw) => `${attr}="${esc(d ?? s ?? raw)}"`);
  out = out.replace(/\sclassName=/g, " class=");

  // Tailwind "bg url" class → style="background-image:url('…')"
  out = out.replace(BG_TAG, (whole, tag, before, cls, after) => {
    const match = cls.match(BG_CLASS);
    if (!match) return whole;
    const url = absoluteUrl(match[1].replace(/^['"]|['"]$/g, ""));
    const rest = cls.replace(match[0], "").replace(/\s+/g, " ").trim();
    const styleAttr = `background-image:url('${url}')`;
    const attrs = `${before} class="${rest}"${after}`;
    return /\sstyle="/.test(attrs)
      ? `<${tag}${attrs.replace(/\sstyle="/, ` style="${styleAttr};`)}>`
      : `<${tag}${attrs} style="${styleAttr}">`;
  });

  // relative Drupal files → absolute
  out = out.replace(/(src|href)="(\/[^"]*\/sites\/[^"]*|\/sites\/[^"]*)"/g, (_, attr, path) => `${attr}="${absoluteUrl(path)}"`);

  return out;
}
