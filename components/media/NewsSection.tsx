import FeaturedNewsSlider from "./FeaturedNewsSlider";
import LatestNews from "./LatestNews";
import { getFeaturedNews, getLatestNews, type NewsItem } from "@/lib/news";
import { getI18n } from "@/lib/i18n/server";

export default async function NewsSection({
  featured,
  latest,
  className = "",
}: {
  featured?: NewsItem[];
  latest?: NewsItem[];
  className?: string;
}) {
  const { locale, t } = await getI18n();
  featured ??= getFeaturedNews(locale);
  latest ??= getLatestNews(locale);

  // a category from Drupal may have no featured or no latest posts: hide that column
  if (!featured.length && !latest.length) return null;
  const both = featured.length > 0 && latest.length > 0;

  return (
    <section aria-label={t.media.latestNews} className={`py-8 md:py-10 ${className}`}>
      {/* grid-cols-1 + min-w-0: without them the single mobile column grows to the width of
          the slider's track and the page becomes millions of px wide on phones and tablets */}
      <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        {featured.length > 0 && (
          <div className={`min-w-0 ${both ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <FeaturedNewsSlider items={featured} />
          </div>
        )}

        {/* bottom padding lines the list up with the slider (above its pagination) */}
        {latest.length > 0 && (
          <div className={`min-w-0 ${both ? "lg:col-span-5 lg:pb-[52px]" : "lg:col-span-12"}`}>
            <LatestNews items={latest} locale={locale} />
          </div>
        )}
      </div>
    </section>
  );
}
