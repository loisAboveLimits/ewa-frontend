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
