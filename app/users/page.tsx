import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import ArrowLink from "@/components/ui/ArrowLink";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("users");

/* One entry per portal — replace with the real systems + links */
const portals = Array.from({ length: 8 }, (_, i) => ({ id: i, href: "#" }));

export default async function Users() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-users.png" title={t.pages.users.title} subtitle={t.pages.users.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--portals-->*/}
      <section className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {portals.map((portal) => (
              <div key={portal.id} className="box box-user flex flex-col p-6 md:p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

                <div className="flex flex-row items-center gap-4">
                  <div className="w-14 shrink-0 md:w-[20%]">
                    <Image src="/imgs/icons/grad-cap.svg" alt="" width={150} height={150} className="mx-auto h-auto max-w-full"/>
                  </div>

                  <div className="flex-1 md:px-4">
                    <h4 className="text-[20px]! md:text-[24px]! font-bold fnt-orange">{t.users.cardTitle}</h4>
                    <p className="text-[16px]! md:text-[18px]! fnt-orange">{t.users.cardText}</p>
                  </div>
                </div>

                <div className="spacer-20"></div>

                <div className="flex justify-end mt-auto">
                  <ArrowLink href={portal.href} className="fnt-orange">{t.common.visitPortal}</ArrowLink>
                </div>

              </div>
            ))}
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
