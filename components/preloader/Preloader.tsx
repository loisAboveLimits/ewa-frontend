"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Preloader.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";

/** Logo with the orbit-style spinning rings. Reused by the route loader (app/loading.tsx). */
export function LoaderMark({ size = 150 }: { size?: number }) {
  return (
    <div className={styles.mark} style={{ width: size, height: size }}>
      <span className={`${styles.ring} ${styles.ringOuter}`} />
      <span className={`${styles.ring} ${styles.ringInner}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/imgs/logos/logo-circle-white.svg" alt="" className={styles.logo} />
    </div>
  );
}

const MIN_VISIBLE = 600; // ms — avoid a flash on fast connections
const MAX_VISIBLE = 8000; // ms — never block the page longer than this
const ASSET_TIMEOUT = 4000; // ms — stop waiting for slow images after a page change
const FADE = 500; // ms — keep in sync with the CSS transition

type Phase = "visible" | "leaving" | "gone";

/** Resolve when the new page's above-the-fold images (incl. banner backgrounds) are ready. */
function waitForPageAssets(timeout: number) {
  const vh = window.innerHeight;

  const imgs = Array.from(document.images).filter((img) => {
    if (img.complete) return false;
    // lazy images below the fold never load on their own — don't wait for them
    return img.loading !== "lazy" || img.getBoundingClientRect().top < vh;
  });

  const bgUrls = Array.from(document.querySelectorAll<HTMLElement>(".banner, [data-preload-bg]"))
    .flatMap((el) => Array.from(getComputedStyle(el).backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)))
    .map((m) => m[1]);

  const jobs: Promise<unknown>[] = [
    ...imgs.map(
      (img) =>
        new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        })
    ),
    ...bgUrls.map(
      (src) =>
        new Promise((resolve) => {
          const probe = new Image();
          probe.onload = probe.onerror = resolve;
          probe.src = src;
        })
    ),
  ];

  return Promise.race([Promise.all(jobs), new Promise((r) => setTimeout(r, timeout))]);
}

/**
 * Full-screen loader.
 * - First visit: rendered on the server so it covers the page immediately, then fades
 *   out after the browser's `load` event.
 * - Page changes: appears as soon as an internal link (or back/forward) is used, and
 *   fades out once the new page and its visible images are ready.
 */
export default function Preloader() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("visible");
  const [navigating, setNavigating] = useState(false); // fade in quickly for page changes

  const shownAt = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastPath = useRef(pathname);
  const firstRender = useRef(true);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const hide = useCallback(() => {
    clearTimers();
    const wait = Math.max(0, MIN_VISIBLE - (performance.now() - shownAt.current));
    timers.current.push(
      setTimeout(() => {
        // never bring back a loader that has already closed
        setPhase((p) => (p === "gone" ? p : "leaving"));
        timers.current.push(setTimeout(() => setPhase("gone"), FADE));
      }, wait)
    );
  }, []);

  const show = useCallback(() => {
    clearTimers();
    shownAt.current = performance.now();
    setNavigating(true);
    setPhase("visible");
    timers.current.push(setTimeout(hide, MAX_VISIBLE)); // safety net
  }, [hide]);

  // 1) First page load
  useEffect(() => {
    shownAt.current = performance.now();
    const onLoad = () => hide();
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const safety = setTimeout(onLoad, MAX_VISIBLE);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(safety);
      clearTimers();
    };
  }, [hide]);

  // 2) Show as soon as a page change starts
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return; // external link
      if (url.pathname === window.location.pathname) return; // same page / #anchor / href=""
      show();
    };

    const onPopState = () => {
      if (window.location.pathname !== lastPath.current) show(); // back / forward
    };

    document.addEventListener("click", onClick, true); // capture: runs before next/link
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [show]);

  // 3) Hide once the new page has rendered and its visible images are ready
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    let cancelled = false;
    // wait two frames so the new page is in the DOM, then for its images
    requestAnimationFrame(() =>
      requestAnimationFrame(async () => {
        await waitForPageAssets(ASSET_TIMEOUT);
        if (!cancelled) hide();
      })
    );
    return () => {
      cancelled = true;
    };
  }, [pathname, hide]);

  // Stop the page scrolling underneath while the loader is up
  useEffect(() => {
    if (phase === "gone") return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={[
        "ewa-preloader",
        styles.overlay,
        navigating ? styles.entering : "",
        phase === "leaving" ? styles.leaving : "",
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-busy={phase === "visible"}
    >
      <LoaderMark />
      <span className="sr-only">{t.common.loading}</span>

      {/* Visitors with JavaScript off should never get stuck behind the loader */}
      <noscript>
        <style>{`.ewa-preloader{display:none!important}`}</style>
      </noscript>
    </div>
  );
}
