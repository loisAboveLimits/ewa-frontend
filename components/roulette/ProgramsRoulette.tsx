"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import styles from "./ProgramsRoulette.module.css";
import Link from "@/components/i18n/Link";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Localized } from "@/lib/i18n/config";

/** One row of the drum. Comes from Drupal (see DrupalProgramsRoulette) or the built-in list below. */
export type RouletteProgram = {
  id: string;
  title: string;
  image: string;
  /** teal overlay — leave off for images that are already teal-graded */
  tint?: boolean;
  /** where the centred program links to (optional) */
  href?: string;
};

/* ------------------------------------------------------------------ */
/* Built-in data — used when no `programs` are passed (Drupal down…).  */
/* `tint` adds the teal overlay; leave it off for images that are      */
/* already teal-graded (like home-courses.jpg).                        */
/* ------------------------------------------------------------------ */
export const programs = [
  { id: "short", image: "/imgs/bgs/campus-tech.png", tint: true },
  { id: "diploma", image: "/imgs/bgs/home-courses.jpg", tint: false },
  { id: "summer", image: "/imgs/bgs/campus-spaces.png", tint: true },
];

const titles: Localized<Record<string, string>> = {
  en: { short: "Short Courses", diploma: "Diploma Programs", summer: "Summer Courses" },
  ar: { short: "الدورات القصيرة", diploma: "برامج الدبلوم", summer: "الدورات الصيفية" },
};

const START = 1; // the 2nd program starts in the middle, as in the design

/* How far each row tilts / shrinks / fades per step away from the centre */
const TILT = 32; // deg
const SHRINK = 0.28;
const FADE = 0.45;

function paintDrum(swiper: SwiperType) {
  swiper.slides.forEach((slide) => {
    const p = Math.max(-2, Math.min(2, (slide as HTMLElement & { progress: number }).progress));
    const label = slide.firstElementChild as HTMLElement | null;
    if (!label) return;
    label.style.transform = `rotateX(${p * -TILT}deg) scale(${1 - Math.abs(p) * SHRINK})`;
    label.style.opacity = String(Math.max(0, 1 - Math.abs(p) * FADE));
  });
}

function setDrumTransition(swiper: SwiperType, duration: number) {
  swiper.slides.forEach((slide) => {
    const label = slide.firstElementChild as HTMLElement | null;
    if (label) label.style.transitionDuration = `${duration}ms`;
  });
}

export default function ProgramsRoulette({ programs: items }: { programs?: RouletteProgram[] }) {
  const { locale, t } = useI18n();

  const list: RouletteProgram[] = items?.length
    ? items
    : programs.map((p) => ({ ...p, title: titles[locale][p.id] }));

  /* Loop mode needs more slides than are visible, so the list is repeated. */
  const repeat = Math.max(3, Math.ceil(9 / list.length));
  const wheel = Array.from({ length: repeat }, () => list).flat();
  const start = Math.min(START, list.length - 1);

  const [active, setActive] = useState(start);

  const onChange = useCallback((swiper: SwiperType) => {
    setActive(swiper.realIndex % list.length);
  }, [list.length]);

  return (
    <div className={`box ${styles.box}`}>

      {/* Background layers — the active one fades in */}
      <div className={styles.bgStack} aria-hidden="true">
        {list.map((p, i) => (
          <div
            key={p.id}
            className={`${styles.bg} ${i === active ? styles.bgActive : ""}`}
          >
            <Image
              src={p.image}
              alt=""
              fill
              sizes="(max-width: 1400px) 100vw, 1200px"
              // Drupal files are used as they are (no Next.js optimizer / remotePatterns needed)
              unoptimized={/^https?:\/\//.test(p.image)}
              className="object-cover"
            />
            {p.tint && <div className={styles.tint} />}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="spacer-40"></div>

        <div className="flex flex-col h-full md:flex-row">

          <div className="md:w-1/4 gap-6 px-6 pt-2 pb-0 md:p-8 mt-auto">
            <h2 className="font-bold title text-white">{t.programs.rouletteA}<br />{t.programs.rouletteB}</h2>
          </div>

          <div className="md:w-1/2 gap-6 p-6 md:p-8">
            <div id="course-lists" className={styles.roulette}>

              {/* Selection window lines */}
              <span className={`${styles.line} ${styles.lineTop}`} aria-hidden="true" />
              <span className={`${styles.line} ${styles.lineBottom}`} aria-hidden="true" />

              <Swiper
                modules={[Autoplay, Keyboard, A11y]}
                direction="vertical"
                slidesPerView={3}
                centeredSlides
                loop
                initialSlide={start}
                speed={700}
                slideToClickedSlide
                grabCursor
                watchSlidesProgress
                keyboard={{ enabled: true, onlyInViewport: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                a11y={{ containerMessage: t.programs.rouletteAria, slideRole: "option" }}
                onInit={(s) => { paintDrum(s); onChange(s); }}
                onProgress={paintDrum}
                onSetTranslate={paintDrum}
                onSetTransition={setDrumTransition}
                onSlideChange={onChange}
                className={styles.swiper}
              >
                {wheel.map((p, i) => (
                  <SwiperSlide key={`${p.id}-${i}`} className={styles.slide}>
                    {p.href ? (
                      <Link
                        href={p.href}
                        className={styles.label}
                        // a click on a side row only spins it to the centre; the centred one opens the link
                        onClick={(e) => { if (i % list.length !== active) e.preventDefault(); }}
                      >
                        {p.title}
                      </Link>
                    ) : (
                      <span className={styles.label}>{p.title}</span>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Announce the active program to screen readers */}
            <p className="sr-only" aria-live="polite">{list[active]?.title}</p>
          </div>

          <div className="hidden md:block md:w-1/4 gap-6 p-8"></div>

        </div>

        <div className="spacer-40"></div>
      </div>
    </div>
  );
}
