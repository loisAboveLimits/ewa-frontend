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

// Images + links per job — text (date, title, location) comes from the dictionary (join.careers)
const jobs = [
  { id: 1, link: "#", image: "/imgs/slides/media1.jpg" },
  { id: 2, link: "#", image: "/imgs/slides/media2.jpg" },
  { id: 3, link: "#", image: "/imgs/slides/media3.jpg" },
  { id: 4, link: "#", image: "/imgs/slides/media4.jpg" },
  { id: 5, link: "#", image: "/imgs/slides/media5.jpg" },
];

export default function CareersCarousel() {
  const { t } = useI18n();
  const slides = jobs.map((job, i) => ({ ...job, ...t.join.careers[i] }));

  return (
    <section className="w-full py-6 md:py-12">

      <div className="relative">

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

                  <p className="font-light text-[12px]! sm:text-[10px]!"><i className="fa-regular fa-calendar-days mar-right-5"></i> {slide.date}</p>
                  <h3 className="text-white text-[18px]! sm:text-[16px]! font-bold">
                    {slide.title}
                  </h3>
                  <div className="spacer-5"></div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px]! sm:text-[11px]! box box-green text-center py-1 px-4">{slide.location}</p>

                    <ArrowLink href={slide.link} color="orange" iconSize={26} className="text-[14px]!">
                      {t.common.apply}
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
