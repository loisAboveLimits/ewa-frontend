import { absoluteUrl, drupalHtml, fetchView } from "@/lib/drupal";
import type { Facility } from "@/lib/facilities";
import type { Locale } from "@/lib/i18n/config";

/** One item of GET /api/media/campus/{langcode} (Drupal module "ewa_content_api"). */
type CampusItem = {
  nid: number;
  title: string;
  main_title: string;
  content: string; // HTML
  weight: number;
  gallery: { delta: number; mid: number; image: string; alt: string }[];
};

const photoLabel: Record<string, string> = { en: "photo", ar: "صورة" };
const isFileName = (s: string) => /\.(jpe?g|png|webp|gif|svg|avif|bmp)$/i.test(s.trim());

/**
 * Campus & Facilities from Drupal, in the visitor's language and in "Weigth" order,
 * ready for <FacilitySection>. Returns [] when Drupal has none or can't be reached
 * (the page then shows the built-in list from lib/facilities.tsx).
 */
export async function getCampusFacilities(locale: Locale): Promise<Facility[]> {
  let items: CampusItem[] = [];
  try {
    items = await fetchView<CampusItem>({ path: "media/campus", lang: locale });
  } catch (error) {
    console.error("Drupal campus facilities could not be loaded", error);
    return [];
  }

  return items
    .filter((item) => item && typeof item === "object" && "gallery" in item)
    .map((item) => {
      const title = (item.main_title || item.title).trim();
      const images = item.gallery.map((g, i) => ({
        src: absoluteUrl(g.image),
        // media names like "slide4.jpg" make poor alt text
        alt: g.alt && !isFileName(g.alt) ? g.alt : `${title} – ${photoLabel[locale] ?? "photo"} ${i + 1}`,
      }));

      return {
        id: `facility-${item.nid}`,
        title,
        images: images.length ? images : [{ src: "/imgs/slides/slide1.jpg", alt: title }],
        // space-y-4 keeps the gap between paragraphs, like the built-in content
        content: <div className="space-y-4" dangerouslySetInnerHTML={{ __html: drupalHtml(item.content) }} />,
      };
    });
}
