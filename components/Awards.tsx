"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/* Data — put the photos in /public/history/                          */
/* ------------------------------------------------------------------ */

type HistoryItem = {
  date: string;
  title: string;
  image: string;
  alt: string;
  body: ReactNode;
};

const ITEMS: HistoryItem[] = [
  {
    date: "May 2025",
    title: "ITEX Exhibition",
    image: "/imgs/awards/awards1.png",
    alt: "EWA team at the ITEX 2025 awards presentation ceremony",
    body: (
      <>
        <p>
          Towards Empowerment Horizons… We are proud of global achievements by
          Saudi minds. <strong>EWA won five medals at ITEX 2025</strong>, the
          Innovation and Inventions Expo in Kuala Lumpur, Malaysia.
        </p>
      </>
    ),
  },
  {
    date: "MM/ YYYY",
    title: "EWATHON",
    image: "/imgs/awards/awards2.png",
    alt: "EWATHON winners on stage",
    body: (
      <p>
        Workshops were held to encourage participants to innovate sustainable
        solutions. <strong>The top three projects were awarded and honored.</strong>
      </p>
    ),
  },
  {
    date: "MM/ YYYY",
    title: "SIIF",
    image: "/imgs/awards/awards3.png",
    alt: "EWA team holding the Saudi flag at SIIF 2025",
    body: (
      <>
        <p>
          <strong>
            EWA has secured six medals at SIIF2025, including gold, silver and
            bronze medals
          </strong>
        </p>
        <p className="mt-4">
          This achievement embodies our commitment to Vision2030 in supporting
          talents and empowering national capabilities
        </p>
      </>
    ),
  },
  {
    date: "MM/ YYYY",
    title: "Great Place to Work KSA",
    image: "/imgs/awards/awards4.png",
    alt: "EWA team at the Great Place to Work KSA ceremony",
    body: (
      <>
        <p>
          <strong>
            EWA was Ranked #9 in 2026 (and #25 in 2025) for Best Workplaces in
            Saudi Arabia (Small &amp; Medium).
          </strong>
        </p>
        <p className="mt-4">#3 in 2025</p>
        <p className="mt-4">
          #1 in 2024 for Saudi Nationals, and #1 in the Public Sector (2024).
        </p>
      </>
    ),
  },
];

/* Brand colours from the design */
const ACCENT = "text-[#3BB3A1]";

/* ------------------------------------------------------------------ */
/* Timing helpers                                                      */
/* ------------------------------------------------------------------ */

const N = ITEMS.length;
const SEG = 1 / (N - 1); // scroll progress per milestone

// Window of scroll progress during which item i wipes in (i >= 1).
// The rest of each segment is a "hold" so each milestone rests on screen.
const enterRange = (i: number): [number, number] => [
  (i - 0.85) * SEG,
  (i - 0.15) * SEG,
];

/* ------------------------------------------------------------------ */
/* Image layer — each one wipes up over the previous                  */
/* ------------------------------------------------------------------ */

function StackImage({
  item,
  index,
  progress,
}: {
  item: HistoryItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const first = index === 0;
  const [inStart, inEnd] = first ? [0, 0.0001] : enterRange(index);
  const hasNext = index < N - 1;
  const [outStart, outEnd] = hasNext ? enterRange(index + 1) : [1, 1];

  // Wipe in from the bottom
  const clipPath = useTransform(
    progress,
    [inStart, inEnd],
    first
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  // Zoom settles as it enters, then drifts up + dims as the next covers it
  const scale = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [first ? 1 : 1.25, 1, 1, 1.08],
  );
  const y = useTransform(progress, [outStart, outEnd], ["0%", "-12%"]);
  const brightness = useTransform(progress, [outStart, outEnd], [1, 0.45]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden will-change-[clip-path]"
      style={{ clipPath, zIndex: index }}
    >
      <motion.div className="absolute inset-0" style={{ scale, y, filter }}>
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={first}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Awards() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // An item becomes "active" once its wipe is half done
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let next = 0;
    for (let i = 1; i < N; i++) {
      const [s, e] = enterRange(i);
      if (v >= (s + e) / 2) next = i;
    }
    setActive((prev) => (prev === next ? prev : next));
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduce) return <StaticHistory />;

  const counter = `${String(active + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;

  return (
    <div
      ref={ref}
      id="history"
      className="relative bg-white"
      style={{ height: `${N * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-4 py-6 sm:px-8 lg:px-12 lg:py-12">
        {/* Top bar: counter + progress */}
        {/*<div className="mb-4 flex items-center gap-4 lg:mb-8">
          <span className={`font-mono text-xs tracking-widest sm:text-sm ${ACCENT}`}>
            {counter}
          </span>
          <div className="h-px flex-1 bg-neutral-200">
            <motion.div
              className="h-px origin-left bg-[#3BB3A1]"
              style={{ scaleX: barScale }}
            />
          </div>
        </div>*/}

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Titles */}
          <div className="order-1 lg:col-span-4">
            {/* date */}
            <div className="relative h-5 overflow-hidden sm:h-6">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={active}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`text-sm sm:text-base ${ACCENT}`}
                >
                  {ITEMS[active].date}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Title reel — active title sits in the middle row */}
            <div
              className="relative mt-1 h-[3.25rem] overflow-hidden sm:h-16 lg:mt-2 lg:h-72 lg:[mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
            >
              {ITEMS.map((item, i) => (
                <div
                  key={item.title}
                  className="absolute inset-x-0 top-0 lg:top-1/2 lg:-translate-y-1/2"
                >
                  <motion.h3
                    animate={{
                      y: `${(i - active) * 115}%`,
                      opacity: i === active ? 1 : 0.18,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight ${ACCENT}`}
                  >
                    {item.title}
                  </motion.h3>
                </div>
              ))}
            </div>
          </div>

          {/* Image stack */}
          <div className="order-2 lg:col-span-5">
            <div className="relative mx-auto aspect-[4/3] max-h-[42svh] w-full overflow-hidden rounded-2xl bg-neutral-100 lg:aspect-[4/5] lg:max-h-[72svh]">
              {ITEMS.map((item, i) => (
                <StackImage
                  key={item.title}
                  item={item}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="order-3 min-h-0 lg:col-span-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`text-sm leading-relaxed sm:text-base lg:text-justify ${ACCENT} [&_strong]:font-bold`}
              >
                {ITEMS[active].body}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reduced-motion fallback: plain stacked list                        */
/* ------------------------------------------------------------------ */

function StaticHistory() {
  return (
    <section id="history" aria-label="Our history" className="bg-white px-4 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {ITEMS.map((item) => (
          <article
            key={item.title}
            className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <p className={`text-sm ${ACCENT}`}>{item.date}</p>
              <h3 className={`text-3xl font-extrabold uppercase leading-none lg:text-5xl ${ACCENT}`}>
                {item.title}
              </h3>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-5 lg:aspect-[4/5]">
              <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className={`text-base leading-relaxed lg:col-span-3 ${ACCENT} [&_strong]:font-bold`}>
              {item.body}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
