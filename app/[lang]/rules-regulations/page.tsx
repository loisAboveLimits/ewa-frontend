import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/rules/Tabs";
import PageBanner from "@/components/ui/PageBanner";
import { getPolicyTabs } from "@/lib/rules";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("rules");

export default async function Rules() {
  const { locale, t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="rules" image="/imgs/banners/rules.jpg" title={t.pages.rules.title} subtitle={t.pages.rules.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--rules-->*/}
      <section id="rules-regulations">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          <Tabs tabs={getPolicyTabs(locale)} />
        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
