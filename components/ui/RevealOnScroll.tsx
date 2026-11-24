"use client";

import { useEffect } from "react";
import { useLocalePathname } from "@/components/i18n/navigation";

/**
 * HOME PAGE ONLY (/ and /ar): boxes fade in while coming down from beneath the banner when they
 * scroll into view, one after another. Other pages are left as they are.
 * Works on HTML that comes from Drupal too, so the targets are CSS selectors:
 *
 *   home #about: green box → orange box → box with the background picture
 *   [data-reveal]  any element (in Drupal or in code) — add it to animate more boxes
 *
 * Direction: downwards, from beneath the banner (styles in app/custom.css, .reveal).
 * Boxes come one after another, 0.4 seconds apart (STAGGER), in the order of TARGETS.
 * Visitors with "reduce motion" see the boxes straight away. Styles: app/custom.css (.reveal).
 * Mounted once in app/[lang]/layout.tsx.
 */
const TARGETS = ["#about .box-green", "#about .box-orange", "#about .box-mixed", "[data-reveal]"];
/** Seconds between one box and the next (in ms). Boxes always come one after another in order,
 *  even when they scroll into view at the same moment. */
const STAGGER = 400;


/** Wait until the preloader has gone, so the animation is actually seen. */
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

export default function RevealOnScroll() {
  // path without the language prefix: "/" is the home page in English and Arabic
  const pathname = useLocalePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // in TARGETS order, so the green box always goes first
    const items: HTMLElement[] = [];
    for (const selector of TARGETS) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (!items.includes(el) && !el.classList.contains("reveal")) items.push(el);
      });
    }
    if (!items.length) return;
    items.forEach((el) => el.classList.add("reveal"));

    let io: IntersectionObserver | undefined;
    // when the previous box started (ms, performance.now) — the next one waits STAGGER after it
    let lastStart = -Infinity;
    whenPageShown(() => {
      io = new IntersectionObserver(
        (entries) => {
          entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target as HTMLElement)
            .sort((a, b) => items.indexOf(a) - items.indexOf(b))
            .forEach((el) => {
              io?.unobserve(el);
              const now = performance.now();
              const start = Math.max(now, lastStart + STAGGER);
              lastStart = start;
              el.style.setProperty("--reveal-delay", `${Math.round(start - now)}ms`);
              el.classList.add("is-revealed");
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      items.forEach((el) => io!.observe(el));
    });

    return () => {
      io?.disconnect();
      items.forEach((el) => el.classList.remove("reveal", "is-revealed"));
    };
  }, [pathname]);

  return null;
}
