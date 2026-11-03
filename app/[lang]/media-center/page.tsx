import DrupalStories from "@/components/stories/DrupalStories";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/media/CategoryTabs";
import GalleryTicker from "@/components/media/GalleryTicker";
import GraduateCarousel from "@/components/media/Graduate";
import NewsSection from "@/components/media/NewsSection";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { getMediaSection } from "@/lib/mediaPosts";
import { MAX_SLIDER_POSTS } from "@/lib/news";
import { getMediaCenterImages } from "@/lib/mediaCenterImages";

export const generateMetadata = () => pageMetadata("media");

export default async function MediaCenter() {
  const { locale, t } = await getI18n();

  // "All" tab: featured + latest across every category (built-in demo content if Drupal is down)
  const [featured, latest, galleryRows] = await Promise.all([
    getMediaSection("featured", "all", locale, MAX_SLIDER_POSTS),
    getMediaSection("latest", "all", locale),
    // every Media Center image (post images + gallery photos); null → the ticker's built-in photos
    getMediaCenterImages(locale),
  ]);
  const fromDrupal = featured !== null || latest !== null;

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="media" image="/imgs/banners/banner-media-center.jpg" title={t.pages.media.title} subtitle={t.pages.media.desc} />

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
           <NewsSection
             featured={fromDrupal ? featured ?? [] : undefined}
             latest={fromDrupal ? latest ?? [] : undefined}
           />
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

        {/* main images of the Success Stories posts (term 3), each linking to its story */}
        <DrupalStories />

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
        <GalleryTicker speed={30} rows={galleryRows ?? undefined} />

         <div className="spacer-80"></div>
      </section>

    </div>
  );
}
