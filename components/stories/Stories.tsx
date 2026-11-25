"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import Link from "@/components/i18n/Link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { paintPanorama, setPanoramaTransition } from "@/components/ui/panorama";

import "swiper/css";
import styles from "./Stories.module.css";
import { MAX_SLIDER_POSTS } from "@/lib/news";

/** One photo of the stories carousel (from Drupal — see DrupalStories — or the built-in list).
 *  With a title, hovering the photo (or focusing its link) shows the title, excerpt and a
 *  "Read More" link to the post — only that link opens the post, so the photo can be dragged. */
export type Story = { src: string; alt?: string; href?: string; title?: string; excerpt?: string };

/** Excerpt cut to about `max` characters at a word break. */
const shorten = (text: string, max = 120) =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(" ", max) > 60 ? text.lastIndexOf(" ", max) : max).replace(/[\s.,;:،]+$/, "");

/* Built-in photos — used when no `stories` are passed (Drupal down…) */
const builtIn: Story[] = [
  { src: "/imgs/slides/slide1.jpg" },
  { src: "/imgs/slides/slide2.jpg" },
  { src: "/imgs/slides/slide3.jpg" },
  { src: "/imgs/slides/slide4.jpg" },
];

export default function StoriesCarousel({ stories }: { stories?: Story[] }) {
  const { t } = useI18n();
  const list = (stories?.length ? stories : builtIn).slice(0, MAX_SLIDER_POSTS); // 5 at most
  // loop mode needs more slides than the 4 visible on large screens — repeat the list
  const slides = Array.from({ length: Math.max(2, Math.ceil(8 / list.length)) }, () => list).flat();

  // own pagination: one dot per real story (Swiper's would also count the repeated copies)
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const sync = (s: SwiperType) => setActive(s.realIndex % list.length);

  /* Go to story i the shortest way round (Swiper's slideToLoop doesn't work with this
     loop + centred + fractional-per-view setup); copies repeat every `list.length` slides. */
  const goTo = (i: number) => {
    if (!swiper) return;
    const n = list.length;
    let step = (i - (swiper.realIndex % n)) % n;
    if (step > n / 2) step -= n;
    if (step < -n / 2) step += n;
    let target = swiper.activeIndex + step;
    while (target < 0) target += n;
    while (target > swiper.slides.length - 1) target -= n;
    swiper.slideTo(target);
  };

  return (
    <div className={styles.panorama}>
      <Swiper
        modules={[Autoplay]}
        loop
        grabCursor
        speed={700}
        spaceBetween={12}
        slidesPerView={1.6}
        centeredSlides
        watchSlidesProgress
        breakpoints={{
          640: { slidesPerView: 2.4, centeredSlides: true },
          1024: { slidesPerView: 4, centeredSlides: false },
        }}
        onSwiper={setSwiper}
        onSlideChange={sync}
        // hide the hover panels while the strip is being dragged (no flicker as cards pass the cursor)
        onSliderMove={(s) => s.el.classList.add(styles.dragging)}
        onTouchEnd={(s) => s.el.classList.remove(styles.dragging)}
        onInit={(s) => { paintPanorama(s); sync(s); }}
        onResize={paintPanorama}
        onSetTranslate={paintPanorama}
        onSetTransition={setPanoramaTransition}
        className={styles.swiper}
      >
        {slides.map((story, i) => {
          const copy = i >= list.length; // repeated copy for the loop: hide from screen readers
          const img = (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={story.src} alt={copy ? "" : story.alt ?? ""} className={styles.img} draggable={false} />
          );
          // teal panel with title, excerpt and the Read More link — slides up on hover / keyboard focus
          const overlay = story.title ? (
            <div className={styles.overlay}>
              <p className={styles.overlayTitle}>{story.title}</p>
              <p className={styles.overlayText}>
                {story.excerpt && <span className={styles.excerpt}>{`${shorten(story.excerpt, 100)} ... `}</span>}
                {story.href && (
                  <Link href={story.href} tabIndex={copy ? -1 : undefined} className={styles.overlayMore}>
                    {t.common.readMore}
                    {!copy && <span className="sr-only">: {story.title}</span>}
                  </Link>
                )}
              </p>
            </div>
          ) : null;
          return (
            <SwiperSlide key={i} className={styles.slide} aria-hidden={copy || undefined}>
              <div className={styles.card}>
                {img}
                {overlay}
              </div>
            </SwiperSlide>
          );
        })}

        {/* Dots — same classes as Swiper's pagination, so the existing styles apply */}
        <div slot="container-end" className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
          {list.map((story, i) => (
            <button
              key={i}
              type="button"
              className={`swiper-pagination-bullet${i === active ? " swiper-pagination-bullet-active" : ""}`}
              aria-label={story.alt || `${i + 1} / ${list.length}`}
              aria-current={i === active || undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Curved top and bottom edges (inside the Swiper so the dots stay on top) */}
        <span slot="container-end" className={`${styles.arc} ${styles.arcTop}`} aria-hidden="true" />
        <span slot="container-end" className={`${styles.arc} ${styles.arcBottom}`} aria-hidden="true" />
      </Swiper>
    </div>
  );
}
