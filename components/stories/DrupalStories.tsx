import StoriesCarousel, { type Story } from "@/components/stories/Stories";
import { getMediaSection, PLACEHOLDER_IMAGE } from "@/lib/mediaPosts";
import { getLocale } from "@/lib/i18n/server";
import { MAX_SLIDER_POSTS } from "@/lib/news";

/**
 * Stories carousel filled from a Media Center category in Drupal (default: Success Stories),
 * in the visitor's language: the main image of the newest 5 posts (images only, no links).
 * Falls back to the built-in photos when Drupal has none or can't be reached.
 *
 *   <DrupalStories />
 *   <DrupalStories category="graduate-projects" />
 */
export default async function DrupalStories({ category = "success-stories" }: { category?: string }) {
  const posts = await getMediaSection("posts", category, await getLocale());
  const stories: Story[] = (posts ?? [])
    .filter((p) => p.image && p.image !== PLACEHOLDER_IMAGE)
    .slice(0, MAX_SLIDER_POSTS) // newest 5
    .map((p) => ({ src: p.image, alt: p.title }));
  return <StoriesCarousel stories={stories} />;
}
