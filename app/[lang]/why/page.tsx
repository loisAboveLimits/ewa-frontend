import Image from "next/image";
import CampusCarousel from "@/components/campus/Campus";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import LogoTicker from "@/components/ui/LogoTicker";
import ArrowLink from "@/components/ui/ArrowLink";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("why");

const featureIcons = ["grad-cap", "calendar", "dart"];

const glance = [
  { icon: "glance-grad", value: "84,000+", key: "graduates" },
  { icon: "glace-industry-part", value: "60+", key: "partners" },
  { icon: "glace-expert-inst", value: "120+", key: "instructors" },
  { icon: "glace-acc-progs", value: "25+", key: "programs" },
] as const;

function FeatureCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="box box-green p-6">
      <div className="flex flex-row items-center gap-4">
        <div className="w-[56px] shrink-0 sm:w-[20%]">
          <Image src={`/imgs/icons/${icon}.svg`} alt="" width={150} height={150} className="mx-auto h-auto w-full max-w-[64px]"/>
        </div>
        <div className="flex-1">
          <h4 className="text-[15px]! font-bold">{title}</h4>
          <p className="text-[14px]!">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default async function Why() {
  const { t } = await getI18n();
  const w = t.why;
  const [f1, f2, f3] = w.features;

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="why" image="/imgs/banners/banner-why.png" title={t.pages.why.title} subtitle={t.pages.why.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--why-->*/}
      <section id="why" className="relative lg:pb-[5%]">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex flex-col lg:flex-row">

            {/* START */}
            <div className="lg:w-1/3 py-4 lg:p-6 flex flex-col">

              <SectionTitle>{w.title}</SectionTitle>

              <div className="spacer-20"></div>

              <p className="text-base! fnt-green">{w.intro}</p>

              <div className="spacer-20"></div>

              <div className="flex justify-end">
                <ArrowLink href="/why/programs" color="orange" className="fnt-orange text-[18px]!">
                  {t.common.viewPrograms}
                </ArrowLink>
              </div>

            </div>

             {/* CENTER */}
            <div className="lg:w-1/3 py-4 lg:p-6 flex">
              <div className="box box-mixed p-8 bg-[url(/imgs/bgs/why-sec1.jpg)] bg-cover bg-center w-full flex min-h-[260px]"></div>
            </div>

            {/* END */}
            <div className="lg:w-1/3 py-4 lg:p-6 grid relative gap-[10px]">

                <FeatureCard icon={featureIcons[0]} title={f1.title} text={f1.text} />
                <FeatureCard icon={featureIcons[1]} title={f2.title} text={f2.text} />

                {/* third card overlaps the image column on large screens only */}
                <div className="lg:w-[150%] lg:absolute lg:end-0 lg:top-[90%] framed-10 lg:z-10">
                  <FeatureCard icon={featureIcons[2]} title={f3.title} text={f3.text} />
                </div>

            </div>

          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

      {/*<!--accreditation-->*/}
      <section id="accreditation">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <SectionTitle>{w.accreditationTitle}</SectionTitle>

          <div className="spacer-20"></div>

          <p className="fnt-green">{w.accreditationText}</p>

        </div>

        <div className="spacer-20"></div>

        {/*<LogoTicker logos={[13, 14, 15, 16, 17]} alt={t.common.partner} />*/}
        <LogoTicker nid={23}  alt={t.common.partner} />

        <div className="spacer-40"></div>
      </section>

      {/*<!--glance-->*/}
      <section id="glance">
        <div className="spacer-40"></div>

        <div className="bg-[url('/imgs/bgs/glance.jpg')] bg-cover bg-center w-full">

          <div className="flex flex-col md:flex-row md:min-h-[150px]">

            {/* START */}
            <div className="w-full md:w-[18%] lg:w-[15%]">
              <div className="glance-left p-6 md:p-8 min-h-[90px] md:min-h-[150px] h-full w-full flex flex-col justify-center">
                <h4 className="font-bold text-[22px] md:text-[25px] leading-tight">{w.glanceTitle}</h4>
              </div>
            </div>

            {/* CENTER */}
            <div className="w-full md:w-[64%] lg:w-[70%] flex items-center">
              <div className="container mx-auto px-4">
                 <div className="grid grid-cols-2 lg:grid-cols-4">
                    {glance.map((g) => (
                      <div key={g.key} className="p-3 lg:p-4">
                        <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start">
                          <Image src={`/imgs/icons/${g.icon}.svg`} alt="" width={150} height={150} className="h-auto w-12 shrink-0 lg:w-[25%]"/>
                          <div className="lg:px-3">
                            <h4 className="text-[22px]! md:text-[25px]! leading-tight ltr-text">{g.value}</h4>
                            <p className="text-[12px]!">{w.glance[g.key]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* END */}
            <div className="w-full md:w-[18%] lg:w-[15%]">
              <div className="glance-right p-6 md:p-8 min-h-[110px] md:min-h-[150px] h-full w-full flex flex-col justify-center items-center text-center">
                <p className="text-[28px]! md:text-[32px]! leading-tight ltr-text">4,130,814</p>
                <p className="text-[12px]! leading-tight">{w.glance.safeHours}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--campus-->*/}
      <section id="campus" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <SectionTitle>{w.campusTitle}</SectionTitle>

          <div className="spacer-20"></div>

            <div className="flex flex-col md:flex-row items-stretch">

              {/* START */}
              <div className="w-full md:w-1/2 py-4 md:p-8 flex flex-col gap-6 md:gap-10">

                {[
                  { bg: "campus-tech", label: w.campusCards.labs },
                  { bg: "campus-simulation", label: w.campusCards.simulation },
                  { bg: "campus-spaces", label: w.campusCards.spaces },
                ].map((card) => (
                  <div
                    key={card.bg}
                    className="box bg-cover bg-center w-full flex flex-col justify-end min-h-[160px] md:min-h-[180px] px-6 py-8 md:px-8 md:py-12"
                    style={{ backgroundImage: `url('/imgs/bgs/${card.bg}.png')` }}
                  >
                    <h3 className="font-bold sub-title mt-auto">{card.label}</h3>
                  </div>
                ))}

              </div>

              {/* END */}
              <div className="w-full md:w-1/2 py-4 md:p-8 flex flex-col gap-6 md:gap-10">

                <div className="flex-1 min-h-[220px]">
                  <CampusCarousel />
                </div>

                <div className="box box-orange p-6 md:p-8">
                  <h2 className="font-bold title text-[24px]! md:text-[27px]!">{w.handsOnTitle}</h2>

                  <div className="spacer-10"></div>

                  <p className="text-[16px]! md:text-[18px]!">{w.handsOnText}</p>
                </div>

              </div>

            </div>

          </div>

          <Image src="/imgs/logos/logo-circle-white.svg" alt="" aria-hidden width={150} height={150} className="hidden md:block w-[110px] lg:w-[150px] h-auto absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]"/>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
