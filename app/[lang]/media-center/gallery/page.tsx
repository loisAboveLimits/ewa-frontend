import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/media/CategoryTabs";
import MasonryGallery from "@/components/media/MasonryGallery";
import PageBanner from "@/components/ui/PageBanner";
import { buildPages } from "@/lib/pages";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { getMediaCenterImageList } from "@/lib/mediaCenterImages";

// /media-center/gallery has its own page (this folder wins over [category]):
// every Media Center photo — post main images + gallery images — in a masonry grid.

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  const page = buildPages(t.pages).gallery;
  // Drupal main title / sub title of the page, else the dictionary text
  const meta = await pageMetadata("gallery");
  return { title: meta.title ?? page.title, description: meta.description ?? page.desc };
}

export default async function MediaGallery() {
  const { locale, t } = await getI18n();
  const page = buildPages(t.pages).gallery;

  // null → Drupal unreachable / no images → the built-in photos
  const images = await getMediaCenterImageList(locale);

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="gallery" image="/imgs/banners/banner-media-center.jpg" title={page.title} subtitle={page.desc} />

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

      {/*<!--gallery-->*/}
      <section id="gallery">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          {/* 20 photos, then "View More" adds the next 20 underneath */}
          <MasonryGallery images={images} pageSize={20} />
        </div>

        <div className="spacer-80"></div>
      </section>

    </div>
  );
}
