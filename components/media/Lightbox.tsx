"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard } from "swiper/modules";
import type { GalleryImage } from "@/lib/gallery";
import { useI18n } from "@/components/i18n/I18nProvider";

import "swiper/css";

type Props = {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
};

export default function Lightbox({ images, startIndex, onClose }: Props) {
  const { t, dir } = useI18n();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [current, setCurrent] = useState(startIndex);
  const [shown, setShown] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // fade in, lock page scroll, Esc to close, restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setShown(true));
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const multiple = images.length > 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.media.imageViewer}
      dir={dir}
      className={
        "fixed inset-0 z-[100] flex flex-col bg-[#0B4F51]/90 backdrop-blur-sm transition-opacity duration-300 " +
        (shown ? "opacity-100" : "opacity-0")
      }
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* slides */}
      <div
        className={
          "relative flex-1 min-h-0 px-2 pt-4 pb-3 md:px-20 md:pt-8 md:pb-4 transition-transform duration-300 " +
          (shown ? "scale-100" : "scale-95")
        }
      >
        <Swiper
          modules={[Keyboard, A11y]}
          initialSlide={startIndex}
          onSwiper={setSwiper}
          onSlideChange={(s) => setCurrent(s.activeIndex)}
          keyboard={{ enabled: true }}
          spaceBetween={24}
          speed={450}
          className="h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={img.src + i}>
              <div className="relative h-full w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  priority={i === startIndex}
                  className="object-contain select-none"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {multiple && (
          <>
            <ModalNav dir="prev" label={t.common.previousImage} disabled={current === 0} onClick={() => swiper?.slidePrev()} />
            <ModalNav dir="next" label={t.common.nextImage} disabled={current === images.length - 1} onClick={() => swiper?.slideNext()} />
          </>
        )}
      </div>

      {/* bottom bar: caption, counter, close */}
      <div className="flex flex-col items-center gap-3 px-4 pb-5 md:gap-4 md:pb-8 text-white">
        <p className="max-w-3xl text-center text-sm md:text-base text-white/85">{images[current]?.alt}</p>
        <div className="flex items-center gap-4 md:gap-5">
          <span
            className="min-w-[64px] rounded-full bg-white/10 px-4 py-2 text-center text-sm md:text-base font-semibold tabular-nums ltr-text"
            aria-live="polite"
          >
            {current + 1} / {images.length}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.media.closeViewer}
            className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#EE7A52] shadow-md transition hover:bg-[#E5683D] hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/** "prev" sits on the start side (left in EN, right in AR); the chevron mirrors with it. */
function ModalNav({ dir, label, disabled, onClick }: { dir: "prev" | "next"; label: string; disabled: boolean; onClick: () => void }) {
  const prev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={
        "absolute top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full " +
        "bg-white/15 text-white transition hover:bg-[#EE7A52] disabled:opacity-0 disabled:pointer-events-none " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white " +
        (prev ? "start-3 md:start-6" : "end-3 md:end-6")
      }
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7 rtl-flip" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={prev ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
