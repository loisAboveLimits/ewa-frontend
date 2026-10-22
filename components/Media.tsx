"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Slider images — titles / descriptions come from the dictionary (community.mediaSlides)
const images = [
  "/imgs/slides/media1.jpg",
  "/imgs/slides/media2.jpg",
  "/imgs/slides/media3.jpg",
  "/imgs/slides/media4.jpg",
  "/imgs/slides/media5.jpg",
];

export default function MediaCarousel() {
  const { t } = useI18n();
  const slides = t.community.mediaSlides.map((copy, i) => ({ id: i + 1, ...copy, image: images[i] }));

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

          {slides.map((slide) => (

            <SwiperSlide key={slide.id}>

              <div className="box relative overflow-hidden ">

                <div className="overlayed"></div>

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto object-cover"
                />

                <div className="absolute bottom-0 start-0 w-full p-6">

                  <h3 className="text-white text-[18px]! font-bold">
                    {slide.title}
                  </h3>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

        {/* Custom SVG navigation — "previous" sits on the start side and arrows mirror in Arabic */}
        <button
          type="button"
          className="custom-prev absolute start-0 lg:start-[-5%] top-[40%] -translate-y-[40%] z-50 cursor-pointer w-10 md:w-[60px]"
          aria-label={t.common.previousSlide}
        >
          <Image src="/imgs/icons/arrow-prev.svg" alt="" width={60} height={60} className="h-auto w-full rtl-flip" />
        </button>

        <button
          type="button"
          className="custom-next absolute end-0 lg:end-[-5%] top-[40%] -translate-y-[40%] z-50 cursor-pointer w-10 md:w-[60px]"
          aria-label={t.common.nextSlide}
        >
          <Image src="/imgs/icons/arrow-next.svg" alt="" width={60} height={60} className="h-auto w-full rtl-flip" />
        </button>

      </div>

    </section>
  );
}
