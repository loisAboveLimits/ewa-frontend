import Link from "@/components/i18n/Link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import CareersCarousel from "@/components/Careers";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("join");

export default async function Join() {
  const { t } = await getI18n();
  const j = t.join;

  const requirements = [
    { icon: "ksa", label: <>{j.requirements.citizen}</> },
    { icon: "grad-cap-big", label: <><span className="ltr-text">{j.requirements.highSchoolA}</span><br />{j.requirements.highSchoolB}</> },
    { icon: "vision-big", label: <>{j.requirements.ageA}<br />{j.requirements.ageB}</> },
  ];

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-join.png" title={t.pages.join.title} subtitle={t.pages.join.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--trainee-->*/}
      <section id="trainee">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <SectionTitle>{j.traineeTitle}</SectionTitle>

          <div className="spacer-20"></div>

          <div
            className="box box-orange p-6 sm:p-10 md:p-12 w-full bg-bottom-right rtl:bg-bottom-left bg-no-repeat"
            style={{ backgroundImage: "url('/imgs/assets/footer-bg.png')" }}
          >
            <div className="md:w-[70%]">
              <h2 className="font-bold text-[28px] md:text-[35px]">{j.whyJoinTitle}</h2>
              <div className="spacer-20"></div>
              <p>{j.whyJoinText}</p>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

      {/*<!--requirements-->*/}
      <section id="requirements">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <h2 className="font-bold title fnt-green">{j.requirementsTitle}</h2>

          <div className="spacer-40"></div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 items-start gap-6 md:grid-cols-4">
            {requirements.map((r) => (
              <div key={r.icon} className="text-center">
                <Image src={`/imgs/icons/${r.icon}.svg`} alt="" width={150} height={150} className="mx-auto h-auto w-24 md:w-auto"/>
                <p className="fnt-green font-bold">{r.label}</p>
              </div>
            ))}

            <Link href="#" className="text-center">
              <Image src="/imgs/icons/plus.svg" alt="" width={150} height={150} className="mx-auto h-auto w-24 md:w-auto"/>
              <p className="fnt-green font-bold">{t.common.more}</p>
            </Link>
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--careers-->*/}
      <section id="careers">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <SectionTitle>{j.careersTitle}</SectionTitle>

          <div className="spacer-40"></div>

          <CareersCarousel />

          <div className="spacer-80"></div>
        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
