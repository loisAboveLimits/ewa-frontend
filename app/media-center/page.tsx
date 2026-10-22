import StoriesCarousel from "@/components/stories/Stories";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/media/CategoryTabs";
import GalleryTicker from "@/components/media/GalleryTicker";
import GraduateCarousel from "@/components/media/Graduate";
import NewsSection from "@/components/media/NewsSection";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("media");

export default async function MediaCenter() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-media-center.jpg" title={t.pages.media.title} subtitle={t.pages.media.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--media center navigation-->*/}
      <div className="media-nav">
        <CategoryTabs />
      </div>

      {/*<!--latest-->*/}
      <section id="content-body">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
           <NewsSection />
        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--stories-->*/}
      <section id="stories">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">
          <SectionTitle>{t.media.storiesTitle}</SectionTitle>
        </div>

        <div className="spacer-40"></div>

        <StoriesCarousel />

         <div className="spacer-40"></div>
      </section>


      {/*<!--graduate-->*/}
      <section id="graduate">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">
          <SectionTitle>{t.media.graduateTitle}</SectionTitle>
        </div>

        <div className="spacer-40"></div>

        <GraduateCarousel />

         <div className="spacer-80"></div>
      </section>

      {/*<!--gallery-->*/}
      <section id="gallery">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">
          <SectionTitle>{t.media.galleryTitle}</SectionTitle>
        </div>

        <div className="spacer-40"></div>

        {/* speed = pixels per second */}
        <GalleryTicker speed={60} />

         <div className="spacer-80"></div>
      </section>

    </div>
  );
}
