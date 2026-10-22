"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { PolicyTab } from "@/lib/rules";

const FADE_MS = 250;

/** Policy tabs. Content for each language comes from lib/rules.tsx (rendered on the server). */
export default function Tabs({ tabs }: { tabs: PolicyTab[] }) {
  const { t, dir } = useI18n();
  const [activeTab, setActiveTab] = useState(tabs[0].id); // highlighted tab button
  const [shownTab, setShownTab] = useState(tabs[0].id); // panel currently on screen
  const [visible, setVisible] = useState(true); // panel opacity
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
  }, []);

  // Fade the current panel out, swap content, then fade the new one in
  const selectTab = (id: string) => {
    if (id === activeTab) return;
    setActiveTab(id);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShownTab(id);
      setVisible(true);
      return;
    }

    setVisible(false);
    fadeTimer.current = setTimeout(() => {
      setShownTab(id);
      setVisible(true);
    }, FADE_MS);
  };

  // Arrow / Home / End keyboard navigation — Right/Left follow the reading direction
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    let next: number | null = null;
    if (e.key === forward || e.key === "ArrowDown") next = (index + 1) % tabs.length;
    if (e.key === backward || e.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    selectTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="w-full">
      {/* Navigation Tabs */}
      <div
        role="tablist"
        aria-label={t.rules.tabsAria}
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`
                group flex h-full min-h-[84px] flex-col items-start gap-3 rounded-xl border-2
                border-[#EF7D53] px-4 py-4 text-start transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7D53]
                focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:gap-4 sm:px-5
                lg:min-h-[100px] lg:gap-5 lg:px-8
                ${
                  isActive
                    ? "bg-[#EF7D53] text-white"
                    : "bg-white text-[#13999A] hover:bg-[#EF7D53]/10"
                }
              `}
            >
              <Image
                src={tab.icon}
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className={`
                  h-8 w-8 shrink-0 transition-[filter] duration-300 lg:h-10 lg:w-10
                  ${isActive ? "brightness-0 invert" : ""}
                `}
              />
              <span className="text-sm font-semibold leading-snug sm:text-base lg:text-lg">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content with Fade Effect */}
      <div
        className={`
          bg-white pt-8 transition-[opacity,transform] duration-[250ms] ease-out
          motion-reduce:transition-none will-change-[opacity,transform]
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        `}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            hidden={shownTab !== tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
