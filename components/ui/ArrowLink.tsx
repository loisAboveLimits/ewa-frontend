import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Text link followed by the "send" arrow icon — the arrow mirrors in Arabic. */
export default function ArrowLink({
  href,
  children,
  color = "green",
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

export function ArrowIcon({ color = "green", size = 30 }: { color?: "green" | "orange"; size?: number }) {
  return (
    <Image
      src={`/imgs/icons/icon-send-${color}.png`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className="mar-left-5 h-auto rtl-flip"
    />
  );
}
