"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function CampusCarousel() {
  return (
    <Swiper

        grabCursor={true}
        centeredSlides={true}     
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        loop={true}
        spaceBetween={5}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="campus-swiper gallery-swiper-orange box box-mixed "
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView:1,
          },
        }}
    >
      <SwiperSlide>
        <img
          src="/imgs/slides/slide1.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/imgs/slides/slide2.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/imgs/slides/slide3.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/imgs/slides/slide4.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/imgs/slides/slide3.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
}