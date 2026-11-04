import GraduateCarousel from "@/components/media/Graduate";
import { getMediaSection } from "@/lib/mediaPosts";
import { getLocale } from "@/lib/i18n/server";
import { MAX_SLIDER_POSTS } from "@/lib/news";

/**
 * Graduate carousel filled from the Media Center "Graduate Projects" category in Drupal,
 * in the visitor's language: the newest 5 posts (main title, excerpt, Read More).
 * Falls back to the built-in slides when Drupal has none or can't be reached.
 *
 *   <DrupalGraduate />
 */
export default async function DrupalGraduate({ category = "graduate-projects" }: { category?: string }) {
  const posts = await getMediaSection("posts", category, await getLocale());
  return <GraduateCarousel items={posts?.slice(0, MAX_SLIDER_POSTS) ?? undefined} />;
}
