"use client";

import { useEffect, useRef } from "react";

const FADE_MS = 250;

/**
 * Renders HTML from Drupal and brings back the behaviour plain HTML loses.
 * Tabs: any [role="tablist"] with [role="tab"] buttons (aria-controls → [role="tabpanel"])
 * switches panels on click / arrow keys, like components/rules/Tabs.tsx. The "selected" and
 * "not selected" looks are read from the markup itself (classes the selected tab has and the
 * others don't), so any tab design pasted into Drupal keeps working.
 */
export default function DrupalHtml({
  html,
  as: Tag = "div",
  id,
  className,
}: {
  html: string;
  as?: "div" | "section";
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups = Array.from(root.querySelectorAll<HTMLElement>('[role="tablist"]')).map(enableTabs);
    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return <Tag ref={ref as never} id={id} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ------------------------------------------------------------------ */

const classes = (el: Element | null | undefined) => new Set(el ? Array.from(el.classList) : []);
const minus = (a: Set<string>, b: Set<string>) => [...a].filter((c) => !b.has(c));

function enableTabs(list: HTMLElement): () => void {
  const tabs = Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]'));
  if (tabs.length < 2) return () => {};

  const panelOf = (tab: HTMLElement) => {
    const id = tab.getAttribute("aria-controls");
    return id ? (document.getElementById(id) as HTMLElement | null) : null;
  };

  // the looks of "selected" / "not selected", taken from the HTML as Drupal sent it
  const selected = tabs.find((t) => t.getAttribute("aria-selected") === "true") ?? tabs[0];
  const other = tabs.find((t) => t !== selected)!;
  const tabOn = minus(classes(selected), classes(other));
  const tabOff = minus(classes(other), classes(selected));
  const iconOn = minus(classes(selected.querySelector("img")), classes(other.querySelector("img")));
  const iconOff = minus(classes(other.querySelector("img")), classes(selected.querySelector("img")));

  // panel wrapper fades like the React tabs when it carries those classes
  const wrapper = panelOf(selected)?.parentElement ?? null;
  const canFade = !!wrapper?.classList.contains("opacity-100");

  let active = selected;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const paint = (tab: HTMLElement, on: boolean) => {
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
    tab.classList.remove(...(on ? tabOff : tabOn));
    tab.classList.add(...(on ? tabOn : tabOff));
    const icon = tab.querySelector("img");
    if (icon) {
      icon.classList.remove(...(on ? iconOff : iconOn));
      icon.classList.add(...(on ? iconOn : iconOff));
    }
  };

  const showPanel = (tab: HTMLElement) =>
    tabs.forEach((t) => {
      const p = panelOf(t);
      if (p) p.hidden = t !== tab;
    });

  const select = (tab: HTMLElement) => {
    if (tab === active) return;
    tabs.forEach((t) => paint(t, t === tab));
    active = tab;
    clearTimeout(timer);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canFade || reduce || !wrapper) return showPanel(tab);

    wrapper.classList.replace("opacity-100", "opacity-0");
    wrapper.classList.replace("translate-y-0", "translate-y-2");
    timer = setTimeout(() => {
      showPanel(tab);
      wrapper.classList.replace("opacity-0", "opacity-100");
      wrapper.classList.replace("translate-y-2", "translate-y-0");
    }, FADE_MS);
  };

  const onClick = (e: Event) => {
    const tab = (e.target as Element).closest<HTMLElement>('[role="tab"]');
    if (tab && tabs.includes(tab)) select(tab);
  };

  // arrows follow the reading direction, like the React tabs
  const onKey = (e: KeyboardEvent) => {
    const i = tabs.indexOf(e.target as HTMLElement);
    if (i < 0) return;
    const rtl = getComputedStyle(list).direction === "rtl";
    let next: number | null = null;
    if (e.key === (rtl ? "ArrowLeft" : "ArrowRight") || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    if (e.key === (rtl ? "ArrowRight" : "ArrowLeft") || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    select(tabs[next]);
    tabs[next].focus();
  };

  // start from a clean state: only the selected tab's panel visible
  tabs.forEach((t) => paint(t, t === selected));
  showPanel(selected);

  list.addEventListener("click", onClick);
  list.addEventListener("keydown", onKey);
  return () => {
    clearTimeout(timer);
    list.removeEventListener("click", onClick);
    list.removeEventListener("keydown", onKey);
  };
}
