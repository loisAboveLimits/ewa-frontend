import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import FilterPrograms from "@/components/filter/Filter";
import ProgramsSlider from "@/components/filter/ProgramsSlider";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("programs");

export default async function Programs() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-programs.png" title={t.pages.programs.title} subtitle={t.pages.programs.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--programs-->*/}
      <section id="programs" className="relative pb-[5%]">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">

            {/* slider first on phones so the programs are visible straight away */}
            <div className="order-2 lg:order-1 lg:w-[30%] lg:p-8 flex flex-col">
              <FilterPrograms />
            </div>

            <div className="order-1 lg:order-2 lg:w-[70%] lg:p-8 flex flex-col min-w-0">
              <ProgramsSlider />
            </div>

          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
