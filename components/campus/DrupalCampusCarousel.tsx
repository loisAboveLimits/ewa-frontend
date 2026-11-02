import CampusCarousel from "@/components/campus/Campus";
import { getMediaGallery } from "@/lib/mediaGallery";
import { getLocale } from "@/lib/i18n/server";

/**
 * Campus carousel (Why page, #campus) filled from the gallery of a Drupal Media Center node,
 * in the visitor's language. Falls back to the built-in photos when Drupal has none.
 *
 *   <DrupalCampusCarousel nid={39} />
 */
export default async function DrupalCampusCarousel({ nid }: { nid: string | number }) {
  const photos = await getMediaGallery(nid, await getLocale());
  return <CampusCarousel slides={photos} />;
}
