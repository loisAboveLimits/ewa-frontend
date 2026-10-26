import Image from "next/image";
import StoriesCarousel from "@/components/stories/Stories";
import ContactForm from "@/components/Contact";
import Testimonials from "@/components/orbit/Testimonials";
import { getOrbitActions, getTeam } from "@/components/orbit/team";
import ProgramsRoulette from "@/components/roulette/ProgramsRoulette";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import LogoStrip from "@/components/ui/LogoStrip";
import ArrowLink from "@/components/ui/ArrowLink";
import { getI18n } from "@/lib/i18n/server";

import { getPage, absoluteUrl } from "@/lib/drupal";

export default async function Home({ params }:{ params: Promise<{ nid: string }> }) {
  const { locale, t } = await getI18n();
  const s = t.sections;

  const { nid } = await params;
  const page = await getPage(1);
  if (!page) notFound();  

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner
        image={absoluteUrl(page.banner)}
        align="center"
        titleClassName="fnt-orange"
        title={<>{t.home.bannerLine1}<br />{t.home.bannerLine2}</>}
      />

      {/*<!--about-->*/}
      <section id="about" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row items-stretch">

          {/* START column (left in English, right in Arabic) */}
          <div className="md:w-1/2 p-2 py-4 sm:p-6 lg:p-8 flex flex-col">

            <div className="box box-green px-6 py-10 md:px-8 md:py-12">
              <h3 className="font-bold sub-title">{t.home.aboutKicker}</h3>
              <h2 className="font-bold title">{t.home.aboutTitle}</h2>

              <div className="spacer-40"></div>

              <p className="text-justify">{t.home.aboutText}</p>

              <div className="spacer-40"></div>

              <div className="flex justify-start">
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
                <ArrowLink href="/contact" color="orange" className="ms-auto">{t.common.sendRequest}</ArrowLink>
              </div>
            </div>

          </div>

          {/* END column */}
          <div className="md:w-1/2 p-2 py-4 sm:p-6 lg:p-8 flex">

            <div className="box box-mixed p-8 bg-[url(/imgs/bgs/home-about-bg.jpg)] bg-cover bg-center w-full flex min-h-[320px]">

              <div className="flex flex-row w-full gap-4">

                <div className="w-1/2 prog">
                  <div className="flex flex-col justify-end h-full text-center">
                    <p className="counter">20</p>
                    <p>{t.home.diplomaPrograms}</p>
                  </div>
                </div>

                <div className="w-1/2 prog">
                  <div className="flex flex-col justify-end h-full text-center">
                    <p className="counter">70</p>
                    <p>{t.home.sponsorshipPartners}</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        </div>

        {/* centre emblem — only where the two columns sit side by side */}
        <Image src="/imgs/logos/logo-circle-white.svg" alt="" aria-hidden width={150} height={150} className="hidden md:block w-[110px] lg:w-[150px] h-auto absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2"/>

        <div className="spacer-40"></div>
      </section>

      {/*<!--partners-->*/}
      <section id="partners">
        <div className="spacer-20"></div>
        <LogoStrip logos={[1, 2, 3, 4, 5, 6]} alt={t.common.partner} />
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
