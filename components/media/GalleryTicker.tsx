"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import Lightbox from "./Lightbox";
import { galleryRows, type GalleryImage } from "@/lib/gallery";

import "swiper/css";

/** how many times each row's image group is repeated so the loop never shows a gap */
const COPIES = 4;

type Props = {
  rows?: GalleryImage[][];
  /** ticker speed in pixels per second */
  speed?: number;
  className?: string;
};

export default function GalleryTicker({ rows = galleryRows, speed = 45, className = "" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  // one flat list for the lightbox + the starting offset of each row inside it
  const { allImages, offsets } = useMemo(() => {
    const offsets: number[] = [];
    let n = 0;
    rows.forEach((r) => {
      offsets.push(n);
      n += r.length;
    });
    return { allImages: rows.flat(), offsets };
  }, [rows]);

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section aria-label="Photo gallery" className={`w-full overflow-hidden py-6 md:py-8 ${className}`}>
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {rows.map((row, r) => (
          <TickerRow
            key={r}
            images={row}
            reverse={r % 2 === 1} // alternate direction per row
            pxPerSecond={speed}
            paused={openIndex !== null}
            reduceMotion={reduceMotion}
            onOpen={(i) => setOpenIndex(offsets[r] + i)}
          />
        ))}
      </div>

      {openIndex !== null && <Lightbox images={allImages} startIndex={openIndex} onClose={close} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */

function TickerRow({
  images,
  reverse,
  pxPerSecond,
  paused,
  reduceMotion,
  onOpen,
}: {
  images: GalleryImage[];
  reverse: boolean;
  pxPerSecond: number;
  paused: boolean;
  reduceMotion: boolean;
  onOpen: (index: number) => void;
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  // Each slide is a whole group of images, so every autoplay step moves the same distance.
  // Swiper's `speed` is per slide, so derive it from the group width → constant px/second.
  const syncSpeed = useCallback(
    (s: SwiperType) => {
      const slide = s.slides?.[0] as HTMLElement | undefined;
      if (!slide) return;
      s.params.speed = Math.max(1000, (slide.offsetWidth / pxPerSecond) * 1000);
    },
    [pxPerSecond]
  );

  // pause while the lightbox is open
  useEffect(() => {
    const s = swiperRef.current;
    if (!s || reduceMotion || !s.autoplay) return;
    if (paused) s.autoplay.stop();
    else s.autoplay.start();
  }, [paused, reduceMotion]);

  return (
    <Swiper
      modules={[Autoplay]}
      key={reduceMotion ? "static" : "ticker"}
      slidesPerView="auto"
      loop
      speed={20000}
      spaceBetween={12}
      breakpoints={{ 640: { spaceBetween: 16 }, 1024: { spaceBetween: 24 } }}
      allowTouchMove={reduceMotion}
      autoplay={
        reduceMotion ? false : { delay: 0, disableOnInteraction: false, reverseDirection: reverse }
      }
      onSwiper={(s) => {
        swiperRef.current = s;
        syncSpeed(s);
      }}
      onResize={syncSpeed}
      className="w-full [&_.swiper-wrapper]:[transition-timing-function:linear!important]"
    >
      {Array.from({ length: COPIES }, (_, copy) => (
        <SwiperSlide key={copy} style={{ width: "auto" }} aria-hidden={copy > 0 ? true : undefined}>
          <ul className="flex gap-3 sm:gap-4 lg:gap-6">
            {images.map((img, i) => (
              <li key={img.src + i} className="shrink-0">
                <Thumb image={img} onClick={() => onOpen(i)} focusable={copy === 0} />
              </li>
            ))}
          </ul>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function Thumb({ image, onClick, focusable }: { image: GalleryImage; onClick: () => void; focusable: boolean }) {
  return (
    <button
      type="button"
      tabIndex={focusable ? undefined : -1}
      onClick={onClick}
      aria-label={`View larger: ${image.alt}`}
      style={{ aspectRatio: image.ratio }}
      className={
        "group relative block h-[130px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden " +
        "rounded-tl-[32px] rounded-br-[32px] md:rounded-tl-[48px] md:rounded-br-[48px] lg:rounded-tl-[56px] lg:rounded-br-[56px] " +
        "bg-[#C8EAE8] cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EE7A52]/60"
      }
    >
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 700px, 60vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* hover overlay */}
      <span className="absolute inset-0 flex items-center justify-center bg-[#13999C]/0 transition-colors duration-300 group-hover:bg-[#13999C]/35">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-9 w-9 text-white opacity-0 scale-75 transition duration-300 group-hover:opacity-100 group-hover:scale-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5M10.5 8v5M8 10.5h5" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}
