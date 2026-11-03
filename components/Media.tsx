"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { formatNewsDate, MAX_SLIDER_POSTS, type NewsItem } from "@/lib/news";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Built-in slides (used when no `items` are passed) — titles come from the dictionary (community.mediaSlides)
const images = [
  "/imgs/slides/media1.jpg",
  "/imgs/slides/media2.jpg",
  "/imgs/slides/media3.jpg",
  "/imgs/slides/media4.jpg",
  "/imgs/slides/media5.jpg",
];

type Card = {
  key: string;
  image: string;
  title: string;
  category?: string;
  published?: string;
  excerpt?: string;
  href?: string;
};

/**
 * Media carousel (Community page). With `items` (Media Center posts from Drupal) each card shows
 * the category, title, publishing date, excerpt and a Read More link — the only link on the card.
 */
export default function MediaCarousel({ items }: { items?: NewsItem[] }) {
  const { locale, t } = useI18n();

  const cards: Card[] = items?.length
    ? items.slice(0, MAX_SLIDER_POSTS).map((item) => ({
        key: item.id,
        image: item.image,
        title: item.title,
        category: item.category,
        published: item.published ?? item.date,
        excerpt: item.excerpt,
        href: item.href,
      }))
    : t.community.mediaSlides.map((copy, i) => ({ key: `builtin-${i}`, image: images[i], title: copy.title })).slice(0, MAX_SLIDER_POSTS);

  // 3 cards show at once from tablets up — loop needs plenty of slides, so repeat short lists (≤ 5 posts)
  const slides = cards.length >= 8 ? cards : Array.from({ length: Math.ceil(8 / Math.max(cards.length, 1)) }, () => cards).flat();

  return (
    <section className="w-full py-6 md:py-12">

      <div className="relative md:px-10 lg:px-4">

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={0}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="tripleSwiper centeredSwiper"
        >

          {slides.map((card, i) => {
            const copy = i >= cards.length; // repeated copy for the loop: hide from screen readers
            return (
              <SwiperSlide key={`${card.key}-${i}`} aria-hidden={copy || undefined}>

                <article className="box relative overflow-hidden aspect-[67/33]">

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="overlayed"></div>

                  {/* dark fade behind the text so it stays readable on any photo */}
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-black/80 via-black/50 to-transparent" />

                  {/* font sizes match the Media Center section 1 slider (category / excerpt use the global p size) */}
                  <div className="absolute bottom-0 start-0 w-full px-8 py-5 xl:px-8 xl:py-5 text-white">

                    {card.category && (
                      <p className="leading-none! text-[#EE7A52] text-[9px]! font-semibold">{card.category}</p>
                    )}

                    <h3 className="mt-1.5 text-white md:text-[15px]! lg:text-[15px]! xl:text-[15px]! font-bold leading-none! line-clamp-1">
                      {card.title}
                    </h3>

                    {card.published && (
                      <time dateTime={card.published} className="mt-1.5 block text-[9px]! leading-none! text-white/90">
                        {formatNewsDate(card.published, locale)}
                      </time>
                    )}

                    {card.excerpt && (
                      <p className="mt-1.5 leading-snug! text-white/95 line-clamp-1 text-[10px]!">{card.excerpt}</p>
                    )}

                    <div className="spacer-20"></div>

                    {/* Read More — same as the Media Center featured slider; the only link on the card */}
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

        </Swiper>

        {/* Custom SVG navigation — "previous" sits on the start side and arrows mirror in Arabic */}
        <button
          type="button"
          // outside the cards like the design (-5%), but never past the screen edge (16px inside it)
          className="custom-prev absolute start-0 lg:start-[max(-5%,calc((100%_-_100vw)/2_+_16px))] top-[40%] -translate-y-[40%] z-50 cursor-pointer w-10 md:w-[60px]"
          aria-label={t.common.previousSlide}
        >
          <Image src="/imgs/icons/arrow-prev.svg" alt="" width={60} height={60} className="h-auto w-full rtl-flip" />
        </button>

        <button
          type="button"
          className="custom-next absolute end-0 lg:end-[max(-5%,calc((100%_-_100vw)/2_+_16px))] top-[40%] -translate-y-[40%] z-50 cursor-pointer w-10 md:w-[60px]"
          aria-label={t.common.nextSlide}
        >
          <Image src="/imgs/icons/arrow-next.svg" alt="" width={60} height={60} className="h-auto w-full rtl-flip" />
        </button>

      </div>

    </section>
  );
}
