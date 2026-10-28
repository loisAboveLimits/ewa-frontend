import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("programs");

/* Blank page template — copy this file to start a new page */
export default async function TestPage() {
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

      {/*<!--content-body-->*/}
      <section id="content-body">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
           {/*<!--content body start here-->*/}
        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
