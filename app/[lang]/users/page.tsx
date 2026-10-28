import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("users");

/*
 * Portal cards — title, text and link come from the dictionaries (`users` in en.ts / ar.ts).
 * Icon per card, in the same order as the dictionary list. Unknown positions fall back to "building".
 */
const icons = ["building", "building", "building", "cap", "cap"] as const;

export default async function Users() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="users" image="/imgs/banners/banner-users.png" title={t.pages.users.title} subtitle={t.pages.users.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--portals-->*/}
      <section className="relative">

        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-x-8 lg:gap-y-7">
            {t.users.map((portal, i) => (
              <li key={portal.link}>
                <PortalCard
                  icon={icons[i] ?? "building"}
                  title={portal.cardTitle}
                  text={portal.cardText}
                  href={portal.link}
                  cta={t.common.visitPortal}
                />
              </li>
            ))}
          </ul>

        </div>

        <div className="spacer-80"></div>
      </section>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function PortalCard({
  icon,
  title,
  text,
  href,
  cta,
}: {
  icon: (typeof icons)[number];
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="relative isolate flex h-full min-h-47.5 flex-col overflow-hidden rounded-[1.75rem] border-2 border-[#F6A181] bg-white px-5 pt-5 pb-5 sm:px-6 md:min-h-52.5">

      {/* peach bubbles in the bottom start corner (mirrors in Arabic) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%] bg-[url(/imgs/assets/box-user-bg.svg)] bg-no-repeat bg-bottom-left bg-size-[100%_auto] rtl:-scale-x-100"
      />

      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E3F1F1] text-[#13999C] md:h-14 md:w-14">
          {icon === "cap" ? <CapIcon /> : <BuildingIcon />}
        </span>

        <div className="min-w-0 flex-1 pt-1">
          <h2 className="text-[18px]! md:text-[24px]! font-bold leading-snug text-[#13999C]">{title}</h2>
          <p className="mt-2 max-w-[24rem] text-[15px]! md:text-[20px]! leading-snug! text-[#13999C]">{text}</p>
        </div>
      </div>

      {/* "Visit Portal" — bottom end corner: right in English, left in Arabic */}
      <div className="mt-auto flex justify-end pt-6">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full text-[16px]! md:text-[17px]! font-bold text-[#EE7A52] underline underline-offset-4 transition-colors hover:text-[#E5683D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2"
        >
          {cta}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EE7A52] text-white transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5 rtl-flip" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V5.5A1.5 1.5 0 0 1 6.5 4h7A1.5 1.5 0 0 1 15 5.5V21" />
      <path d="M15 10h2.5A1.5 1.5 0 0 1 19 11.5V21" />
      <path d="M3 21h18" />
      <path d="M8.5 8h3M8.5 11.5h3M8.5 15h3" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11v4.2c0 1.6 2.5 3.3 5.5 3.3s5.5-1.7 5.5-3.3V11" />
      <path d="M21.5 9v5.5" />
      <circle cx="21.5" cy="15.5" r="1" />
    </svg>
  );
}
