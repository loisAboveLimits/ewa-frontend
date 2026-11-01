import Image from "next/image";
import { notFound } from "next/navigation";
import StoriesCarousel from "@/components/stories/Stories";
import ContactForm from "@/components/Contact";
import DrupalTestimonials from "@/components/orbit/DrupalTestimonials";
import { getOrbitActions, getTeam } from "@/components/orbit/team";
import DrupalProgramsRoulette from "@/components/roulette/DrupalProgramsRoulette";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import LogoTicker from "@/components/ui/LogoTicker";
import ArrowLink from "@/components/ui/ArrowLink";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { getPageMeta } from "@/lib/banners";

import DrupalSection from "@/components/drupal/DrupalSection";

/* Home: the tab title is just "EWA" (absolute = no " | site name" suffix); description from the Drupal sub title */
export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  const { description } = await getPageMeta("home", locale);
  return { title: { absolute: "EWA" }, ...(description && { description }) };
}

/* sections
<DrupalSection nid={12} />                                  // main title + sub title + content
<DrupalSection nid={12} showSubTitle={false} />             // main title + content
<DrupalSection nid={12} showTitle={false} />                // sub title + content
<DrupalSection nid={12} showContent={false} />              // main title + sub title only
<DrupalSection nid={12} title={t.about.valuesTitle} />      // your title, Drupal sub title + content
<DrupalSection nid={12} title="Our Values" subTitle={<>Built on <span className="fnt-green">trust</span></>} />
*/

export default async function Home() {
  const { locale, t } = await getI18n();
  const s = t.sections;


  return (

    <div className="w-full wrapper bg-white">

      <PageBanner
        page="home"
        image="/imgs/banners/banner-home.png"
        align="center"
        titleClassName="fnt-orange"
        title={<>{t.home.bannerLine1}<br />{t.home.bannerLine2}</>}
      />


      {/*<!--about-->*/}
      <DrupalSection nid={2} id="about" showSubTitle={false} showTitle={false} />

      {/*<!--partners-->*/}
      <section id="partners">
        {/* partner logos — ticker: right → left in English, left → right in Arabic */}
        {/*<LogoTicker logos={[1, 2, 3, 4, 5, 6]} alt={t.common.partner} />*/}
        <LogoTicker nid={21}  alt={t.common.partner} />
        <div className="spacer-80"></div>
      </section>

      {/*<!--courses-->*/}
        <section id="courses">
          <div className="spacer-20"></div>
          <div className="container mx-auto px-4">
            {/* program types from the Drupal "Programs" taxonomy (built-in list if Drupal is down) */}
            <DrupalProgramsRoulette />
          </div>
          <div className="spacer-20"></div>
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

        {/* testimonies from Drupal by language — slider on phones, rotating orbit from tablets up.
            The built-in team is shown if Drupal has none. */}
        <DrupalTestimonials
          fallback={getTeam(locale)}
          actions={getOrbitActions(t)}
          label={s.testimonialsA}
          center={
            <Image src="/imgs/logos/logo-circle-white.svg" alt="EWA" width={344} height={306} priority className="h-auto w-full" />
          }
        />

         <div className="spacer-80"></div>
      </section>


      {/*<!--contact-->*/}
      <section id="contact">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">
          <SectionTitle>
            {s.contactA}<br /><span className="fnt-orange">{s.contactHighlight}</span>
          </SectionTitle>
        </div>

        <div className="spacer-40"></div>

        <div className="contactus-form px-4">
          <ContactForm />
        </div>

         <div className="spacer-80"></div>
      </section>

    </div>
  );
}
