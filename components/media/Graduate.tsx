"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import ArrowLink from "@/components/ui/ArrowLink";
import { useI18n } from "@/components/i18n/I18nProvider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Placeholder stories — titles currently reuse the careers copy (join.careers in the dictionaries).
// Swap for real graduate stories (with both languages) when the content is ready.
const stories = [
  { id: 1, link: "#", image: "/imgs/slides/media1.jpg" },
  { id: 2, link: "#", image: "/imgs/slides/media2.jpg" },
  { id: 3, link: "#", image: "/imgs/slides/media3.jpg" },
  { id: 4, link: "#", image: "/imgs/slides/media4.jpg" },
  { id: 5, link: "#", image: "/imgs/slides/media5.jpg" },
];

export default function GraduateCarousel() {
  const { t } = useI18n();
  const slides = stories.map((story, i) => ({ ...story, title: t.join.careers[i].title }));

  return (
    <section className="w-full py-6 md:py-12">

      <div className="container mx-auto px-4 relative">

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={0}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="tripleSwiper centeredSwiper noNav"
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

                  <h3 className="text-white text-[18px]! sm:text-[16px]! font-bold">
                    {slide.title}
                  </h3>
                  <div className="spacer-5"></div>

                  <div className="flex justify-end">
                    <ArrowLink href={slide.link} color="orange" iconSize={15} className="text-[13px]! sm:text-[12px]!">
                      {t.common.readMore}
                    </ArrowLink>
                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}
