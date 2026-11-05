import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import { getI18n } from "@/lib/i18n/server";
import { getTeamMember, type TeamMember } from "@/lib/team";
import { pagePaths } from "@/lib/pages";

type Props = { params: Promise<{ slug: string }> };

async function loadMember(params: Props["params"]): Promise<TeamMember | null> {
  const { slug } = await params;
  const { locale } = await getI18n();
  return getTeamMember(slug, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await loadMember(params);
  if (!member) return {};
  return { title: member.name, description: member.position || undefined };
}

/* ------------------------------------------------------------------ */
/*  Team member page — same layout as the Media Center post page:      */
/*  banner, breadcrumbs, then the teal card. The card's picture area    */
/*  is the bubble background, with the member's photo overlapping its   */
/*  bottom edge and the name + position beside the photo.               */
/* ------------------------------------------------------------------ */
export default async function TeamMemberPage({ params }: Props) {
  const { t } = await getI18n();
  const member = await loadMember(params);
  if (!member) notFound();

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-about.png" title={t.about.boardTitle} subtitle={t.pages.about.desc} />

      {/*<!--breadcrumps-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          {/* Home › About EWA › Board of Directors › name (there is no /team listing page) */}
          <Breadcrumbs
            currentTitle={member.name}
            trail={[
              { title: t.pages.about.title, path: pagePaths.about },
              { title: t.about.boardTitle, path: `${pagePaths.about}#directors` },
              { title: member.name, path: member.href },
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

            {/* teal bubbles in the teal frame (where a post has its featured image); mirrored in Arabic */}
            <div className="rounded-se-[50px] md:rounded-se-[80px] border-[6px] md:border-8 border-[#14989A] overflow-hidden">
              <div
                aria-hidden
                className="h-[120px] sm:h-[160px] md:h-[200px] lg:h-[240px] w-full bg-[#45A9AC] bg-cover bg-center rtl:-scale-x-100"
                style={{ backgroundImage: "url('/imgs/banners/banner-team.jpg')" }}
              />
            </div>

            <div className="px-5 pb-8 sm:px-8 md:px-10 md:pb-14 lg:pe-24">
              {/* photo over the bottom of the bubbles, name + position beside it */}
              <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6 md:mb-8 md:gap-8">
                <div
                  className={
                    "relative z-10 shrink-0 overflow-hidden bg-linear-to-b from-[#C9E2E6] to-[#8CC8CA] shadow-[0_10px_30px_rgba(19,153,156,0.2)] " +
                    "w-[150px] h-[134px] -mt-[78px] " +
                    "sm:w-[190px] sm:h-[170px] sm:-mt-[100px] " +
                    "md:w-[230px] md:h-[205px] md:-mt-[120px] " +
                    "lg:w-[270px] lg:h-[240px] lg:-mt-[140px]"
                  }
                >
                  {member.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.image} alt={member.imageAlt} className="no-flip absolute inset-0 h-full w-full object-cover object-top" />
                  )}
                </div>

                <div className="min-w-0 sm:pb-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-[#14989A] break-words">
                    {member.name}
                  </h2>
                  {member.position && (
                    <p className="mt-1 md:mt-2 text-lg md:text-2xl text-[#14989A]">{member.position}</p>
                  )}
                </div>
              </header>

              {member.html && (
                /* Drupal "Content" (HTML) in teal #14989A, like the name */
                <div
                  className="drupal-content text-base md:text-lg leading-relaxed text-[#14989A] [&_*]:text-[#14989A]! [&>*+*]:mt-5 md:[&>*+*]:mt-6"
                  dangerouslySetInnerHTML={{ __html: member.html }}
                />
              )}
            </div>
          </article>

        </div>

        <div className="spacer-40"></div>
      </section>
    </div>
  );
}
