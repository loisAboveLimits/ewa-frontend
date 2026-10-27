"use client";

import { useEffect, useRef } from "react";
import Link from "@/components/i18n/Link";
import { useLocalePathname } from "@/components/i18n/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";

export type TabLink = {
  label: string;
  href: string;
  /** match only the exact path (use for "All") */
  exact?: boolean;
};

const defaultTabs = [
  { key: "all", href: "/media-center", exact: true },
  { key: "events", href: "/media-center/events" },
  { key: "news", href: "/media-center/news-articles" },
  { key: "stories", href: "/media-center/success-stories" },
  { key: "graduate", href: "/media-center/graduate-projects" },
  { key: "gallery", href: "/media-center/gallery" },
] as const;

export default function CategoryTabs({
  tabs: tabsProp,
  ariaLabel,
  className = "",
}: {
  tabs?: TabLink[];
  ariaLabel?: string;
  className?: string;
}) {
  const { t } = useI18n();
  const tabs: TabLink[] = tabsProp ?? defaultTabs.map((tab) => ({ ...tab, label: t.media.tabs[tab.key] }));
  const pathname = useLocalePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const isActive = (t: TabLink) =>
    t.exact ? pathname === t.href : pathname === t.href || pathname.startsWith(t.href + "/");

  // On small screens, scroll the tab row (not the page) so the active tab is centred.
  // Uses on-screen positions so it works for both LTR and RTL scroll containers.
  useEffect(() => {
    const list = listRef.current;
    const tab = activeRef.current;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const listBox = list.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const delta = tabBox.left + tabBox.width / 2 - (listBox.left + listBox.width / 2);
    list.scrollBy({ left: delta, behavior: "smooth" });
  }, [pathname]);

  return (
    <nav
      aria-label={ariaLabel ?? t.media.tabsAria}
      className={`relative isolate overflow-hidden bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom rtl:bg-left-bottom bg-[#F0F7F7] ${className}`}
    >
      {/* decorative bubbles on the right */}
      <div className="container mx-auto px-4"> 
        <ul
          ref={listRef}
          className={
            "relative flex gap-3 md:gap-4 overflow-x-auto px-4 py-5 md:px-12 md:py-6 lg:flex-wrap lg:overflow-visible " +
            "snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {tabs.map((t) => {
            const active = isActive(t);
            return (
              <li key={t.href} className="shrink-0 snap-start">
                <Link
                  href={t.href}
                  ref={active ? activeRef : undefined}
                  aria-current={active ? "page" : undefined}
                  className={
                    "inline-flex h-11 md:h-[54px] lg:h-[60px] items-center justify-center whitespace-nowrap " +
                    "rounded-ss-[22px] rounded-ee-[22px] rounded-se-md rounded-es-md " +
                    "md:rounded-ss-[28px] md:rounded-ee-[28px] " +
                    "border border-[#13999C] px-5 md:px-7 lg:px-8 " +
                    "text-[16px]! md:text-[18px]! font-semibold transition-colors duration-300 " +
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2 " +
                    (active
                      ? "min-w-[72px] md:min-w-[100px] bg-[#13999C] text-white"
                      : "bg-[#F0F7F7]/80 text-[#13999C] hover:bg-[#13999C]/10")
                  }
                >
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
