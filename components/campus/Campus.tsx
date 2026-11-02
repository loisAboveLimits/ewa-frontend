"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

/** One photo of the campus carousel (from Drupal, see DrupalCampusCarousel, or the built-in list). */
export type CampusSlide = { src: string; alt?: string };

/* Built-in photos — used when no `slides` are passed (Drupal down…) */
const builtIn: CampusSlide[] = [
  { src: "/imgs/slides/slide1.jpg" },
  { src: "/imgs/slides/slide2.jpg" },
  { src: "/imgs/slides/slide3.jpg" },
  { src: "/imgs/slides/slide4.jpg" },
];

export default function CampusCarousel({ slides: items }: { slides?: CampusSlide[] }) {
  const slides = items?.length ? items : builtIn;

  return (
    <Swiper
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={5}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        loop={slides.length > 2}
        modules={[Pagination, Autoplay]}
        className="campus-swiper gallery-swiper-orange box box-mixed h-full"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt ?? ""}
            // fill the carousel's height (set by the page) — cropped, never stretched
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
