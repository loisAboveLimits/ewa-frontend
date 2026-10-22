"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  "/imgs/slides/slide1.jpg",
  "/imgs/slides/slide2.jpg",
  "/imgs/slides/slide3.jpg",
  "/imgs/slides/slide4.jpg",
  "/imgs/slides/slide3.jpg",
];

export default function CampusCarousel() {
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
        loop={true}
        modules={[Pagination, Autoplay]}
        className="campus-swiper gallery-swiper-orange box box-mixed"
    >
      {slides.map((src, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            alt=""
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
