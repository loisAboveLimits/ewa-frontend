import Breadcrumbs from "@/components/Breadcrumbs";
import AwardsHistory from "@/components/awards/AwardsHistory";
import SmoothScroll from "@/components/awards/SmoothScroll";
import PageBanner from "@/components/ui/PageBanner";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("awards");

export default async function Awards() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-programs.png" title={t.pages.awards.title} subtitle={t.pages.awards.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--awards-->*/}
      <section id="awards">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          <SmoothScroll>
            <AwardsHistory />
          </SmoothScroll>
        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
