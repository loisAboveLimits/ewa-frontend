"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export type Facility = {
  title: string;
  images: string[];
  body: ReactNode;
};

type Props = Facility & {
  /** "left" = photo on the left, text on the right (alternates down the page) */
  imageSide: "left" | "right";
};

export default function FacilitySection({ title, images = [], body, imageSide = "left" }: Props) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const imageLeft = imageSide === "left";

  // Large rounded corners on opposite corners, mirrored for each side
  const shape = imageLeft
    ? "rounded-tl-[4rem] rounded-br-[4rem] sm:rounded-tl-[6rem] sm:rounded-br-[6rem]"
    : "rounded-tr-[4rem] rounded-bl-[4rem] sm:rounded-tr-[6rem] sm:rounded-bl-[6rem]";

  return (
    <section className="grid items-start gap-5 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-8">
      {/* Slider */}
      <div
        className={`group relative isolate overflow-hidden ${shape} ${
          imageLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={images.length > 1}
          speed={800}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation === "object") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation
          className="aspect-[16/10] w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={src + i}>
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                draggable={false}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Teal tint fading up from the bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#139a9d]/75 via-[#139a9d]/30 to-transparent"
        />

        {images.length > 1 && (
          <>
            <ArrowButton buttonRef={prevRef} className="left-3 sm:left-5" label={`Previous ${title} photo`}>
              <path d="M15 5l-7 7 7 7" />
            </ArrowButton>
            <ArrowButton buttonRef={nextRef} className="right-3 sm:right-5" label={`Next ${title} photo`}>
              <path d="M9 5l7 7-7 7" />
            </ArrowButton>
          </>
        )}
      </div>

      {/* Text */}
      <div
        className={`${imageLeft ? "md:order-2 md:text-left" : "md:order-1 md:text-right"} md:pt-1`}
      >
        <h2 className="mb-3 text-2xl font-bold text-[#139a9d] sm:text-3xl">{title}</h2>
        <div className="text-justify text-sm leading-relaxed text-[#139a9d]/90 [text-align-last:left] [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-left">
          {body}
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  buttonRef,
  className,
  label,
  children,
}: {
  buttonRef: Ref<HTMLButtonElement>;
  className: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      className={`${className} absolute top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center text-white/90 transition hover:scale-110 hover:text-white disabled:opacity-30`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 drop-shadow"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  );
}
