import type { ReactNode } from "react";
import { getBanner } from "@/lib/banners";
import { getLocale } from "@/lib/i18n/server";
import type { PageKey } from "@/lib/pages";

type Props = {
  image: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** "bottom" = inner pages (title in the lower part), "center" = home hero */
  align?: "bottom" | "center";
  titleClassName?: string;
  /**
   * Page key (see lib/pages.ts). When set, the image / title / subtitle are taken from the
   * Drupal page mapped in lib/banners.ts — the props above are the fallback.
   */
  page?: PageKey;
};

/**
 * Hero banner used at the top of every page.
 * Has a real height on every screen size (the old markup collapsed to 0px on phones
 * because the caption was absolutely positioned inside an `height: auto` section).
 */
export default async function PageBanner({ page, align = "bottom", titleClassName = "", ...fallback }: Props) {
  const drupal = page ? await getBanner(page, await getLocale()) : {};
  const image = drupal.image || fallback.image;
  const title = drupal.title ?? fallback.title;
  const subtitle = drupal.subtitle ?? fallback.subtitle;

  return (
    <section className="banner relative w-full h-[62svh] min-h-[400px] md:h-[80vh] lg:h-screen lg:min-h-[640px]">
      {/* background on its own layer so it can be mirrored in Arabic without flipping the text */}
      <div
        aria-hidden
        className="banner-bg absolute inset-0 bg-cover bg-center rtl:-scale-x-100"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div
        className={
          "banner-caption absolute inset-x-0 " +
          (align === "center" ? "top-[45%] md:top-[40%] -translate-y-1/2" : "bottom-[16%] md:bottom-[24%]")
        }
      >
        <div className="container mx-auto px-4">
          <h1 className={`banner-title ${titleClassName}`}>{title}</h1>
          {subtitle && (
            <>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">{subtitle}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
