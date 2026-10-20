"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function DirectorsCarousel() {
  return (
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}     
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        coverflowEffect={{
          rotate: 45,
          stretch: 15,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        loop={true}
        spaceBetween={5}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="directors-swiper gallery-swiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView:3,
          },
        }}
    >
      <SwiperSlide>
        <img
          src="/imgs/directors/dir1.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/imgs/directors/dir2.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/imgs/directors/dir3.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/imgs/directors/dir4.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/imgs/directors/dir3.jpg"
          alt=""
          className="w-full h-[auto] object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
}