"use client";

import Link from "@/components/i18n/Link";
import { useLocalePathname } from "@/components/i18n/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";
import { traineeCopy, traineeNav, type TraineeNavKey } from "@/lib/traineeNav";

/**
 * Trainee menu — same box as the programs page filter (teal border, light teal background).
 * Left column in English, right in Arabic (it is the first column of a row, so RTL flips it).
 * Phones / tablets: the links sit in a grid; large screens: a list with My Profile at the bottom.
 */
export default function TraineeSidebar({ name }: { name: string }) {
  const { locale } = useI18n();
  const c = traineeCopy[locale];
  const pathname = useLocalePathname();
  const main = traineeNav.filter((i) => i.key !== "profile");
  const profile = traineeNav.find((i) => i.key === "profile")!;

  const item = (i: (typeof traineeNav)[number]) => {
    const active = pathname === i.href;
    return (
      <Link
        href={i.href}
        aria-current={active ? "page" : undefined}
        className={
          "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[17px]! md:text-[19px]! font-bold transition-colors " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] " +
          (active ? "bg-[#13999C] text-white" : "text-[#13999C] hover:bg-white")
        }
      >
        <NavIcon name={i.key} />
        <span className="min-w-0">{c.nav[i.key]}</span>
      </Link>
    );
  };

  return (
    <aside className="box filter-box flex h-full flex-col overflow-hidden rounded-[1.75rem]">
      <div className="filter-box-header px-6 py-4">
        <h2 className="fnt-green text-[22px]! md:text-[26px]! font-bold break-words">{c.welcome(name)}</h2>
      </div>

      <nav aria-label={c.menu} className="flex flex-1 flex-col px-4 py-4 md:px-5 lg:py-6">
        <ul className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1 lg:gap-2">
          {main.map((i) => (
            <li key={i.key} className="min-w-0">
              {item(i)}
            </li>
          ))}
          {/* phones / tablets: My Profile with the others */}
          <li className="min-w-0 lg:hidden">{item(profile)}</li>
        </ul>

        {/* large screens: My Profile at the bottom, like the design */}
        <div className="hidden lg:block lg:mt-auto lg:pt-16">{item(profile)}</div>

        {/* Sign out: full-width orange button */}
        <form action="/api/auth/logout" method="post" className="mt-4 lg:mt-5">
          <input type="hidden" name="lang" value={locale} />
          <button
            type="submit"
            className="w-full rounded-full bg-[#EE7A52] px-5 py-3 text-center text-base md:text-lg font-bold text-white transition-colors hover:bg-[#E5683D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2 cursor-pointer"
          >
            {c.signOut}
          </button>
        </form>
      </nav>
    </aside>
  );
}

function NavIcon({ name }: { name: TraineeNavKey }) {
  const cls = "h-8 w-8 shrink-0 md:h-9 md:w-9";
  if (name === "dashboard") {
    // EWA mark (from the logo), coloured with the text colour
    return (
      <span
        aria-hidden
        className={`${cls} bg-current`}
        style={{
          WebkitMask: "url('/imgs/logos/logo-mark.svg') center / contain no-repeat",
          mask: "url('/imgs/logos/logo-mark.svg') center / contain no-repeat",
        }}
      />
    );
  }
  const paths: Record<Exclude<TraineeNavKey, "dashboard">, React.ReactNode> = {
    classes: (
      <>
        <path d="M1.5 9 12 4l10.5 5L12 14 1.5 9Z" fill="currentColor" />
        <path d="M6 11.5v4c0 1.7 2.7 3.5 6 3.5s6-1.8 6-3.5v-4L12 14l-6-2.5Z" fill="currentColor" />
        <path d="M21 9.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    teachers: (
      <>
        <circle cx="8.5" cy="7.5" r="3.5" fill="currentColor" />
        <circle cx="16.5" cy="7" r="3" fill="currentColor" />
        <path d="M1.5 19.5c0-3.6 3.1-6 7-6s7 2.4 7 6v.5h-14v-.5Z" fill="currentColor" />
        <path d="M16.5 12.5c3.4 0 6 2.1 6 5.4V20h-5.5v-.5c0-2.6-1-4.7-2.7-6.2.7-.5 1.4-.8 2.2-.8Z" fill="currentColor" />
      </>
    ),
    schedule: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <circle cx="8" cy="14" r=".6" fill="currentColor" />
        <circle cx="12" cy="14" r=".6" fill="currentColor" />
        <circle cx="16" cy="14" r=".6" fill="currentColor" />
        <circle cx="8" cy="17.5" r=".6" fill="currentColor" />
        <circle cx="12" cy="17.5" r=".6" fill="currentColor" />
      </g>
    ),
    profile: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <circle cx="8.5" cy="10.5" r="2.2" />
        <path d="M5 16c.6-1.8 2-2.7 3.5-2.7s2.9.9 3.5 2.7M14.5 9.5h4M14.5 12.5h4M14.5 15.5h2.5" />
      </g>
    ),
  };
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cls}>
      {paths[name]}
    </svg>
  );
}
