"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import type { NewsItem } from "@/lib/news";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";
import { ArrowIcon } from "@/components/ui/ArrowLink";

import "swiper/css";
import "swiper/css/effect-fade";

export default function FeaturedNewsSlider({ items }: { items: NewsItem[] }) {
  const { t } = useI18n();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const multiple = items.length > 1;

  return (
    <div className="flex h-full flex-col">
      <div
        className={
          "relative isolate overflow-hidden " +
          "rounded-ss-[56px] rounded-ee-[56px] md:rounded-ss-[90px] md:rounded-ee-[90px] " +
          "shadow-[0_12px_30px_rgba(19,153,156,0.18)]"
        }
      >
        <Swiper
          modules={[EffectFade, Autoplay, A11y, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={900}
          loop={multiple}
          allowTouchMove={multiple}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={multiple ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.realIndex)}
          a11y={{ containerMessage: t.media.featuredNews }}
          className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[17/10]"
        >
          {items.map((item, i) => (
            <SwiperSlide key={item.id} className="h-full">
              <FeaturedSlide item={item} priority={i === 0} readMore={t.common.readMore} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* pagination */}
      {multiple && (
        <div role="tablist" aria-label={t.media.chooseStory} className="mt-6 md:mt-8 flex justify-center gap-2">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={fmt(t.media.showStory, { n: i + 1, title: item.title })}
                onClick={() => swiper?.slideToLoop(i)}
                className={
                  "ewa-dot " + (isActive ? "is-active " : "") +
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2"
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function FeaturedSlide({ item, priority, readMore }: { item: NewsItem; priority: boolean; readMore: string }) {
  return (
    <article className="group relative h-full w-full">
      <Image
        src={item.image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover"
      />

      {/* teal gradient: bottom-up on phones, from the text side (start) on tablets and up */}
      <div
        aria-hidden
        className={
          "absolute inset-0 bg-linear-to-t from-[#0F8E91] via-[#13999C]/85 via-45% to-[#13999C]/10 " +
          "sm:bg-linear-to-r sm:rtl:bg-linear-to-l sm:from-[#13999C] sm:via-[#13999C]/80 sm:via-50% sm:to-transparent"
        }
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8 sm:justify-center sm:p-8 md:p-10 lg:ps-9 lg:pt-20">
        <div className="max-w-90 md:max-w-[380px] text-white">
          <p className="text-base md:text-lg">{item.category}</p>
          <h3 className="mt-1 text-2xl md:text-[28px] lg:text-[26px] xl:text-[30px] font-bold leading-tight">
            <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:underline decoration-[#EE7A52] underline-offset-4">
              {item.title}
            </Link>
          </h3>
          {item.excerpt && (
            <p className="mt-4 text-sm leading-snug text-white/95 line-clamp-4">{item.excerpt}</p>
          )}

          <div className="spacer-20"></div>
          <div className="flex justify-end">
            <Link href={item.href} className="relative z-10 btn btn-transparent font-bold text-[15px]! remPad">
              {item.ctaLabel ?? readMore}
              <ArrowIcon color="orange" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
