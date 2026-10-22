import type { ReactNode } from "react";

type Props = {
  image: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** "bottom" = inner pages (title in the lower part), "center" = home hero */
  align?: "bottom" | "center";
  titleClassName?: string;
};

/**
 * Hero banner used at the top of every page.
 * Has a real height on every screen size (the old markup collapsed to 0px on phones
 * because the caption was absolutely positioned inside an `height: auto` section).
 */
export default function PageBanner({ image, title, subtitle, align = "bottom", titleClassName = "" }: Props) {
  return (
    <section
      className="banner relative w-full bg-cover bg-center h-[62svh] min-h-[400px] md:h-[80vh] lg:h-screen lg:min-h-[640px]"
      style={{ backgroundImage: `url('${image}')` }}
    >
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
