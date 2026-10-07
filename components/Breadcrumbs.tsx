"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const paths = pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="fnt-green !text-xl "
          >
            Home
          </Link>
        </li>

        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          const label = decodeURIComponent(path)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());

          return (
            <li key={href} className="flex items-center gap-2">
              <span className="fnt-green !text-xl"><i className="fa-solid fa-chevron-right"></i></span>

              {isLast ? (
                <span className="font-semibold fnt-green !text-xl">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="fnt-green !text-xl"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}