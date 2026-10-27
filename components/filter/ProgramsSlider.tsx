"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "@/components/i18n/Link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { getPrograms, type Program } from "@/lib/programs";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";

export type { Program };

const PER_SLIDE = 4;

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

/* Swiper's own CSS variables — oval dots like the rest of the site */
const swiperVars = {
  "--swiper-pagination-color": "#139a9d",
  "--swiper-pagination-bullet-inactive-color": "#dcdcdc",
  "--swiper-pagination-bullet-inactive-opacity": "1",
  "--swiper-pagination-bullet-width": "25px",
  "--swiper-pagination-bullet-height": "15px",
  "--swiper-pagination-bullet-border-radius": "50%",
  "--swiper-pagination-bullet-horizontal-gap": "4px",
  "--swiper-pagination-bottom": "0px",
} as CSSProperties;

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={program.link}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(19,154,157,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#139a9d] focus-visible:ring-offset-2"
    >
      {/* Image + badge */}
      <div className="relative">
        <div className="relative aspect-[19/10] overflow-hidden">
          <Image
            src={program.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <span className="absolute -bottom-5 start-2.5 grid size-10 place-items-center rounded-full border-[3px] border-white bg-[#ef7b52] text-white shadow-md sm:size-11">
          {/* award / ribbon icon */}
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="9" r="5.5" />
            <circle cx="12" cy="9" r="2.6" />
            <path d="m8.5 13.3-1.6 7.2L12 18l5.1 2.5-1.6-7.2" />
          </svg>
        </span>
      </div>

      {/* Text */}
      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-7">
        <h3 className="text-[20px]! font-bold leading-[1.1]! text-neutral-900">{program.title}</h3>
        <span className="mt-1.5 block text-[12px]! font-bold leading-tight text-[#ef5a24]">{program.category}</span>
        <span className="mt-1.5 block pe-7 text-[15px]! leading-[1.25]! text-neutral-800">{program.description}</span>

        <Image
          src="/imgs/icons/title.svg"
          alt=""
          width={14}
          height={26}
          className="absolute bottom-3 end-3 h-[26px] w-auto"
        />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Slider                                                              */
/* ------------------------------------------------------------------ */
type ProgramsSliderProps = {
  /** Pass a filtered list (e.g. from the sidebar filters); defaults to all programs */
  items?: Program[];
};

export default function ProgramsSlider({ items: itemsProp }: ProgramsSliderProps) {
  const { locale, t } = useI18n();
  const items = useMemo(() => itemsProp ?? getPrograms(locale), [itemsProp, locale]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale);
    if (!q) return items;
    return items.filter((p) =>
      [p.title, p.category, p.description].some((field) => field.toLocaleLowerCase(locale).includes(q))
    );
  }, [items, query]);

  const pages = useMemo(() => chunk(filtered, PER_SLIDE), [filtered]);

  return (
    <div className="w-full">
      {/* Search */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex w-full items-stretch">
        <label htmlFor="program-search" className="sr-only">{t.programs.searchLabel}</label>
        <input
          id="program-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.programs.searchPlaceholder}
          className="h-[40px] md:h-[34px] min-w-0 flex-1 rounded-s-full border border-e-0 border-[#9fcfcf] bg-[#eaf4f4] px-3 text-[15px]! text-neutral-800 outline-none placeholder:text-neutral-700 focus:border-[#139a9d] focus:bg-white"
        />
        <button
          type="submit"
          aria-label={t.programs.search}
          className="grid w-[42px] md:w-[38px] shrink-0 place-items-center rounded-e-lg bg-[#139a9d] text-white transition hover:bg-[#0f8487]"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4.2-4.2" />
          </svg>
        </button>
      </form>

      <div className="h-7" />

      {pages.length === 0 ? (
        <div className="rounded-xl bg-[#eaf4f4] px-6 py-12 text-center text-[15px]! text-[#139a9d]" role="status">
          {fmt(t.programs.noResults, { query })}
        </div>
      ) : (
        <Swiper
          key={`${query}-${pages.length}`} // start again from slide 1 when the results change
          modules={[Pagination, Keyboard, A11y]}
          slidesPerView={1}
          spaceBetween={24}
          grabCursor
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true }}
          style={swiperVars}
          className="px-1! pb-12! pt-1!"
        >
          {pages.map((page, i) => (
            <SwiperSlide key={i} className="h-auto!">
              <ul className="grid grid-cols-1 gap-x-9 gap-y-5 min-[480px]:grid-cols-2">
                {page.map((program) => (
                  <li key={program.id}>
                    <ProgramCard program={program} />
                  </li>
                ))}
              </ul>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
