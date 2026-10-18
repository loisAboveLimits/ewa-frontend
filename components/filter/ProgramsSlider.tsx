"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
export type Program = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
};

export const programs: Program[] = [
  {
    id: "ic-troubleshooting",
    title: "Instrument & Control Troubleshooting",
    category: "Technical Course – I&C Field",
    description: "Build practical skills in industrial instrumentation, control systems, PLCs, and troubleshooting.",
    image: "/imgs/bgs/campus-tech.png",
    link: "/why/programs/instrument-control-troubleshooting",
  },
  {
    id: "electrical-maintenance",
    title: "Electrical Maintenance Fundamentals",
    category: "Technical Course – Electrical Field",
    description: "Learn safe isolation, motor control circuits, testing equipment and preventive maintenance.",
    image: "/imgs/bgs/campus-simulation.png",
    link: "/why/programs/electrical-maintenance",
  },
  {
    id: "mechanical-pumps",
    title: "Pumps & Rotating Equipment",
    category: "Technical Course – Mechanical Field",
    description: "Understand pump operation, alignment, seals and vibration basics for rotating machinery.",
    image: "/imgs/bgs/campus-spaces.png",
    link: "/why/programs/pumps-rotating-equipment",
  },
  {
    id: "water-desalination",
    title: "Desalination Plant Operations",
    category: "Diploma Program – Water Field",
    description: "Operate reverse-osmosis and thermal desalination units, from intake to product water quality.",
    image: "/imgs/bgs/why-sec1.jpg",
    link: "/why/programs/desalination-plant-operations",
  },
  {
    id: "power-plant-ops",
    title: "Power Plant Operations",
    category: "Diploma Program – Energy Field",
    description: "Gain hands-on knowledge of boilers, turbines, generators and control-room procedures.",
    image: "/imgs/bgs/home-courses.jpg",
    link: "/why/programs/power-plant-operations",
  },
  {
    id: "hse-essentials",
    title: "Health, Safety & Environment Essentials",
    category: "Short Course – HSE",
    description: "Apply permit-to-work, risk assessment and incident reporting in industrial sites.",
    image: "/imgs/bgs/glance.jpg",
    link: "/why/programs/hse-essentials",
  },
  {
    id: "solar-pv",
    title: "Solar PV Installation & Maintenance",
    category: "Short Course – Renewable Energy",
    description: "Design, install and maintain grid-tied photovoltaic systems to international standards.",
    image: "/imgs/bgs/about-sec1.jpg",
    link: "/why/programs/solar-pv",
  },
  {
    id: "summer-stem",
    title: "Summer STEM Discovery",
    category: "Summer Course – High School",
    description: "Explore energy and water engineering through labs, site visits and team projects.",
    image: "/imgs/bgs/home-about-bg.jpg",
    link: "/why/programs/summer-stem",
  },
];

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

        <span className="absolute -bottom-5 left-2.5 grid size-10 place-items-center rounded-full border-[3px] border-white bg-[#ef7b52] text-white shadow-md sm:size-11">
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
        <span className="mt-1.5 block pr-7 text-[15px]! leading-[1.25]! text-neutral-800">{program.description}</span>

        <Image
          src="/imgs/icons/title.svg"
          alt=""
          width={14}
          height={26}
          className="absolute bottom-3 right-3 h-[26px] w-auto"
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

export default function ProgramsSlider({ items = programs }: ProgramsSliderProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) =>
      [p.title, p.category, p.description].some((field) => field.toLowerCase().includes(q))
    );
  }, [items, query]);

  const pages = useMemo(() => chunk(filtered, PER_SLIDE), [filtered]);

  return (
    <div className="w-full">
      {/* Search */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex w-full items-stretch">
        <label htmlFor="program-search" className="sr-only">Search for a program</label>
        <input
          id="program-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a program..."
          className="h-[34px] min-w-0 flex-1 rounded-l-full border border-r-0 border-[#9fcfcf] bg-[#eaf4f4] px-3 text-[15px]! text-neutral-800 outline-none placeholder:text-neutral-700 focus:border-[#139a9d] focus:bg-white"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid w-[38px] shrink-0 place-items-center rounded-r-lg bg-[#139a9d] text-white transition hover:bg-[#0f8487]"
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
          No programs match “{query}”.
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
