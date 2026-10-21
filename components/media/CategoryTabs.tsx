"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type TabLink = {
  label: string;
  href: string;
  /** match only the exact path (use for "All") */
  exact?: boolean;
};

const defaultTabs: TabLink[] = [
  { label: "All", href: "/media-center", exact: true },
  { label: "Events", href: "/media-center/events" },
  { label: "News & Articles", href: "/media-center/news-articles" },
  { label: "Success Stories", href: "/media-center/success-stories" },
  { label: "Graduate Projects", href: "/media-center/graduate-projects" },
  { label: "Gallery", href: "/media-center/gallery" },
];

export default function CategoryTabs({
  tabs = defaultTabs,
  ariaLabel = "Media categories",
  className = "",
}: {
  tabs?: TabLink[];
  ariaLabel?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const isActive = (t: TabLink) =>
    t.exact ? pathname === t.href : pathname === t.href || pathname.startsWith(t.href + "/");

  // On small screens, scroll the tab row (not the page) so the active tab is centred
  useEffect(() => {
    const list = listRef.current;
    const tab = activeRef.current;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [pathname]);

  return (
    <nav
      aria-label={ariaLabel}
      className={`relative isolate overflow-hidden bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom bg-[#F0F7F7] ${className}`}
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
                    "rounded-tl-[22px] rounded-br-[22px] rounded-tr-md rounded-bl-md " +
                    "md:rounded-tl-[28px] md:rounded-br-[28px] " +
                    "border border-[#13999C] px-5 md:px-7 lg:px-8 " +
                    "text-[18px]! font-semibold transition-colors duration-300 " +
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
