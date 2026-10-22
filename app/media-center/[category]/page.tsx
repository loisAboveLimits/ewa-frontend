import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/media/CategoryTabs";
import NewsSection from "@/components/media/NewsSection";
import NewsList from "@/components/media/NewsList";
import PageBanner from "@/components/ui/PageBanner";
import { getAllNews } from "@/lib/newslist";
import { buildPages } from "@/lib/pages";
import { getI18n } from "@/lib/i18n/server";

type Props = { params: Promise<{ category: string }> };

/** Translated title of the current category (falls back to "Media Center") */
async function categoryPage(category: string) {
  const { locale, t } = await getI18n();
  const pages = buildPages(t.pages);
  const page = Object.values(pages).find((p) => p.path === `/media-center/${category}`) ?? pages.media;
  return { locale, t, page };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await categoryPage((await params).category);
  return { title: page.title, description: page.desc };
}

export default async function MediaCategory({ params }: Props) {
  const { category } = await params;
  const { locale, page } = await categoryPage(category);

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-media-center.jpg" title={page.title} subtitle={page.desc} />

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

      {/*<!--latest-news-->*/}
      <section id="latest-news" className="w-full min-h-125 bg-[url(/imgs/assets/news-bg.svg)] bg-size-[100%_auto] bg-no-repeat bg-position-[center_-100px]">
        <div className="container mx-auto px-4">
          <NewsSection />
        </div>
      </section>

       {/*<!--news-->*/}
      <section className="news">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          <NewsList items={getAllNews(locale)} perPage={6} />
        </div>

        <div className="spacer-80"></div>
       </section>

    </div>
  );
}
