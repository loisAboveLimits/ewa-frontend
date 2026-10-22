import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Leaf icon + heading, used for every section title.
 * Replaces the old `sm:w-[5%]` icon column, which rendered the icon at full size on phones.
 */
export default function SectionTitle({
  children,
  as: Tag = "h2",
  color = "fnt-green",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  color?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <Image
        src="/imgs/icons/title.svg"
        alt=""
        aria-hidden
        width={45}
        height={114}
        className="h-auto w-[22px] shrink-0 sm:w-[30px] lg:w-[40px]"
      />
      <Tag className={`font-bold title ${color}`}>{children}</Tag>
    </div>
  );
}
