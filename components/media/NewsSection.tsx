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

  return (
    <section aria-label={t.media.latestNews} className={`py-8 md:py-10 ${className}`}>
      <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        <div className="lg:col-span-7">
          <FeaturedNewsSlider items={featured} />
        </div>

        {/* bottom padding lines the list up with the slider (above its pagination) */}
        <div className="lg:col-span-5 lg:pb-[52px]">
          <LatestNews items={latest} locale={locale} />
        </div>
      </div>
    </section>
  );
}
