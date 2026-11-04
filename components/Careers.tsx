"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

import ArrowLink from "@/components/ui/ArrowLink";
import { useI18n } from "@/components/i18n/I18nProvider";
import { builtInCareers, type CareerJob } from "@/lib/careerJobs";

import "swiper/css";
import "swiper/css/pagination";

/**
 * Careers carousel (Join page, #careers). With `jobs` (Drupal content type "careers" — see
 * DrupalCareers) each card shows the date, job title, location and an Apply link to the
 * career's inner page (/career/[slug]).
 */
export default function CareersCarousel({ jobs }: { jobs?: CareerJob[] }) {
  const { t } = useI18n();

  // Drupal careers, else the built-in jobs (dictionary join.careers) — each links to /career/{slug}
  const cards: CareerJob[] = jobs?.length ? jobs : builtInCareers(t);

  // up to 3 cards show at once — the loop needs plenty of slides, so repeat short lists
  const n = cards.length;
  const slides = n >= 8 ? cards : Array.from({ length: Math.ceil(8 / Math.max(n, 1)) }, () => cards).flat();

  // own pagination: one dot per real job (Swiper's would also count the repeated copies)
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const sync = (s: SwiperType) => setActive(s.realIndex % n);

  /* go to job i the shortest way round; copies repeat every `n` slides */
  const goTo = (i: number) => {
    if (!swiper) return;
    let step = (i - (swiper.realIndex % n)) % n;
    if (step > n / 2) step -= n;
    if (step < -n / 2) step += n;
    let target = swiper.activeIndex + step;
    while (target < 0) target += n;
    while (target > swiper.slides.length - 1) target -= n;
    swiper.slideTo(target);
  };

  return (
    <section className="w-full py-6 md:py-12">

      <div className="relative">

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={0}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={setSwiper}
          onSlideChange={sync}
          onInit={sync}
          className="tripleSwiper centeredSwiper noNav"
        >

          {slides.map((job, i) => {
            const copy = i >= n; // repeated copy for the loop: hide from screen readers
            return (
              <SwiperSlide key={`${job.id}-${i}`} aria-hidden={copy || undefined}>

                <article className="box relative overflow-hidden aspect-[67/33] bg-[#13999C]">

                  {job.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={job.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  )}

                  <div className="overlayed"></div>

                  <div className="absolute bottom-0 start-0 w-full p-6">

                    {job.date && (
                      <p className="font-light text-[12px]! sm:text-[10px]!">
                        <i className="fa-regular fa-calendar-days mar-right-5" aria-hidden></i>{" "}
                        {job.dateTime ? <time dateTime={job.dateTime}>{job.date}</time> : job.date}
                      </p>
                    )}
                    <h3 className="text-white text-[18px]! sm:text-[16px]! font-bold line-clamp-1">
                      {job.title}
                    </h3>
                    <div className="spacer-5"></div>

                    <div className="flex items-center justify-between gap-3">
                      {job.location ? (
                        <p className="text-[12px]! sm:text-[11px]! box box-green text-center py-1 px-4 truncate min-w-0">{job.location}</p>
                      ) : (
                        <span />
                      )}

                      <ArrowLink href={job.href} color="orange" iconSize={26} className="text-[14px]! shrink-0">
                        {t.common.apply}
                      </ArrowLink>
                    </div>

                  </div>

                </article>

              </SwiperSlide>
            );
          })}

          {/* dots — same classes as Swiper's pagination, so the existing styles apply */}
          {n > 1 && (
            <div slot="container-end" className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
              {cards.map((job, i) => (
                <button
                  key={job.id}
                  type="button"
                  className={`swiper-pagination-bullet${i === active ? " swiper-pagination-bullet-active" : ""}`}
                  aria-label={job.title || `${i + 1} / ${n}`}
                  aria-current={i === active || undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}

        </Swiper>

      </div>

    </section>
  );
}
