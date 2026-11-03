"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "./Lightbox";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { getGalleryRows, type GalleryImage } from "@/lib/gallery";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";

type Props = {
  /** every Media Center image (main images + gallery photos); built-in photos when missing */
  images?: GalleryImage[] | null;
  /** images added by each "View More" click (and shown first) */
  pageSize?: number;
  className?: string;
};

/**
 * Frame shapes (width / height) mixing landscape and portrait — each photo gets one "at random",
 * picked from its file name so the server and the browser choose the same shape (no hydration flicker)
 * and a photo keeps its shape after "View More".
 */
const SHAPES = [4 / 3, 3 / 4, 16 / 9, 2 / 3, 1, 3 / 2, 4 / 5, 16 / 10, 5 / 7];

function shapeOf(src: string) {
  let h = 2166136261; // FNV-1a hash of the image path
  for (let i = 0; i < src.length; i++) h = Math.imul(h ^ src.charCodeAt(i), 16777619);
  return SHAPES[(h >>> 0) % SHAPES.length];
}

/**
 * Put each photo in the column that is currently shortest (heights known from the shapes),
 * so the columns end about level. Earlier photos never move when more are added.
 */
function toColumns<T extends { ratio: number }>(items: T[], cols: number) {
  const columns: { item: T; i: number }[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  items.forEach((item, i) => {
    const c = heights.indexOf(Math.min(...heights));
    columns[c].push({ item, i });
    heights[c] += 1 / item.ratio;
  });
  return columns;
}

/** column count per screen size: 2 on phones, 3 on tablets, 4 from laptops up */
const LAYOUTS = [
  { cols: 2, className: "flex md:hidden" },
  { cols: 3, className: "hidden md:flex lg:hidden" },
  { cols: 4, className: "hidden lg:flex" },
];

/**
 * Masonry photo grid with the same lightbox as the /media-center gallery ticker.
 * Shows `pageSize` photos (20) and a "View More" button that adds the next set below.
 * Each photo gets a mixed landscape / portrait frame and goes into the shortest column,
 * so the ones already shown never move when more are added — the new set continues underneath.
 */
export default function MasonryGallery({ images: imagesProp, pageSize = 20, className = "" }: Props) {
  const { locale, t } = useI18n();
  const images = useMemo(
    () => (imagesProp?.length ? imagesProp : getGalleryRows(locale).flat()).map((img) => ({ ...img, ratio: shapeOf(img.src) })),
    [imagesProp, locale],
  );

  const [visible, setVisible] = useState(pageSize);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const shown = images.slice(0, visible);
  const hasMore = visible < images.length;

  // after "View More", move keyboard focus to the first new photo
  const focusFrom = useRef<number | null>(null);
  const thumbs = useRef(new Map<string, HTMLButtonElement>());
  useEffect(() => {
    if (focusFrom.current === null) return;
    const i = focusFrom.current;
    focusFrom.current = null;
    // the visible layout's button for that photo (the other layouts are display:none)
    const btn = [...thumbs.current.entries()]
      .filter(([key]) => key.endsWith(`-${i}`))
      .map(([, el]) => el)
      .find((el) => el.offsetParent !== null);
    btn?.focus({ preventScroll: true });
  }, [visible]);

  const viewMore = () => {
    focusFrom.current = visible;
    setVisible((v) => Math.min(v + pageSize, images.length));
  };

  return (
    <section aria-label={t.media.photoGallery} className={className}>
      {LAYOUTS.map(({ cols, className: layout }) => {
        const columns = toColumns(shown, cols);
        return (
          <div key={cols} className={`${layout} items-start gap-3 sm:gap-4 lg:gap-5`}>
            {columns.map((column, c) => (
              <ul key={c} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:gap-5">
                {column.map(({ item: img, i }) => (
                  <li key={img.src + i}>
                    <Thumb
                      image={img}
                      label={fmt(t.media.viewLarger, { alt: img.alt })}
                      onClick={() => setOpenIndex(i)}
                      buttonRef={(el) => {
                        const key = `${cols}-${i}`;
                        if (el) thumbs.current.set(key, el);
                        else thumbs.current.delete(key);
                      }}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        );
      })}

      {/* pagination: next set of photos underneath */}
      {hasMore && (
        <div className="mt-10 md:mt-14 flex justify-center">
          <button type="button" onClick={viewMore} className="btn btn-transparent font-bold remPad fnt-orange cursor-pointer">
            {t.common.viewMore}
            <ArrowIcon color="orange" />
          </button>
        </div>
      )}

      {/* same lightbox as the gallery ticker; browses every photo shown so far */}
      {openIndex !== null && <Lightbox images={shown} startIndex={openIndex} onClose={close} />}
    </section>
  );
}

function Thumb({
  image,
  label,
  onClick,
  buttonRef,
}: {
  image: GalleryImage;
  label: string;
  onClick: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={label}
      className={
        "group relative block w-full overflow-hidden bg-[#C8EAE8] cursor-zoom-in " +
        "rounded-ss-[28px] rounded-ee-[28px] md:rounded-ss-[40px] md:rounded-ee-[40px] lg:rounded-ss-[48px] lg:rounded-ee-[48px] " +
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EE7A52]/60"
      }
      style={{ aspectRatio: image.ratio }}
    >
      {/* photo cropped to its frame; plain img because Next refuses to optimize localhost images */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          // already cached → onLoad may have fired before hydration
          if (el?.complete && el.naturalWidth) setLoaded(true);
        }}
        className={
          "absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 " +
          (loaded ? "opacity-100" : "opacity-0")
        }
      />
      {/* hover overlay (same as the ticker) */}
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
