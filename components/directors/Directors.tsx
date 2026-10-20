"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./Directors.module.css";

const slides = [
  "/imgs/directors/dir1.jpg",
  "/imgs/directors/dir2.jpg",
  "/imgs/directors/dir3.jpg",
  "/imgs/directors/dir4.jpg",
  "/imgs/directors/dir2.jpg",
];

/* Panorama strength: how much the side slides turn toward you and grow */
const ANGLE = 22; // deg at the edge of the view
const GROW_Y = 0.2; // +20% taller at the edge of the view
const GROW_X = 0.04; // keep widths nearly the same so the gaps stay visible

type PanoSlide = HTMLElement & { swiperSlideOffset: number };

function paintPanorama(swiper: SwiperType) {
  const half = swiper.width / 2;
  swiper.slides.forEach((el) => {
    const slide = el as PanoSlide;
    const center = slide.swiperSlideOffset + swiper.translate + slide.offsetWidth / 2;
    // -1 = left edge of the view, 0 = middle, 1 = right edge
    const d = Math.max(-1.4, Math.min(1.4, (center - half) / half));
    const inner = slide.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const a = Math.abs(d);
    inner.style.transform = `rotateY(${d * -ANGLE}deg) scale(${1 + a * GROW_X}, ${1 + a * GROW_Y})`;
  });
}

function setPanoramaTransition(swiper: SwiperType, duration: number) {
  swiper.slides.forEach((el) => {
    const inner = el.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transitionDuration = `${duration}ms`;
  });
}

export default function DirectorsCarousel() {
  return (
    <div className={styles.panorama}>
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        grabCursor
        speed={700}
        spaceBetween={12}
        slidesPerView={1.6}
        centeredSlides
        watchSlidesProgress
        pagination={{ clickable: true }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        breakpoints={{
          640: { slidesPerView: 2.4, centeredSlides: true },
          1024: { slidesPerView: 4, centeredSlides: false },
        }}
        onInit={paintPanorama}
        onResize={paintPanorama}
        onSetTranslate={paintPanorama}
        onSetTransition={setPanoramaTransition}
        className={styles.swiper}
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <div className={styles.card}>
              <img src={src} alt="" className={styles.img} draggable={false} />
            </div>
          </SwiperSlide>
        ))}

        {/* Curved top and bottom edges (inside the Swiper so the dots stay on top) */}
        <span slot="container-end" className={`${styles.arc} ${styles.arcTop}`} aria-hidden="true" />
        <span slot="container-end" className={`${styles.arc} ${styles.arcBottom}`} aria-hidden="true" />
      </Swiper>
    </div>
  );
}
