import { absoluteUrl, fetchView } from "@/lib/drupal";
import type { Locale } from "@/lib/i18n/config";
import type { OrbitMember } from "@/components/orbit/OrbitShowcase";

/** One row of the "EWA Testimonies API's" view (GET /api/testimonies/{nid|all}/{lang}). */
type TestimonyRow = {
  nid: string;
  title: string;          // person's name
  field_content?: string; // the quote (HTML)
  banner?: string;        // photo URL
  field_role?: string;    // optional — add a "Role" field to the view to fill it
};

/** Drupal HTML → one line of plain text. */
function plainText(html?: string): string {
  return (html ?? "")
    .replace(/<br\s*\/?>|<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, e: string) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " })[e] ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Testimonies from Drupal in the visitor's language, ready for <Testimonials> / the orbit:
 * name = node title, description = content, image = photo.
 * The first ⅔ go on the outer ring, the rest on the inner ring (spaced evenly).
 * Returns [] when Drupal has none or can't be reached.
 */
export async function getTestimonies(locale: Locale): Promise<OrbitMember[]> {
  let rows: TestimonyRow[] = [];
  try {
    // testimonies saved as "Not applicable"/"Not specified" language are picked up too
    for (const lang of [locale, "zxx", "und"]) {
      rows = await fetchView<TestimonyRow>({ path: "testimonies", args: ["all"], lang });
      if (rows.length) break;
    }
  } catch (error) {
    console.error("Drupal testimonies view could not be loaded", error);
    return [];
  }

  const people = rows.filter((row) => row.title && row.banner);
  const outer = Math.ceil((people.length * 2) / 3);

  return people.map((row, i) => ({
    id: `testimony-${row.nid}`,
    name: plainText(row.title),
    role: plainText(row.field_role) || undefined,
    description: plainText(row.field_content) || undefined,
    image: absoluteUrl(row.banner!.trim()),
    ring: i < outer ? "outer" : "inner",
  }));
}
