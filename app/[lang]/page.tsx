import Image from "next/image";
import { notFound } from "next/navigation";
import StoriesCarousel from "@/components/stories/Stories";
import ContactForm from "@/components/Contact";
import Testimonials from "@/components/orbit/Testimonials";
import { getOrbitActions, getTeam } from "@/components/orbit/team";
import ProgramsRoulette from "@/components/roulette/ProgramsRoulette";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import LogoTicker from "@/components/ui/LogoTicker";
import ArrowLink from "@/components/ui/ArrowLink";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { getPageMeta } from "@/lib/banners";

import DrupalSection from "@/components/drupal/DrupalSection";

/* Home: Drupal main title / sub title when set, otherwise the site name from the layout */
export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  const { title, description } = await getPageMeta("home", locale);
  return { ...(title && { title }), ...(description && { description }) };
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
      {/* <section id="about" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex flex-col md:flex-row items-stretch">

            <div className="md:w-1/2 p-2 py-4 sm:p-6 lg:p-8 flex flex-col">

              <div className="box box-green px-6 py-10 md:px-8 md:py-12">
                <h3 className="font-bold sub-title">{t.home.aboutKicker}</h3>
                <h2 className="font-bold title">{t.home.aboutTitle}</h2>

                <div className="spacer-40"></div>

                <p>{t.home.aboutText}</p>

                <div className="spacer-40"></div>

                <div className="flex justify-end">
                  <ArrowLink href="/about">{t.common.learnMore}</ArrowLink>
                </div>
              </div>

              <div className="spacer-40"></div>

              <div className="box box-orange px-6 py-10 md:px-8 md:py-12">
                <h2 className="font-bold title">{t.home.partnerTitle}</h2>

                <div className="spacer-40"></div>

                <p>{t.home.partnerText}</p>

                <div className="spacer-40"></div>

                <div className="flex justify-end">
                  <ArrowLink href="/contact" color="orange">{t.common.sendRequest}</ArrowLink>
                </div>
              </div>

            </div>

            <div className="md:w-1/2 p-2 py-4 sm:p-6 lg:p-8 flex">

              <div className="box box-mixed p-6 sm:p-8 bg-[url(/imgs/bgs/home-about-bg.jpg)] bg-cover bg-center w-full flex flex-col min-h-[320px]">

                <h2 className="font-bold sub-title text-white">{t.home.numbersTitleA}<br />{t.home.numbersTitleB}</h2>

                <div className="mt-auto grid grid-cols-3 gap-2 pt-10 sm:gap-4">
                  {[
                    { value: "20", label: t.home.diplomaPrograms },
                    { value: "70", label: t.home.sponsorshipPartners },
                    { value: "25", label: t.home.accreditedPrograms },
                  ].map((stat) => (
                    <div key={stat.label} className="prog flex flex-col items-center justify-end text-center">
                      <p className="counter ltr-text text-[38px]! sm:text-[46px]! md:text-[38px]! lg:text-[50px]! xl:text-[56px]! leading-none!">{stat.value}</p>
                      <p className="mt-2 text-[13px]! sm:text-[15px]! md:text-[13px]! lg:text-[15px]! leading-tight!">{stat.label}</p>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>

        <Image src="/imgs/logos/logo-circle-white.svg" alt="" aria-hidden width={150} height={150} className="hidden md:block w-[110px] lg:w-[150px] h-auto absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2"/>

        <div className="spacer-40"></div>
      </section>*/}

      <DrupalSection nid={2} id="about" showSubTitle={false} showTitle={false} />

      {/*<!--partners-->*/}
      <section id="partners">
        <div className="spacer-20"></div>
        {/* partner logos — ticker: right → left in English, left → right in Arabic */}
        <LogoTicker logos={[1, 2, 3, 4, 5, 6]} alt={t.common.partner} />
        <div className="spacer-20"></div>
      </section>

      {/*<!--courses-->*/}
        <section id="courses">
          <div className="spacer-20"></div>
          <div className="container mx-auto px-4">
            <ProgramsRoulette />
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
