"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, EffectFade, Keyboard } from "swiper/modules";
import { formatNewsDate, type NewsItem } from "@/lib/news";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt, type Locale } from "@/lib/i18n/config";

import "swiper/css";
import "swiper/css/effect-fade";

type Props = {
  items: NewsItem[];
  /** stories per page */
  perPage?: number;
  className?: string;
};

export default function NewsList({ items, perPage = 8, className = "" }: Props) {
  const { locale, t } = useI18n();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [page, setPage] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const pages = useMemo(() => {
    const out: NewsItem[][] = [];
    for (let i = 0; i < items.length; i += perPage) out.push(items.slice(i, i + perPage));
    return out;
  }, [items, perPage]);

  const goTo = (i: number) => {
    swiper?.slideTo(i);
    // bring the top of the list back into view if the reader scrolled past it
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!items.length) {
    return <p className="py-10 text-center text-[#13999C]">{t.media.noNews}</p>;
  }

  return (
    <div ref={topRef} className={`scroll-mt-28 ${className}`}>
      <Swiper
        modules={[EffectFade, A11y, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={600}
        autoHeight
        allowTouchMove={pages.length > 1}
        keyboard={{ enabled: true, onlyInViewport: true }}
        onSwiper={setSwiper}
        onSlideChange={(s) => setPage(s.activeIndex)}
        a11y={{ containerMessage: t.media.newsList }}
      >
        {pages.map((pageItems, p) => (
          <SwiperSlide key={p} aria-label={fmt(t.media.pageOf, { n: p + 1, total: pages.length })} inert={p !== page}>
            <ul>
              {pageItems.map((item) => (
                <li key={item.id} className="border-b border-[#F1E1D6] last:border-b-0">
                  <NewsRow item={item} locale={locale} />
                </li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* pagination – same ovals as the featured slider */}
      {pages.length > 1 && (
        <nav aria-label={t.media.newsPages} className="mt-6 md:mt-8 flex justify-center gap-2">
          {pages.map((_, i) => {
            const isActive = i === page;
            return (
              <button
                key={i}
                type="button"
                aria-label={fmt(t.media.page, { n: i + 1 })}
                aria-current={isActive ? "page" : undefined}
                onClick={() => goTo(i)}
                className={
                  "h-[13px] w-[22px] md:h-[15px] md:w-[25px] rounded-[50%] cursor-pointer " +
                  "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2 " +
                  (isActive ? "bg-[#13999C]" : "bg-[#DDDDDD] hover:bg-[#B9DFDE]")
                }
              />
            );
          })}
        </nav>
      )}
    </div>
  );
}

function NewsRow({ item, locale }: { item: NewsItem; locale: Locale }) {
  return (
    <Link
      href={item.href}
      className="group relative flex items-start gap-4 sm:gap-5 md:gap-6 py-5 md:py-6 pe-8 md:pe-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2 rounded"
    >
      {/* thumbnail */}
      <span className="relative shrink-0 w-[110px] sm:w-[160px] md:w-[180px] aspect-[180/112] overflow-hidden border-2 border-[#13999C] bg-[#C8EAE8]">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 768px) 180px, (min-width: 640px) 160px, 110px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>

      {/* text */}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs sm:text-sm text-[#EE7A52] underline underline-offset-2">{item.category}</span>
        <span className="mt-1 text-base sm:text-lg md:text-2xl font-bold leading-snug text-[#13999C] line-clamp-2 decoration-[#13999C]/40 underline-offset-4 group-hover:underline">
          {item.title}
        </span>
        {item.excerpt && (
          <span className="mt-1 hidden sm:block text-xs md:text-sm leading-snug text-[#13999C]/90 line-clamp-2 md:line-clamp-3">
            {item.excerpt}
          </span>
        )}
        <time dateTime={item.date} className="mt-1.5 text-sm md:text-base text-[#13999C]">
          {formatNewsDate(item.date, locale)}
        </time>
      </span>

      {/* chevron */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="absolute end-0 bottom-5 md:bottom-6 h-6 w-6 md:h-7 md:w-7 text-[#EE7A52] transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl-flip"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
