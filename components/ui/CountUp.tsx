"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Animates every number counter on the page: it counts up from 0 when it scrolls into view.
 * Works on numbers written in the code AND in Drupal content, so nothing has to be changed
 * per page. A counter is any element matching COUNTER_SELECTOR whose text contains a number:
 *
 *   class="counter"          (home "about" numbers: 20, 70, 25)
 *   data-counter             (add it to any element in Drupal or in the code)
 *   #glance h4               (Why EWA "in a glance" numbers: 84,000+, 60+, 120+)
 *
 * The text around the number stays ("84,000+", "%", "SAR 1.5M" …), commas and decimals are
 * kept, Arabic-Indic digits stay Arabic. Visitors with "reduce motion" see the final numbers.
 * Mounted once in app/[lang]/layout.tsx.
 */
const COUNTER_SELECTOR = ".counter, [data-counter], #glance h4";
const DURATION = 1800; // ms

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toLatin = (s: string) => s.replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));
const toArabic = (s: string) => s.replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);

type Counter = { node: Text; before: string; after: string; target: number; decimals: number; grouped: boolean; arabic: boolean; final: string };

function parse(el: Element): Counter | null {
  // first text node that has a number in it (the number may sit inside a <span>)
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const raw = node.data;
    const arabic = /[٠-٩]/.test(raw);
    const text = toLatin(raw);
    const match = text.match(/\d[\d,]*(?:\.\d+)?/);
    if (!match || match.index === undefined) continue;
    const num = match[0];
    const target = parseFloat(num.replace(/,/g, ""));
    if (!Number.isFinite(target)) return null;
    return {
      node,
      before: raw.slice(0, match.index),
      after: raw.slice(match.index + num.length),
      target,
      decimals: num.includes(".") ? num.split(".")[1].length : 0,
      grouped: num.includes(","),
      arabic,
      final: raw,
    };
  }
  return null;
}

function format(c: Counter, value: number): string {
  let s = value.toFixed(c.decimals);
  if (c.grouped) {
    const [int, dec] = s.split(".");
    s = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (dec ? `.${dec}` : "");
  }
  return c.before + (c.arabic ? toArabic(s) : s) + c.after;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

function run(c: Counter) {
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    c.node.data = t < 1 ? format(c, c.target * easeOutCubic(t)) : c.final;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** Wait until the preloader has gone, so the counting is actually seen. */
function whenPageShown(cb: () => void) {
  const html = document.documentElement;
  if (!html.hasAttribute("data-loading")) return cb();
  const mo = new MutationObserver(() => {
    if (!html.hasAttribute("data-loading")) {
      mo.disconnect();
      cb();
    }
  });
  mo.observe(html, { attributes: true, attributeFilter: ["data-loading"] });
}

export default function CountUp() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const counters = new Map<Element, Counter>();
    document.querySelectorAll(COUNTER_SELECTOR).forEach((el) => {
      if ((el as HTMLElement).dataset.counted) return;
      const c = parse(el);
      if (!c || c.target === 0) return;
      const box = el as HTMLElement;
      box.dataset.counted = "1";
      // keep the width of the final number so nothing jumps while counting
      box.style.fontVariantNumeric = "tabular-nums";
      box.style.minWidth = `${box.getBoundingClientRect().width}px`;
      c.node.data = format(c, 0);
      counters.set(el, c);
    });
    if (!counters.size) return;

    let io: IntersectionObserver | undefined;
    whenPageShown(() => {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io?.unobserve(entry.target);
            const c = counters.get(entry.target);
            if (c) run(c);
          }
        },
        { threshold: 0.4 }
      );
      counters.forEach((_, el) => io!.observe(el));
    });

    return () => {
      io?.disconnect();
      // leaving the page: show the real numbers again
      counters.forEach((c, el) => {
        c.node.data = c.final;
        delete (el as HTMLElement).dataset.counted;
      });
    };
  }, [pathname]);

  return null;
}
