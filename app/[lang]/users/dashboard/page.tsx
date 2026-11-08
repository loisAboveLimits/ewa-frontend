import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { TraineeCard, TraineeHeading } from "@/components/trainee/TraineeParts";
import { requireTrainee } from "@/lib/auth";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { formatDate, type Localized } from "@/lib/i18n/config";
import { getMediaSection } from "@/lib/mediaPosts";
import { pagePaths } from "@/lib/pages";

// personal page: never indexed
export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("dashboard")), robots: { index: false, follow: false } };
}

const copy: Localized<{
  welcome: string;
  intro: string;
  myPrograms: string;
  viewProfile: string;
  portals: string;
  portalsIntro: string;
  visit: string;
  latest: string;
  readMore: string;
  allNews: string;
  help: string;
  helpLinks: { label: string; href: string }[];
}> = {
  en: {
    welcome: "Welcome back,",
    myPrograms: "Your selected programs",
    viewProfile: "View my profile",
    intro: "Here you can reach your EWA portals, keep up with the latest news and find the information you need during your training.",
    portals: "Your Portals",
    portalsIntro: "Quick access to the EWA systems you use every day.",
    visit: "Open",
    latest: "Latest from EWA",
    readMore: "Read More",
    allNews: "All news",
    help: "Useful Links",
    helpLinks: [
      { label: "Rules & Regulations", href: pagePaths.rules },
      { label: "Our Programs", href: pagePaths.programs },
      { label: "Media Center", href: "/media-center" },
      { label: "Contact Us", href: pagePaths.contact },
    ],
  },
  ar: {
    welcome: "مرحبًا بعودتك،",
    myPrograms: "البرامج التي اخترتها",
    viewProfile: "عرض ملفي الشخصي",
    intro: "من هنا يمكنك الوصول إلى بوابات الأكاديمية، ومتابعة آخر الأخبار، والعثور على المعلومات التي تحتاجها خلال تدريبك.",
    portals: "بواباتك",
    portalsIntro: "وصول سريع إلى أنظمة الأكاديمية التي تستخدمها يوميًا.",
    visit: "فتح",
    latest: "آخر أخبار الأكاديمية",
    readMore: "اقرأ المزيد",
    allNews: "جميع الأخبار",
    help: "روابط مفيدة",
    helpLinks: [
      { label: "الأنظمة واللوائح", href: pagePaths.rules },
      { label: "برامجنا", href: pagePaths.programs },
      { label: "المركز الإعلامي", href: "/media-center" },
      { label: "تواصل معنا", href: pagePaths.contact },
    ],
  },
};

/** Trainee Dashboard home (/users/dashboard). Banner, breadcrumbs and the trainee menu: layout.tsx. */
export default async function TraineeDashboard() {
  const { locale, t } = await getI18n();
  const user = await requireTrainee(locale);
  if (!user) return null; // Drupal unreachable — the layout shows the notice

  const c = copy[locale];
  const p = user.profile ?? {};
  const name = [p.firstName, p.lastName].filter(Boolean).join(" ") || user.display_name || user.name;
  const news = ((await getMediaSection("latest", "all", locale, 3)) ?? []).slice(0, 3);

  return (
    <div className="flex flex-col gap-12 md:gap-14">

      {/* welcome */}
      <TraineeCard>
        <p className="text-lg md:text-2xl text-[#14989A]">{c.welcome}</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-[#14989A] break-words">{name}</h2>
        <p className="mt-4 max-w-[46rem] text-base md:text-lg leading-relaxed text-[#14989A]">{c.intro}</p>

        {/* programs chosen at registration (Drupal field_programs) */}
        {!!p.programs?.length && (
          <div className="mt-6">
            <h3 className="text-lg md:text-xl font-bold text-[#14989A]">{c.myPrograms}</h3>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {p.programs.map((pr) => (
                <li key={pr.tid} className="rounded-full bg-[#14989A] px-4 py-1.5 text-sm md:text-base font-semibold text-white">
                  {pr.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link href="/users/dashboard/profile" className="mt-6 inline-block text-base font-bold text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]">
          {c.viewProfile}
        </Link>
      </TraineeCard>

      {/* portals */}
      <section aria-labelledby="portals-title">
        <h2 id="portals-title" className="text-3xl md:text-4xl font-bold text-[#14989A]">{c.portals}</h2>
        <p className="mt-2 text-base md:text-lg text-[#14989A]">{c.portalsIntro}</p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {t.users.map((portal) => (
            <li key={portal.link} className="min-w-0">
              <a
                href={portal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[1.5rem] border-2 border-[#F6A181] bg-white p-5 transition hover:border-[#EE7A52] hover:shadow-[0_10px_30px_rgba(238,122,82,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52]"
              >
                <span className="text-lg md:text-xl font-bold text-[#14989A]">{portal.cardTitle}</span>
                <span className="mt-1 text-sm md:text-base text-[#14989A]">{portal.cardText}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-base font-bold text-[#EE7A52]">
                  {c.visit}
                  <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EE7A52] text-white transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rtl-flip" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* latest news */}
      {news.length > 0 && (
        <section aria-labelledby="latest-title">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="latest-title" className="text-3xl md:text-4xl font-bold text-[#14989A]">{c.latest}</h2>
            <Link href="/media-center" className="text-base font-bold text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]">
              {c.allNews}
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {news.map((item) => (
              <li key={item.id} className="min-w-0">
                <article className="flex h-full flex-col overflow-hidden rounded-se-[40px] bg-[#C8ECEA]">
                  <div className="relative aspect-[16/10] w-full bg-[#14989A]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm font-semibold text-[#EE7A52]">{item.category}</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-[#14989A] line-clamp-2">{item.title}</h3>
                    <time dateTime={item.date} className="mt-1 text-sm text-[#14989A]">
                      {formatDate(item.date, locale)}
                    </time>
                    <Link href={item.href} className="mt-auto pt-4 text-base font-bold text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]">
                      {c.readMore}
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* useful links */}
      <nav aria-labelledby="help-title">
        <h2 id="help-title" className="text-3xl md:text-4xl font-bold text-[#14989A]">{c.help}</h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {c.helpLinks.map((l) => (
            <li key={l.href} className="min-w-0">
              <Link
                href={l.href}
                className="flex items-center justify-between gap-3 rounded-2xl bg-[#C8ECEA] px-5 py-4 text-base md:text-lg font-semibold text-[#14989A] transition hover:bg-[#14989A] hover:text-white"
              >
                {l.label}
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 rtl-flip" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
