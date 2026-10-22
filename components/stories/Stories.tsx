"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { paintPanorama, setPanoramaTransition } from "@/components/ui/panorama";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./Stories.module.css";

const slides = [
  "/imgs/slides/slide1.jpg",
  "/imgs/slides/slide2.jpg",
  "/imgs/slides/slide3.jpg",
  "/imgs/slides/slide4.jpg",
  "/imgs/slides/slide2.jpg",
  "/imgs/slides/slide3.jpg",
];

export default function StoriesCarousel() {
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
