"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import type { OrbitAction, OrbitMember } from "./OrbitShowcase";

import "swiper/css";
import "swiper/css/pagination";

/* Ring colours from the orbit, so each card keeps its member's colour */
const RING_COLOR = { outer: "#F05A28", inner: "#159A9C" } as const;

/* Swiper's own CSS variables — oval dots like the rest of the site */
const swiperVars = {
  "--swiper-pagination-color": "#139a9d",
  "--swiper-pagination-bullet-inactive-color": "#dcdcdc",
  "--swiper-pagination-bullet-inactive-opacity": "1",
  "--swiper-pagination-bullet-width": "22px",
  "--swiper-pagination-bullet-height": "13px",
  "--swiper-pagination-bullet-border-radius": "50%",
  "--swiper-pagination-bullet-horizontal-gap": "4px",
  "--swiper-pagination-bottom": "0px",
} as CSSProperties;

/**
 * Phone version of the testimonials orbit: one card per member, swipeable.
 * Uses the same `members` / `actions` data as <OrbitShowcase />.
 */
export default function TestimonialsSlider({
  members,
  actions = [],
  label,
}: {
  members: OrbitMember[];
  actions?: OrbitAction[];
  label?: string;
}) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay, Keyboard, A11y]}
        slidesPerView={1.15}
        centeredSlides
        spaceBetween={14}
        loop={members.length > 2}
        grabCursor
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        a11y={label ? { containerMessage: label } : undefined}
        breakpoints={{ 480: { slidesPerView: 1.5, spaceBetween: 18 } }}
        style={swiperVars}
        className="pb-10!"
      >
        {members.map((m) => {
          const color = RING_COLOR[m.ring];
          return (
            <SwiperSlide key={m.id} className="h-auto!">
              <figure
                className="flex h-full flex-col items-center rounded-[2rem] bg-[#f1f1f1] px-6 pb-7 pt-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                style={{ borderTop: `4px solid ${color}` }}
              >
                <span
                  className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white"
                  style={{ outline: `2px dashed ${color}`, outlineOffset: "3px" }}
                >
                  <Image src={m.image} alt={m.name} fill sizes="96px" className="object-cover" />
                </span>

                <figcaption className="mt-5">
                  <p className="text-[18px]! font-bold leading-tight" style={{ color: "#F05A28" }}>{m.name}</p>
                  {m.role && (
                    <p className="mt-1 text-[12px]! uppercase tracking-wide" style={{ color: "#F05A28" }}>{m.role}</p>
                  )}
                </figcaption>

                {m.description && (
                  <blockquote className="mt-4 text-[15px]! leading-relaxed text-neutral-700">
                    “{m.description}”
                  </blockquote>
                )}
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* the orbit's "+" actions become plain buttons under the slider */}
      {actions.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {actions.map((a) => {
            const color = RING_COLOR[a.ring];
            const cls =
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px]! font-bold text-white shadow-md transition hover:opacity-90";
            const content = (
              <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {a.label}
              </>
            );
            return a.href ? (
              <Link key={a.id} href={a.href} className={cls} style={{ background: color }}>
                {content}
              </Link>
            ) : (
              <button key={a.id} type="button" onClick={a.onClick} className={cls} style={{ background: color }}>
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
