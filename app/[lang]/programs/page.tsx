import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import ProgramsBrowser from "@/components/filter/ProgramsBrowser";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("programs");

export default async function Programs() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="programs" image="/imgs/banners/banner-programs.png" title={t.pages.programs.title} subtitle={t.pages.programs.desc} />

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

          {/* search, filter (collapsible on small screens) and the programs slider */}
          <ProgramsBrowser />

        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
