import Image from "next/image";
import StoriesCarousel from "@/components/stories/Stories";
import MediaCarousel from "@/components/Media";
import Breadcrumbs from "@/components/Breadcrumbs";
import Testimonials from "@/components/orbit/Testimonials";
import { getOrbitActions, getTeam } from "@/components/orbit/team";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import ArrowLink from "@/components/ui/ArrowLink";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("community");

export default async function Community() {
  const { locale, t } = await getI18n();
  const s = t.sections;

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-community.png" title={t.pages.community.title} subtitle={t.pages.community.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--media center-->*/}
      <section id="media-center" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <SectionTitle>{t.community.mediaTitle}</SectionTitle>

          <div className="spacer-40"></div>

          <MediaCarousel />

          <div className="spacer-40"></div>

          <div className="flex justify-end">
            <ArrowLink href="/media-center" color="orange" className="fnt-orange">
              {t.common.viewMore}
            </ArrowLink>
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

      {/*<!--stories-->*/}
      <section id="stories">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">
          <SectionTitle>
            {s.storiesA}<br />{s.storiesB} <span className="fnt-orange">{s.storiesHighlight}</span>
          </SectionTitle>
        </div>

        <div className="spacer-40"></div>

        <StoriesCarousel />

         <div className="spacer-80"></div>
      </section>

      {/*<!--testimonies-->*/}
      <section id="testimonies">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">
          <SectionTitle>
            {s.testimonialsA}<br />{s.testimonialsB} <span className="fnt-orange">{s.testimonialsHighlight}</span> {s.testimonialsC}
          </SectionTitle>
        </div>

        <div className="spacer-40"></div>

        {/* slider on phones, rotating orbit from tablets up */}
        <Testimonials
          members={getTeam(locale)}
          actions={getOrbitActions(t)}
          label={s.testimonialsA}
          center={
            <Image src="/imgs/logos/logo-circle-white.svg" alt="EWA" width={344} height={306} priority className="h-auto w-full" />
          }
        />

         <div className="spacer-80"></div>
      </section>

    </div>
  );
}
