"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard, Autoplay } from "swiper/modules";

import "swiper/css";
import { useI18n } from "@/components/i18n/I18nProvider";

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
  const { t } = useI18n();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const multiple = images.length > 1;

  // Curved corners mirror depending on the side, like the design
  const shape =
    side === "left"
      ? "rounded-se-[48px] rounded-es-[48px] md:rounded-se-[90px] md:rounded-es-[90px]"
      : "rounded-ss-[48px] rounded-ee-[48px] md:rounded-ss-[90px] md:rounded-ee-[90px]";

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
        a11y={{ containerMessage: label, prevSlideMessage: t.common.previousImage, nextSlideMessage: t.common.nextImage }}
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
          <NavButton direction="prev" label={t.common.previousImage} onClick={() => swiper?.slidePrev()} />
          <NavButton direction="next" label={t.common.nextImage} onClick={() => swiper?.slideNext()} />
        </>
      )}
    </div>
  );
}

/** "prev" sits on the start side (left in EN, right in AR); the chevron mirrors with it. */
function NavButton({ direction, label, onClick }: { direction: "prev" | "next"; label: string; onClick: () => void }) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={
        "absolute top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center " +
        "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition hover:scale-110 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full " +
        (isPrev ? "start-2 md:start-6" : "end-2 md:end-6")
      }
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 md:h-11 md:w-11 rtl-flip" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d={isPrev ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
