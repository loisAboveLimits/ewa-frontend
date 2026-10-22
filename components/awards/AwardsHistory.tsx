"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { getAwards, type Award } from "@/lib/awards";
import { useI18n } from "@/components/i18n/I18nProvider";

/* Image column geometry (in vh so it scales with the screen) */
const IMG_H = 46; // height of one photo
const GAP = 7; // space between photos
const STEP = IMG_H + GAP;

const ease = [0.22, 1, 0.36, 1] as const;

export default function AwardsHistory() {
  const { locale, t } = useI18n();
  const awards = useMemo(() => getAwards(locale), [locale]);
  return (
    <>
      <PinnedHistory awards={awards} label={t.awards.historyAria} skipLabel={t.awards.skip} />
      <StackedHistory awards={awards} label={t.awards.historyAria} />
    </>
  );
}

/* ---------------- Desktop / tablet: pinned scroll section ---------------- */

function PinnedHistory({ awards, label, skipLabel }: { awards: Award[]; label: string; skipLabel: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const last = awards.length - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing gives the soft, weighted glide from the reference
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 });
  const position = useTransform(progress, (v) => v * last); // 0 … last
  const columnY = useTransform(position, (p) => `${-p * STEP}vh`);

  useMotionValueEvent(position, "change", (p) => {
    const i = Math.min(last, Math.max(0, Math.round(p)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const skip = () => {
    const el = sectionRef.current;
    if (!el) return;
    const end = el.getBoundingClientRect().bottom + window.scrollY - window.innerHeight + 2;
    window.scrollTo({ top: end, behavior: "smooth" });
  };

  const item = awards[active];

  return (
    <div
      ref={sectionRef}
      className="relative hidden bg-white md:block"
      style={{ height: `${awards.length * 100}vh` }}
      aria-label={label}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid h-full max-w-7xl grid-cols-[1fr_minmax(0,60vh)_1fr] items-center gap-10 px-8 lg:gap-10">
          {/* Left: date + title */}
          <div className="relative h-40 w-full text-start">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0 flex flex-col items-start justify-center text-start"
              >
                <Reveal delay={0}>
                  <span className="block text-sm font-medium fnt-orange lg:text-base">
                    {item.date}
                  </span>
                </Reveal>
                <Reveal delay={0.06}>
                  <h3 className="max-w-[16ch] font-extrabold uppercase leading-[1.05] fnt-green lg:text-4xl">
                    {item.title}
                  </h3>
                </Reveal>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centre: moving image column */}
          <div className="relative h-full">
            <motion.div
              className="absolute inset-x-0 will-change-transform box overflow-hidden"
              style={{ y: columnY, top: `calc(50% - ${IMG_H / 2}vh)` }}
            >
              {awards.map((a, i) => (
                <ColumnImage key={a.id} award={a} index={i} position={position} />
              ))}
            </motion.div>
          </div>

          {/* Right: body text */}
          <div className="relative h-72 max-w-xs">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0 flex text-sm leading-relaxed text-neutral-500 [&_b]:font-semibold [&_b]:text-neutral-700 fnt-green"
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.12, ease } }}
                exit={{ opacity: 0, y: -24, filter: "blur(6px)", transition: { duration: 0.4, ease } }}
              >
                <div>{item.body}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Skip button, centred under the photo */}
        <button
          type="button"
          onClick={skip}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-sm bg-[#139a9d] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0f7f82] hidden"
        >
          {skipLabel} <span aria-hidden className="rtl-flip">»</span>
        </button>

        {/* Counter */}
        <div className="absolute bottom-8 end-8 flex items-center gap-2 text-sm font-bold text-[#139a9d] lg:end-12 hidden">
          <span aria-hidden className="grid grid-cols-2 gap-[2px]">
            <i className="h-1.5 w-1.5 bg-[#f0763b]" />
            <i className="h-1.5 w-1.5" />
            <i className="h-1.5 w-1.5" />
            <i className="h-1.5 w-1.5 bg-[#139a9d]" />
          </span>
          <span className="relative inline-block h-5 w-4 overflow-hidden text-end">
            <AnimatePresence initial={false}>
              <motion.span
                key={active}
                className="absolute inset-0"
                initial={{ y: "100%" }}
                animate={{ y: 0, transition: { duration: 0.5, ease } }}
                exit={{ y: "-100%", transition: { duration: 0.5, ease } }}
              >
                {active + 1}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>/{awards.length}</span>
        </div>
      </div>
    </div>
  );
}

/** One photo in the column: full colour when centred, dimmed greyscale as it moves away. */
function ColumnImage({
  award,
  index,
  position,
}: {
  award: Award;
  index: number;
  position: MotionValue<number>;
}) {
  const distance = useTransform(position, (p) => Math.min(1, Math.abs(p - index)));
  const filter = useTransform(distance, (d) => `grayscale(${d}) brightness(${1 + d * 0.08})`);
  const opacity = useTransform(distance, [0, 1], [1, 0.3]);
  const scale = useTransform(distance, [0, 1], [1, 0.92]);

  return (
    <motion.figure
      className="overflow-hidden"
      style={{ height: `${IMG_H}vh`, marginBottom: `${GAP}vh`, filter, opacity, scale }}
    >
      <img
        src={award.image}
        alt={award.title}
        draggable={false}
        className="h-full w-full object-cover box"
      />
    </motion.figure>
  );
}

/** Masked slide-up: the line rises into view and leaves upward through the same mask. */
function Reveal({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0, transition: { duration: 0.75, delay, ease } }}
        exit={{ y: "-110%", transition: { duration: 0.45, ease } }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------------- Mobile: stacked list with scroll-in reveals ---------------- */

function StackedHistory({ awards, label }: { awards: Award[]; label: string }) {
  return (
    <div className="space-y-14 bg-white px-1 py-12 md:hidden" aria-label={label}>
      {awards.map((a) => (
        <motion.article
          key={a.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-sm font-medium fnt-orange">{a.date}</span>
          <h3 className="text-2xl font-extrabold uppercase leading-tight fnt-green">
            {a.title}
          </h3>
          <img src={a.image} alt={a.title} className="mb-4 aspect-[3/4] w-full object-cover box" />
          <div className="fnt-green">
            {a.body}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
