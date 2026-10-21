import type { ReactNode } from "react";
import FacilitySlider, { type SlideImage } from "./FacilitySlider";

type Props = {
  id: string;
  title: string;
  images: SlideImage[];
  children: ReactNode;
  /** "left" = slider left, text right. "right" = text left, slider right */
  imageSide?: "left" | "right";
  priority?: boolean;
};

export default function FacilitySection({ id, title, images, children, imageSide = "left", priority }: Props) {
  const imageRight = imageSide === "right";

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        {/* slider – always first on mobile */}
        <div className={`lg:col-span-7 ${imageRight ? "lg:order-2" : "lg:order-1"}`}>
          <FacilitySlider images={images} side={imageSide} priority={priority} label={title} />
        </div>

        {/* text */}
        <div className={`lg:col-span-5 lg:pt-2 ${imageRight ? "lg:order-1" : "lg:order-2"}`}>
          <h2
            id={`${id}-title`}
            className={
              "text-[35px] fnt-green font-bold" +
              (imageRight ? "lg:text-right" : "")
            }
          >
            {title}
          </h2>
          <div
            className={
              "mt-3 md:mt-4 space-y-4 text-[20px]! fnt-green " +
              "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-0.5 [&_ul]:text-left " +
              "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2"
            }
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
