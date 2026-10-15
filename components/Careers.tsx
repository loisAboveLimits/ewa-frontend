
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";

import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Slider data
const slides = [
  {
    id: 1,
    date: "25 Dec 2026",
    title: "IT Manager",
    link: "",
    description: "High-quality technical education.",
    image: "/imgs/slides/media1.jpg",
    location: "Jeddah",
  },
  {
    id: 2,
    date: "17 Nov 2026",
    title: "Social Media Specialist",
    link: "",
    description: "Developing future energy professionals.",
    image: "/imgs/slides/media2.jpg",
    location: "Dammam",
  },
  {
    id: 3,
    date: "13 Oct 2026",
    title: "SEO Optimizer",
    link: "",
    description: "Building industry-ready skills.",
    image: "/imgs/slides/media3.jpg",
    location: "Riyadh",
  },
  {
    id: 4,
    date: "21 Feb 2027",
    title: "HR Manager",
    link: "",
    description: "Preparing the next generation.",
    image: "/imgs/slides/media4.jpg",
    location: "Jeddah",
  },
  {
    id: 5,
    date: "24 Mar 2027",
    link: "",
    title: "Career Development Manager",
    description: "Empowering future leaders.",
    image: "/imgs/slides/media5.jpg",
    location: "Jeddah",
  },
];

export default function CareersCarousel() {
  return (
    <section className="w-full py-12">

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

                <div className="absolute bottom-0 left-0 w-full p-6">

                  <p className="font-light text-[10px]!"><i className="fa-regular fa-calendar-days mar-right-5"></i> {slide.date}</p>
                  <h3 className="text-white text-[16]! font-bold">
                    {slide.title}
                  </h3>
                  <div className="spacer-5"></div>

                 <div className="flex sm:flex-row md:flex-row justify-center">

                    <div className="md:w-[25%] text-center">
                      <p className="text-[11px]! box box-green text-center py-1">{slide.location}</p>
                    </div>

                     <div className="md:w-[40%]"></div>
                  
                    <div className="md:w-[35%]">
                      <div className="flex justify-end mt-auto">
                          <Link href={slide.link} className="btn btn-transparent font-bold text-[14px]! remPad">
                            Apply
                            <Image
                              src="/imgs/icons/icon-send-orange.png"
                              alt="EWA"
                              width={30}
                              height={30}
                              className="mar-left-5"
                            />
                          </Link>
                        </div>                       
                    </div>
                  </div>                   
                  

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

     {/* Custom SVG Navigation 
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
       */}

      </div>

    </section>
  );
}
