import Breadcrumbs from "@/components/Breadcrumbs";
import FacilitySection from "@/components/facilities/FacilitySection";
import PageBanner from "@/components/ui/PageBanner";
import { getFacilities } from "@/lib/facilities";
import { getCampusFacilities } from "@/lib/campus";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("campus");

export default async function CampusFacilities() {
  const { locale, t } = await getI18n();
  // Drupal "Campus & Facilities" (ewa_content_api → /api/media/campus/{lang}), sorted by weight;
  // the built-in list is used when Drupal has none or can't be reached
  const drupal = await getCampusFacilities(locale);
  const facilities = drupal.length ? drupal : getFacilities(locale);

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="campus" image="/imgs/banners/banner-campus.jpg" title={t.pages.campus.title} subtitle={t.pages.campus.desc} />

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
           <div className="space-y-16 md:space-y-24 xl:space-y-32">
             {facilities.map((f, i) => (
               <FacilitySection
                 key={f.id}
                 id={f.id}
                 title={f.title}
                 images={f.images}
                 imageSide={i % 2 === 0 ? "left" : "right"}
                 priority={i === 0}
               >
                 {f.content}
               </FacilitySection>
             ))}
           </div>
        </div>

        <div className="spacer-80"></div>
      </section>

    </div>
  );
}
