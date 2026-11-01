"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { paintPanorama, setPanoramaTransition } from "@/components/ui/panorama";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./Directors.module.css";

/** One photo of the board carousel (from Drupal, see DrupalDirectors, or the built-in list). */
export type Director = { src: string; name?: string; position?: string };

/* Built-in photos — used when no `directors` are passed (Drupal down…) */
const builtIn: Director[] = [
  { src: "/imgs/directors/dir1.jpg" },
  { src: "/imgs/directors/dir2.jpg" },
  { src: "/imgs/directors/dir3.jpg" },
  { src: "/imgs/directors/dir4.jpg" },
];

export default function DirectorsCarousel({ directors }: { directors?: Director[] }) {
  const list = directors?.length ? directors : builtIn;
  // loop mode needs more slides than the 4 visible on large screens — repeat the list
  const slides = Array.from({ length: Math.max(2, Math.ceil(8 / list.length)) }, () => list).flat();

  // own pagination: one dot per real person (Swiper's would also count the repeated copies)
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const sync = (s: SwiperType) => setActive(s.realIndex % list.length);

  /* Go to person i by the shortest way round. (Swiper's slideToLoop doesn't work with this
     loop + centred + 2.4-per-view setup.) The list is repeated every `list.length` slides,
     so a target past either end is swapped for the same person's copy. */
  const goTo = (i: number) => {
    if (!swiper) return;
    const n = list.length;
    let step = (i - (swiper.realIndex % n)) % n;
    if (step > n / 2) step -= n;
    if (step < -n / 2) step += n;
    let target = swiper.activeIndex + step;
    while (target < 0) target += n;
    while (target > swiper.slides.length - 1) target -= n;
    swiper.slideTo(target);
  };

  return (
    <div className={styles.panorama}>
      <Swiper
        modules={[Autoplay]}
        loop
        grabCursor
        speed={700}
        spaceBetween={12}
        slidesPerView={1.6}
        centeredSlides
        watchSlidesProgress
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        breakpoints={{
          640: { slidesPerView: 2.4, centeredSlides: true },
          1024: { slidesPerView: 4, centeredSlides: false },
        }}
        onSwiper={setSwiper}
        onSlideChange={sync}
        onInit={(s) => { paintPanorama(s); sync(s); }}
        onResize={paintPanorama}
        onSetTranslate={paintPanorama}
        onSetTransition={setPanoramaTransition}
        className={styles.swiper}
      >
        {slides.map((d, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <div className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.src}
                alt={i < list.length ? [d.name, d.position].filter(Boolean).join(", ") : ""}
                className={styles.img}
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Dots — same classes as Swiper's pagination, so the existing styles apply */}
        <div slot="container-end" className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
          {list.map((d, i) => (
            <button
              key={i}
              type="button"
              className={`swiper-pagination-bullet${i === active ? " swiper-pagination-bullet-active" : ""}`}
              aria-label={d.name ? d.name : `${i + 1} / ${list.length}`}
              aria-current={i === active || undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Curved top and bottom edges (inside the Swiper so the dots stay on top) */}
        <span slot="container-end" className={`${styles.arc} ${styles.arcTop}`} aria-hidden="true" />
        <span slot="container-end" className={`${styles.arc} ${styles.arcBottom}`} aria-hidden="true" />
      </Swiper>
    </div>
  );
}
