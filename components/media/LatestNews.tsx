import Image from "next/image";
import Link from "next/link";
import { formatNewsDate, type NewsItem } from "@/lib/news";
import type { Locale } from "@/lib/i18n/config";

export default function LatestNews({ items, locale }: { items: NewsItem[]; locale: Locale }) {
  return (
    <ul className="flex flex-col gap-5 md:gap-6 lg:h-full lg:justify-between">
      {items.slice(0, 3).map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="group relative flex items-stretch gap-4 md:gap-5 rounded-ss-[22px] rounded-ee-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-4"
          >
            {/* thumbnail */}
            <span
              className={
                "relative shrink-0 w-[118px] sm:w-[140px] aspect-[140/88] overflow-hidden " +
                "rounded-ss-[22px] rounded-ee-[22px] rounded-se-md rounded-es-md border-2 border-[#13999C]"
              }
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="140px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </span>

            {/* text */}
            <span className="flex min-w-0 flex-1 flex-col pe-7">
              <span className="text-xs sm:text-sm text-[#EE7A52] underline underline-offset-2">{item.category}</span>
              <span className="mt-1 text-base sm:text-lg font-bold leading-snug text-[#13999C] line-clamp-2 group-hover:underline decoration-[#13999C]/40 underline-offset-4">
                {item.title}
              </span>
              <time dateTime={item.date} className="mt-auto pt-2 text-sm text-[#13999C]">
                {formatNewsDate(item.date, locale)}
              </time>
            </span>

            {/* chevron */}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="absolute bottom-0.5 end-0 h-6 w-6 text-[#EE7A52] transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl-flip"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
