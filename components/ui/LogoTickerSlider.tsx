"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { GalleryImage } from "@/lib/partners";

import "swiper/css";

/**
 * The moving part of <LogoTicker> (Swiper autoplay at a linear speed, see custom.css).
 * Direction follows the page: right → left in English, left → right in Arabic
 * (Swiper reads dir="rtl" from <html>). Reduced-motion visitors get a still row.
 */
export default function LogoTickerSlider({
  images,
  label,
  speed = 3000,
}: {
  images: GalleryImage[];
  label: string;
  speed?: number;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // loop needs more slides than fit on screen — repeat the list
  // logos across: 2 on phones, 5 from tablets up
  const items = images.length ? Array.from({ length: Math.max(3, Math.ceil(18 / images.length)) }, () => images).flat() : [];

  return (
    <div
      className="logo-ticker overflow-hidden px-2 md:px-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label={label}
    >
      <Swiper
        key={reduceMotion ? "still" : "moving"}
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={8}
        loop={!reduceMotion}
        speed={speed}
        allowTouchMove={false}
        autoplay={reduceMotion ? false : { delay: 0, disableOnInteraction: false }}
        breakpoints={{ 768: { slidesPerView: 5, spaceBetween: 16 } }}
      >
        {items.map((image, i) => (
          <SwiperSlide key={`${image.src}-${i}`} aria-hidden={i >= images.length || undefined}>
            <div className="p-2 md:p-4">
              <Image
                src={image.src}
                alt={i < images.length ? image.alt : ""}
                width={150}
                height={60}
                // Drupal files are served as they are (no Next.js image optimizer / remotePatterns needed)
                unoptimized={/^https?:\/\//.test(image.src)}
                // logos keep their orientation on Arabic pages (see app/rtl.css)
                className="no-flip h-auto w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
