/*
 * Helpers for links to a spot inside tabbed content, e.g. /rules-regulations#traineeRequirements:
 * the tab holding that id is opened first, then the page scrolls to it below the fixed menu bar.
 * Used by components/drupal/DrupalHtml.tsx (tabs in Drupal content) and components/rules/Tabs.tsx.
 * Browser-only (call from effects / event handlers).
 */

/** The element the address bar's #hash points at, or null. */
export function hashTarget(): HTMLElement | null {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return id ? document.getElementById(id) : null;
}

/** Scrolls so the element sits just below the fixed menu bar. */
export function scrollToElement(el: HTMLElement) {
  const nav = document.getElementById("main-navigation");
  const elTop = el.getBoundingClientRect().top + window.scrollY;
  // past 200px the desktop bar shrinks (Header.tsx), so leave room for the small bar there
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const offset = desktop && elTop > 400 ? 100 : (nav ? nav.getBoundingClientRect().bottom : 0) + 16;
  window.scrollTo({ top: Math.max(0, elTop - offset) });
}

/**
 * Scrolls to the element and keeps it in place while the page is still settling: images,
 * sliders, fonts and the loading screen change the page height after the first paint, which
 * used to push the target far down (the page ended up at the footer). Re-aims whenever the
 * page size changes, for up to 4 seconds, and stops as soon as the visitor scrolls themselves.
 */
let stopSettling: (() => void) | null = null;
export function scrollToElementSettled(el: HTMLElement) {
  stopSettling?.();
  const aim = () => scrollToElement(el);
  aim();

  const observer = new ResizeObserver(() => aim());
  observer.observe(document.body);
  const loader = new MutationObserver(aim); // loading screen finished (html[data-loading] removed)
  loader.observe(document.documentElement, { attributes: true, attributeFilter: ["data-loading"] });

  const userEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const;
  const stop = () => {
    observer.disconnect();
    loader.disconnect();
    clearTimeout(timer);
    userEvents.forEach((type) => window.removeEventListener(type, stop));
    if (stopSettling === stop) stopSettling = null;
  };
  const timer = window.setTimeout(stop, 4000);
  userEvents.forEach((type) => window.addEventListener(type, stop, { passive: true }));
  stopSettling = stop;
}

/**
 * Calls `onHash` when the page opens with a #hash and whenever the hash changes — including
 * Next.js links on the same page, which change the address without a "hashchange" event.
 * Returns a cleanup function.
 */
export function watchHash(onHash: () => void): () => void {
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
    if (!a) return;
    const url = new URL(a.href, window.location.href);
    if (url.hash && url.pathname === window.location.pathname) setTimeout(onHash, 0);
  };
  // after the page has painted, so hidden tab panels exist
  const first = window.setTimeout(onHash, 0);
  window.addEventListener("hashchange", onHash);
  window.addEventListener("popstate", onHash);
  document.addEventListener("click", onClick);
  return () => {
    window.clearTimeout(first);
    window.removeEventListener("hashchange", onHash);
    window.removeEventListener("popstate", onHash);
    document.removeEventListener("click", onClick);
  };
}
