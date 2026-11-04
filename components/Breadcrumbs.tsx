"use client";

import Link from "@/components/i18n/Link";
import { useLocalePathname } from "@/components/i18n/navigation";
import { buildPages } from "@/lib/pages";
import { useI18n } from "@/components/i18n/I18nProvider";

export type Crumb = { title: string; path: string };

/**
 * `currentTitle` overrides the last crumb (e.g. an article title instead of its URL slug).
 * `trail` replaces the crumbs worked out from the URL (Home is always first), e.g. for
 * /career/[slug]: [{ title: "Join", path: "/join" }, { title: "Careers", path: "/join#careers" }, …].
 */
export default function Breadcrumbs({ currentTitle, trail }: { currentTitle?: string; trail?: Crumb[] } = {}) {
  const pathname = useLocalePathname();
  const { t } = useI18n();
  const pages = buildPages(t.pages);

  const segments = pathname.split("/").filter(Boolean);

  const fromUrl = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");

    const page = Object.values(pages).find(
      (item) => item.path === path
    );

    const isLast = index === segments.length - 1;
    return {
      title: (isLast && currentTitle) || page?.title || decodeURIComponent(segment).replace(/-/g, " "),
      path,
    };
  });

  const breadcrumbs = trail?.length
    ? trail.map((c, i) => (i === trail.length - 1 && currentTitle ? { ...c, title: currentTitle } : c))
    : fromUrl;

  return (

    <nav aria-label={t.common.breadcrumb}>
      <div className="spacer-40"></div>

      <ol className="flex flex-wrap items-center gap-2 text-sm">

        <li>
          <Link href="/" className="fnt-green text-base! md:text-xl!">
            {t.common.home}
          </Link>
        </li>

        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-2">
              {/* chevron points "forward": right in English, left in Arabic */}
              <span className="fnt-green text-sm! md:text-xl! rtl-flip" aria-hidden><i className="fa-solid fa-chevron-right"></i></span>

              {isLast ? (
                <span className="font-semibold fnt-green text-base! md:text-xl! capitalize" aria-current="page">
                  {item.title}
                </span>
              ) : (
                <Link href={item.path} className="fnt-green text-base! md:text-xl! capitalize">
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}

      </ol>
    </nav>
  );
}
