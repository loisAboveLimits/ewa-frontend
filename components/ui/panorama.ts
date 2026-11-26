import type { Swiper as SwiperType } from "swiper";

/* Panorama strength: how much the side slides turn toward you and grow */
const ANGLE = 22; // deg at the edge of the view
const GROW_Y = 0.2; // +20% taller at the edge of the view
const GROW_X = 0.04; // keep widths nearly the same so the gaps stay visible

type PanoSlide = HTMLElement & { swiperSlideOffset: number };

/**
 * Tilt each slide toward the viewer depending on where it sits on screen.
 * Works in LTR and RTL: in RTL Swiper measures offsets from the right edge and
 * stores a positive translate, so both are mirrored back to screen coordinates.
 */
export function paintPanorama(swiper: SwiperType) {
  const half = swiper.width / 2;
  const sign = swiper.rtlTranslate ? -1 : 1;
  swiper.slides.forEach((el) => {
    const slide = el as PanoSlide;
    // distance of the slide centre from the start edge of the view
    const center = slide.swiperSlideOffset + sign * swiper.translate + slide.offsetWidth / 2;
    // -1 = left edge of the screen, 0 = middle, 1 = right edge
    const d = sign * Math.max(-1.4, Math.min(1.4, (center - half) / half));
    const inner = slide.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const a = Math.abs(d);
    inner.style.transform = `rotateY(${d * -ANGLE}deg) scale(${1 + a * GROW_X}, ${1 + a * GROW_Y})`;
  });
}

export function setPanoramaTransition(swiper: SwiperType, duration: number) {
  swiper.slides.forEach((el) => {
    const inner = el.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transitionDuration = `${duration}ms`;
  });
}

/* ---------- flat version: the photos stay undistorted, only the frames get the curve ---------- */

/** How much shorter a frame edge is at the middle of the view than at its sides (each of top
 *  and bottom, in % of the frame height). */
const CURVE = 9;

/**
 * Panorama look without tilting or stretching the photos: every card stays flat and full size,
 * and a clip-path trims its top and bottom edges along one curve across the whole view —
 * shortest in the middle, full height at the screen edges (like a curved cinema screen).
 * The photo inside just gets cropped, never stretched. Works in LTR and RTL.
 */
export function paintPanoramaFlat(swiper: SwiperType) {
  const half = swiper.width / 2;
  if (!half) return;
  const sign = swiper.rtlTranslate ? -1 : 1;
  // inset (%) of the frame edge at screen position x (-1 left … 0 middle … 1 right)
  const inset = (x: number) => CURVE * Math.cos((Math.min(1, Math.abs(x)) * Math.PI) / 2);
  swiper.slides.forEach((el) => {
    const slide = el as PanoSlide;
    const inner = slide.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const center = slide.swiperSlideOffset + sign * swiper.translate + slide.offsetWidth / 2;
    const mid = (sign * (center - half)) / half; // screen position of the card centre
    const w = slide.offsetWidth / half;
    const l = inset(mid - w / 2).toFixed(2);
    const m = inset(mid).toFixed(2);
    const r = inset(mid + w / 2).toFixed(2);
    // left edge, middle and right edge follow the same curve
    inner.style.transform = "";
    inner.style.clipPath =
      `polygon(0% ${l}%, 50% ${m}%, 100% ${r}%, 100% calc(100% - ${r}%), 50% calc(100% - ${m}%), 0% calc(100% - ${l}%))`;
  });
}
