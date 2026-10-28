"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

/**
 * Partner logos scrolling non-stop like a news ticker (Swiper autoplay, linear speed).
 * Direction follows the page: right → left in English, left → right in Arabic
 * (Swiper reads dir="rtl" from <html>).
 * Visitors who ask for reduced motion get a still row instead.
 */
export default function LogoTicker({
  logos,
  alt,
  speed = 3000,
}: {
  logos: number[];
  alt: string;
  /** Milliseconds for one logo to pass — higher = slower. */
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
  const items = logos.length ? Array.from({ length: Math.max(3, Math.ceil(18 / logos.length)) }, () => logos).flat() : [];

  return (
    <div
      className="logo-ticker overflow-hidden px-2 md:px-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label={alt}
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
        {items.map((n, i) => (
          <SwiperSlide key={`${n}-${i}`} aria-hidden={i >= logos.length || undefined}>
            <div className="p-2 md:p-4">
              <Image
                src={`/imgs/partners/partner${n}.svg`}
                alt={i < logos.length ? alt : ""}
                width={150}
                height={60}
                className="h-auto w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
