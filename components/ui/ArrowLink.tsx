import Image from "next/image";
import Link from "@/components/i18n/Link";
import type { ReactNode } from "react";

/**
 * Text link followed by the "send" arrow icon — the arrow mirrors in Arabic.
 * Every arrow link uses the same orange arrow (the green one was hard to see on green boxes);
 * `color` is kept so existing calls don't break.
 * Place it in a `flex justify-end` row so it sits on the right in English and on the left in Arabic.
 */
export default function ArrowLink({
  href,
  children,
  color = "orange",
  className = "",
  iconSize = 30,
}: {
  href: string;
  children: ReactNode;
  color?: "green" | "orange";
  className?: string;
  iconSize?: number;
}) {
  return (
    <Link href={href} className={`btn btn-transparent font-bold remPad ${className}`}>
      {children}
      <ArrowIcon color={color} size={iconSize} />
    </Link>
  );
}

export function ArrowIcon({ size = 30 }: { color?: "green" | "orange"; size?: number }) {
  return (
    <Image
      src="/imgs/icons/icon-send-orange.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      className="mar-left-5 h-auto rtl-flip"
    />
  );
}
