
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Slider data
const slides = [
  {
    id: 1,
    title: "Technical Training",
    description: "High-quality technical education.",
    image: "/imgs/slides/media1.jpg",
  },
  {
    id: 2,
    title: "Energy Programs",
    description: "Developing future energy professionals.",
    image: "/imgs/slides/media2.jpg",
  },
  {
    id: 3,
    title: "Water Technology",
    description: "Building industry-ready skills.",
    image: "/imgs/slides/media3.jpg",
  },
  {
    id: 4,
    title: "Innovation",
    description: "Preparing the next generation.",
    image: "/imgs/slides/media4.jpg",
  },
  {
    id: 5,
    title: "Career Development",
    description: "Empowering future leaders.",
    image: "/imgs/slides/media5.jpg",
  },
];

export default function MediaCarousel() {
  return (
    <section className="w-full py-12">

      <div className="container mx-auto px-4 relative">

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

                <div className="absolute bottom-0 left-0 w-full p-6">

                  <h3 className="text-white text-[18px]! font-bold">
                    {slide.title}
                  </h3>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

     {/* Custom SVG Navigation */}
      <div className="">
        <div className="flex justify-center items-center gap-6 mt-10">

          <button
            type="button"
            className="custom-prev absolute left-[-5%] top-[40%] -translate-y-[40%] z-50 cursor-pointer"
            aria-label="Previous slide"
          >
            <Image
              src="/imgs/icons/arrow-prev.svg"
              alt=""
              width={60}
              height={60}
            />
          </button>

          <button
            type="button"
            className="custom-next absolute right-[-5%] top-[40%] -translate-y-[40%] z-50 cursor-pointer"
            aria-label="Next slide"
          >
            <Image
              src="/imgs/icons/arrow-next.svg"
              alt=""
              width={60}
              height={60}
            />
          </button>

        </div>         
      </div>
       

      </div>

    </section>
  );
}
