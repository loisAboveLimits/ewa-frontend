import LogoTickerSlider from "@/components/ui/LogoTickerSlider";
import { getGallery, type GalleryImage } from "@/lib/partners";
import { getLocale } from "@/lib/i18n/server";

/**
 * Partner logos scrolling non-stop like a news ticker.
 * The logos come from the gallery of a "Partners & Accreditations" node in Drupal
 * (view "EWA Partners API's" → GET /api/partners/{nid}/{lang}), in the visitor's language.
 *
 *   <LogoTicker nid={20} alt={t.common.partner} />
 *
 * `logos` (numbers of /imgs/partners/partnerN.svg) is the fallback when there's no `nid`
 * or Drupal has no images / can't be reached.
 */
export default async function LogoTicker({
  nid,
  logos = [],
  alt,
  speed = 3000,
}: {
  /** Node id of the Partners & Accreditations content whose gallery to show. */
  nid?: string | number;
  /** Built-in logos used when Drupal has nothing: [1, 2, 3] → /imgs/partners/partner1.svg … */
  logos?: number[];
  /** Label of the strip, and alt text for logos without a name in Drupal. */
  alt: string;
  /** Milliseconds for one logo to pass — higher = slower. */
  speed?: number;
}) {
  const drupal = nid != null ? await getGallery(await getLocale(), nid) : [];

  const images: GalleryImage[] = drupal.length
    ? drupal.map((image) => ({ ...image, alt: image.alt || alt }))
    : logos.map((n) => ({ src: `/imgs/partners/partner${n}.svg`, alt }));

  if (!images.length) return null;
  return <LogoTickerSlider images={images} label={alt} speed={speed} />;
}
