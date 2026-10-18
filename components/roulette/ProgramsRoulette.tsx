"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import styles from "./ProgramsRoulette.module.css";

/* ------------------------------------------------------------------ */
/* Data — swap the images for the real ones when you have them.        */
/* `tint` adds the teal overlay; leave it off for images that are      */
/* already teal-graded (like home-courses.jpg).                        */
/* ------------------------------------------------------------------ */
export const programs = [
  { title: "Short Courses", image: "/imgs/bgs/campus-tech.png", tint: true },
  { title: "Diploma Programs", image: "/imgs/bgs/home-courses.jpg", tint: false },
  { title: "Summer Courses", image: "/imgs/bgs/campus-spaces.png", tint: true },
];

/* Loop mode needs more slides than are visible, so the list is repeated. */
const REPEAT = 3;
const wheel = Array.from({ length: REPEAT }, () => programs).flat();

const START = 1; // Diploma Programs starts in the middle, as in the design

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

export default function ProgramsRoulette() {
  const [active, setActive] = useState(START);

  const onChange = useCallback((swiper: SwiperType) => {
    setActive(swiper.realIndex % programs.length);
  }, []);

  return (
    <div className={`box ${styles.box}`}>

      {/* Background layers — the active one fades in */}
      <div className={styles.bgStack} aria-hidden="true">
        {programs.map((p, i) => (
          <div
            key={p.title}
            className={`${styles.bg} ${i === active ? styles.bgActive : ""}`}
          >
            <Image
              src={p.image}
              alt=""
              fill
              sizes="(max-width: 1400px) 100vw, 1200px"
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
            <h2 className="font-bold title text-white">EWA<br />Programs</h2>
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
                initialSlide={START}
                speed={700}
                slideToClickedSlide
                grabCursor
                watchSlidesProgress
                keyboard={{ enabled: true, onlyInViewport: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                a11y={{ containerMessage: "EWA programs", slideRole: "option" }}
                onInit={(s) => { paintDrum(s); onChange(s); }}
                onProgress={paintDrum}
                onSetTranslate={paintDrum}
                onSetTransition={setDrumTransition}
                onSlideChange={onChange}
                className={styles.swiper}
              >
                {wheel.map((p, i) => (
                  <SwiperSlide key={`${p.title}-${i}`} className={styles.slide}>
                    <span className={styles.label}>{p.title}</span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Announce the active program to screen readers */}
            <p className="sr-only" aria-live="polite">{programs[active].title}</p>
          </div>

          <div className="hidden md:block md:w-1/4 gap-6 p-8"></div>

        </div>

        <div className="spacer-40"></div>
      </div>
    </div>
  );
}
