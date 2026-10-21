import FeaturedNewsSlider from "./FeaturedNewsSlider";
import LatestNews from "./LatestNews";
import { featuredNews, latestNews, type NewsItem } from "@/lib/news";

export default function NewsSection({
  featured = featuredNews,
  latest = latestNews,
  className = "",
}: {
  featured?: NewsItem[];
  latest?: NewsItem[];
  className?: string;
}) {
  return (
    <section aria-label="Latest news" className={`py-8 md:py-10 ${className}`}>
      <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        <div className="lg:col-span-7">
          <FeaturedNewsSlider items={featured} />
        </div>

        {/* bottom padding lines the list up with the slider (above its pagination) */}
        <div className="lg:col-span-5 lg:pb-[52px]">
          <LatestNews items={latest} />
        </div>
      </div>
    </section>
  );
}
