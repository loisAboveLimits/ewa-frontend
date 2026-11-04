import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import { getI18n } from "@/lib/i18n/server";
import { builtInCareer, getCareer, type CareerDetail } from "@/lib/careers";
import { pagePaths } from "@/lib/pages";

type Props = { params: Promise<{ slug: string }> };

/** The career for this URL in the visitor's language: Drupal first, else a built-in job (job-1…). */
async function loadCareer(params: Props["params"]): Promise<CareerDetail | null> {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  return (await getCareer(slug, locale)) ?? builtInCareer(slug, t);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const career = await loadCareer(params);
  if (!career) return {};
  const description = career.excerpt || [career.location, career.date].filter(Boolean).join(" · ") || undefined;
  return { title: career.title, description };
}

/* ------------------------------------------------------------------ */
/*  Page — same design as the Media Center post page                   */
/* ------------------------------------------------------------------ */
export default async function CareerPage({ params }: Props) {
  const { t } = await getI18n();
  const career = await loadCareer(params);
  if (!career) notFound();

  const image = career.image ?? "/imgs/slides/media1.jpg";

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-join.png" title={t.pages.join.title} subtitle={t.pages.join.desc} />

      {/*<!--breadcrumps-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          {/* Home › Join › Careers › job title (there is no /career listing page) */}
          <Breadcrumbs
            currentTitle={career.title}
            trail={[
              { title: t.pages.join.title, path: pagePaths.join },
              { title: t.join.careersTitle, path: `${pagePaths.join}#careers` },
              { title: career.title, path: career.href },
            ]}
          />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--content-body-->*/}
      <section id="content-body">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <article className="overflow-hidden rounded-se-[50px] md:rounded-se-[80px] bg-[#C8ECEA]">

            {/* Featured image with teal frame */}
            <div className="rounded-se-[50px] md:rounded-se-[80px] border-[6px] md:border-8 border-[#14989A] overflow-hidden">
              <div className="relative aspect-[16/9] md:aspect-[16/5] w-full">
                <Image
                  src={image}
                  alt={career.imageAlt}
                  fill
                  priority
                  // Drupal images are used as they are (Next 16 refuses to optimize localhost images)
                  unoptimized={/^https?:\/\//.test(image)}
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="px-5 py-8 sm:px-8 md:px-10 md:py-14 lg:pe-24">
              <header className="mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-[#14989A]">
                  {career.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 text-[#14989A]">
                  {career.date && (
                    <span className="flex items-center gap-2 text-lg md:text-2xl">
                      <i className="fa-regular fa-calendar-days" aria-hidden></i>
                      {career.dateTime ? <time dateTime={career.dateTime}>{career.date}</time> : career.date}
                    </span>
                  )}
                  {career.location && (
                    <span className="flex items-center gap-2 text-lg md:text-2xl">
                      <i className="fa-solid fa-location-dot" aria-hidden></i>
                      {career.location}
                    </span>
                  )}
                </div>
              </header>

              {career.html && (
                /* Drupal content (HTML) — same text style as the Media Center post page */
                <div
                  className="drupal-content text-base md:text-lg leading-relaxed text-[#1E1E1E] [&>*+*]:mt-5 md:[&>*+*]:mt-6"
                  dangerouslySetInnerHTML={{ __html: career.html }}
                />
              )}

            </div>
          </article>

          {/*<!--application form-->*/}
          <div id="apply" className="scroll-mt-28">
            <div className="spacer-40"></div>
            <CareerApplicationForm careerId={career.id} careerTitle={career.title} />
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>
    </div>
  );
}
