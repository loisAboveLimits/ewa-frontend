import Link from "@/components/i18n/Link";
import type { Locale, Localized } from "@/lib/i18n/config";
import { pagePaths } from "@/lib/pages";

const copy: Localized<{ explore: string; apply: string; sponsor: string; label: string }> = {
  en: { explore: "Explore Programs", apply: "Apply Now", sponsor: "Become a Sponsor", label: "Get started" },
  ar: { explore: "استكشف البرامج", apply: "قدّم الآن", sponsor: "كن راعيًا", label: "ابدأ الآن" },
};

/** Dark glass "pill" buttons under the home banner title (see PageBanner `actions`) — readable on the bright sky. */
const pill =
  "inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-[rgba(40,48,50,0.38)] px-4 py-2.5 sm:px-5 sm:py-3 " +
  "text-[14px]! sm:text-[16px]! font-semibold text-white whitespace-nowrap " +
  "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md " +
  // hover / keyboard focus: lifts a little and turns EWA orange; the icon nudges forward
  "group transition-[background-color,border-color,box-shadow,translate] duration-300 ease-out " +
  "hover:-translate-y-0.5 hover:border-[#EE7A52] hover:bg-[#EE7A52] hover:shadow-[0_12px_28px_-12px_rgba(238,122,82,0.75)] " +
  "focus-visible:-translate-y-0.5 focus-visible:border-[#EE7A52] focus-visible:bg-[#EE7A52] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function BannerActions({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <nav aria-label={c.label} className="flex flex-wrap gap-2.5 sm:gap-3">
      <Link href={pagePaths.programs} className={pill}>
        {c.explore}
        <ChevronIcon />
      </Link>
      <Link href={pagePaths.registration} className={pill}>
        {c.apply}
      </Link>
      <Link href={pagePaths.contact} className={pill}>
        {c.sponsor}
        <HandshakeIcon />
      </Link>
    </nav>
  );
}

/** ">" — points the reading direction (mirrored in Arabic). */
function ChevronIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 rtl:-scale-x-100 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

/** Handshake (Lucide icon set, ISC licence). */
function HandshakeIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-rotate-12 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}
