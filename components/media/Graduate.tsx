"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

import Link from "@/components/i18n/Link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { MAX_SLIDER_POSTS, type NewsItem } from "@/lib/news";

import "swiper/css";
import "swiper/css/pagination";

// Built-in slides (used when no `items` are passed, e.g. Drupal down) — titles reuse the careers copy
const images = [
  "/imgs/slides/media1.jpg",
  "/imgs/slides/media2.jpg",
  "/imgs/slides/media3.jpg",
  "/imgs/slides/media4.jpg",
  "/imgs/slides/media5.jpg",
];

type Card = { key: string; image: string; title: string; excerpt?: string; href?: string };

/**
 * Graduate Projects carousel (Media Center, #graduate). With `items` (Drupal posts of the
 * Graduate Projects category — see DrupalGraduate) each card shows the main title, the excerpt
 * and a Read More link — the only link on the card. Font sizes match the Community MediaCarousel.
 */
export default function GraduateCarousel({ items }: { items?: NewsItem[] }) {
  const { t } = useI18n();

  const cards: Card[] = items?.length
    ? items.slice(0, MAX_SLIDER_POSTS).map((item) => ({
        key: item.id,
        image: item.image,
        title: item.title,
        excerpt: item.excerpt,
        href: item.href,
      }))
    : images.map((image, i) => ({ key: `builtin-${i}`, image, title: t.join.careers[i]?.title ?? "" }));

  // up to 3 cards show at once — the loop needs plenty of slides, so repeat short lists
  const slides = cards.length >= 8 ? cards : Array.from({ length: Math.ceil(8 / Math.max(cards.length, 1)) }, () => cards).flat();

  // own pagination: one dot per real post (Swiper's would also count the repeated copies)
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const n = cards.length;
  const sync = (s: SwiperType) => setActive(s.realIndex % n);

  /* go to post i the shortest way round; copies repeat every `n` slides */
  const goTo = (i: number) => {
    if (!swiper) return;
    let step = (i - (swiper.realIndex % n)) % n;
    if (step > n / 2) step -= n;
    if (step < -n / 2) step += n;
    let target = swiper.activeIndex + step;
    while (target < 0) target += n;
    while (target > swiper.slides.length - 1) target -= n;
    swiper.slideTo(target);
  };

  return (
    <section className="w-full py-6 md:py-12">

      <div className="container mx-auto px-4 relative">

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={0}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={setSwiper}
          onSlideChange={sync}
          onInit={sync}
          className="tripleSwiper centeredSwiper noNav"
        >

          {slides.map((card, i) => {
            const copy = i >= n; // repeated copy for the loop: hide from screen readers
            return (
              <SwiperSlide key={`${card.key}-${i}`} aria-hidden={copy || undefined}>

                <article className="box relative overflow-hidden aspect-[67/33]">

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />

                  <div className="overlayed"></div>

                  {/* dark fade behind the text so it stays readable on any photo */}
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-black/80 via-black/50 to-transparent" />

                  {/* same font sizes as the Community MediaCarousel */}
                  <div className="absolute bottom-0 start-0 w-full px-8 py-5 text-white">

                    <h3 className="text-white md:text-[15px]! lg:text-[15px]! xl:text-[15px]! font-bold leading-none! line-clamp-1">
                      {card.title}
                    </h3>

                    {card.excerpt && (
                      <p className="mt-1.5 leading-snug! text-white/95 line-clamp-1 text-[10px]!">{card.excerpt}</p>
                    )}

                    <div className="spacer-20"></div>

                    {/* Read More — the only link on the card */}
                    {card.href && (
                      <div className="mt-1 flex justify-end">
                        <Link
                          href={card.href}
                          tabIndex={copy ? -1 : undefined}
                          className="relative z-10 btn btn-transparent font-bold text-[10px]! remPad text-white"
                        >
                          {t.common.readMore}
                          <Image
                            src="/imgs/icons/icon-send-orange.png"
                            alt=""
                            aria-hidden
                            width={15}
                            height={15}
                            className="mar-left-5 h-auto rtl-flip"
                          />
                        </Link>
                      </div>
                    )}

                  </div>

                </article>

              </SwiperSlide>
            );
          })}

          {/* dots — same classes as Swiper's pagination, so the existing styles apply */}
          {n > 1 && (
            <div slot="container-end" className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
              {cards.map((card, i) => (
                <button
                  key={card.key}
                  type="button"
                  className={`swiper-pagination-bullet${i === active ? " swiper-pagination-bullet-active" : ""}`}
                  aria-label={card.title || `${i + 1} / ${n}`}
                  aria-current={i === active || undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}

        </Swiper>

      </div>

    </section>
  );
}
