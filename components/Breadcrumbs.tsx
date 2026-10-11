
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pages } from "@/lib/pages";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");

    const page = Object.values(pages).find(
      (item) => item.path === path
    );

    return {
      title: page?.title ?? decodeURIComponent(segment).replace(/-/g, " "),
      path,
    };
  });

  return (

    <nav aria-label="Breadcrumb">
      <div className="spacer-40"></div>
      
      <ol className="flex flex-wrap items-center gap-2 text-sm">

        <li>
          <Link href="/" className="fnt-green text-xl!">
            Home
          </Link>
        </li>

        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-2">
              <span className="fnt-green text-xl!"><i className="fa-solid fa-chevron-right"></i></span>

              {isLast ? (
                <span className="font-semibold fnt-green text-xl!">
                  {item.title}
                </span>
              ) : (
                <Link href={item.path} className="fnt-green text-xl!">
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
