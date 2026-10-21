"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard, Autoplay } from "swiper/modules";

import "swiper/css";

export type SlideImage = { src: string; alt: string };

type Props = {
  images: SlideImage[];
  /** which side the slider sits on — controls the curved corners */
  side?: "left" | "right";
  /** load the first image eagerly (use for the first section only) */
  priority?: boolean;
  label: string;
};

export default function FacilitySlider({ images, side = "left", priority = false, label }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const multiple = images.length > 1;

  // Curved corners mirror depending on the side, like the design
  const shape =
    side === "left"
      ? "rounded-tr-[48px] rounded-bl-[48px] md:rounded-tr-[90px] md:rounded-bl-[90px]"
      : "rounded-tl-[48px] rounded-br-[48px] md:rounded-tl-[90px] md:rounded-br-[90px]";

  return (
    <div className={`group relative isolate overflow-hidden ${shape} shadow-[0_10px_30px_rgba(19,153,156,0.15)]`}>
      <Swiper
        modules={[A11y, Keyboard, Autoplay]}
        onSwiper={setSwiper}
        loop={multiple}
        speed={700}
        grabCursor={multiple}
        allowTouchMove={multiple}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={multiple ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        a11y={{ containerMessage: label, prevSlideMessage: "Previous image", nextSlideMessage: "Next image" }}
        className="aspect-[16/11] sm:aspect-[16/10] w-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.src + i}>
            <div className="relative h-full w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={priority && i === 0}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              {/* teal tint from the design */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#13999C]/35 via-[#13999C]/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {multiple && (
        <>
          <NavButton direction="prev" onClick={() => swiper?.slidePrev()} />
          <NavButton direction="next" onClick={() => swiper?.slideNext()} />
        </>
      )}
    </div>
  );
}

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous image" : "Next image"}
      className={
        "absolute top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center " +
        "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition hover:scale-110 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full " +
        (isPrev ? "left-2 md:left-6" : "right-2 md:right-6")
      }
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 md:h-11 md:w-11" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d={isPrev ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
