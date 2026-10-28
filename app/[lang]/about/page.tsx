import Image from "next/image";
import DirectorsCarousel from "@/components/directors/Directors";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import LogoTicker from "@/components/ui/LogoTicker";
import ArrowLink from "@/components/ui/ArrowLink";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("about");

const values = [
  { key: "excellence", icon: "excellence" },
  { key: "integrity", icon: "integrity" },
  { key: "collaboration", icon: "collaboration" },
  { key: "impact", icon: "impact" },
  { key: "safeEthics", icon: "safe-ethics" },
  { key: "professionalism", icon: "professionalism" },
] as const;

export default async function About() {
  const { t } = await getI18n();
  const a = t.about;

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="about" image="/imgs/banners/banner-about.png" title={t.pages.about.title} subtitle={t.pages.about.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--about-->*/}
      <section id="about" className="relative lg:pb-[15%]">

        <div className="spacer-20"></div>

        <div className="container mx-auto px-4 relative">

          <div className="flex flex-col md:flex-row">

            <div className="md:w-1/2 py-4 md:p-8">

              <SectionTitle>{a.title}</SectionTitle>

              <div className="spacer-20"></div>

              <p className="fnt-green text-base!">{a.intro}</p>

              <div className="spacer-20"></div>

              <div className="box box-orange px-6 py-8 md:px-8 md:py-12">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
                  <div className="sm:w-[20%] shrink-0">
                    <Image src="/imgs/icons/vision.svg" alt="" width={150} height={150} className="mx-auto h-auto w-16 sm:w-auto"/>
                  </div>
                  <div className="sm:w-[80%]">
                    <h4 className="text-2xl! font-bold">{a.visionTitle}</h4>
                    <p>{a.vision}</p>
                  </div>
                </div>
              </div>

              <div className="spacer-20"></div>

            </div>

            <div className="md:w-1/2 py-4 md:p-8">
              <div className="box bg-[url(/imgs/bgs/about-sec1.jpg)] bg-cover bg-center h-full min-h-[260px] md:min-h-[110%]"></div>
            </div>

          </div>

          {/* Mission: floats over the next section on large screens, stacks on smaller ones */}
          <div className="mission-div mt-4 lg:mt-0 lg:absolute lg:top-[93%] lg:w-[60%] framed">

            <div className="box box-orange px-6 py-8 md:px-8 md:py-12">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
                  <div className="sm:w-[15%] shrink-0">
                    <Image src="/imgs/icons/mission.svg" alt="" width={150} height={150} className="mx-auto h-auto w-16 sm:w-auto"/>
                  </div>
                  <div className="sm:w-[85%]">
                    <h4 className="text-2xl! font-bold">{a.missionTitle}</h4>
                    <p>{a.mission}</p>
                  </div>
                </div>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

       {/*<!--values-->*/}
      <section id="values">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

            <SectionTitle>{a.valuesTitle}</SectionTitle>

            <div className="spacer-40"></div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {values.map((v) => (
                <div key={v.key} className="text-center">
                  <Image src={`/imgs/icons/${v.icon}.svg`} alt="" width={150} height={150} className="mx-auto h-auto w-24 md:w-auto"/>
                  <p className="fnt-green font-bold">{a.values[v.key]}</p>
                </div>
              ))}
            </div>

        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--team-->*/}
      <section id="chairman" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <SectionTitle>{a.teamTitle}</SectionTitle>

          <div className="spacer-20"></div>

          <div className="flex flex-col md:flex-row items-stretch gap-6">

            {/* Start column */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-0">

              <Image
                src="/imgs/others/cm-msg.jpg"
                alt={a.chairmanAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover box"
              />

              <div className="absolute top-[15%] start-[5%] z-10">
                <h4 className="font-bold text-[30px] md:text-[40px] text-white leading-none">
                  {a.chairmanA}<br />{a.chairmanB}
                </h4>
              </div>

            </div>

            {/* End column */}
            <div className="w-full md:w-1/2">

              <div className="box box-green px-6 py-10 md:px-8 md:py-12 h-full flex flex-col">

                <h4 className="font-bold text-white text-[24px] md:text-[30px]">{a.chairmanHeading}</h4>

                <div className="spacer-20"></div>

                <p>{a.chairmanText}</p>

                <div className="spacer-20"></div>

                <div className="flex justify-end mt-auto">
                  <ArrowLink href="#">{t.common.readMore}</ArrowLink>
                </div>

              </div>
            </div>

          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

      {/*<!--directors-->*/}
      <section id="directors" className="relative">
        <div className="spacer-40"></div>

        <h2 className="text-center font-bold fnt-orange text-[28px] md:text-[35px]">{a.boardTitle}</h2>

        <div className="spacer-40"></div>

        <DirectorsCarousel />

        <div className="spacer-80"></div>
      </section>


      {/*<!--timeline-->*/}
      <section id="timeline">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <SectionTitle>{a.timelineTitle}</SectionTitle>

          <div className="text-center">
            <p className="font-thin fnt-green text-[20px]! md:text-[28px]! px-2 py-8 md:p-8">{a.timelineText}</p>

            <div className="flex justify-center">
              <ArrowLink href="#" color="orange" className="fnt-orange text-[22px]! md:text-[25px]!">
                {t.common.download}
              </ArrowLink>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--sponsors-->*/}
      <section id="sponsors">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          <SectionTitle>{a.sponsorsTitle}</SectionTitle>
        </div>

        <div className="spacer-20"></div>

        {/* all 12 partner logos in one ticker: right → left in English, left → right in Arabic */}
        <LogoTicker logos={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} alt={t.common.partner} />

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
