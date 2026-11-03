import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/media/CategoryTabs";
import NewsSection from "@/components/media/NewsSection";
import NewsList from "@/components/media/NewsList";
import PageBanner from "@/components/ui/PageBanner";
import { getAllNews } from "@/lib/newslist";
import { buildPages, type PageKey } from "@/lib/pages";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { assetBg } from "@/lib/assets";
import { getMediaSection } from "@/lib/mediaPosts";
import { MAX_SLIDER_POSTS } from "@/lib/news";

type Props = { params: Promise<{ category: string }> };

/** Translated title of the current category (falls back to "Media Center") */
async function categoryPage(category: string) {
  const { locale, t } = await getI18n();
  const pages = buildPages(t.pages);
  const key = (Object.keys(pages) as PageKey[]).find((k) => pages[k].path === `/media-center/${category}`) ?? "media";
  return { locale, t, key, page: pages[key] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key, page } = await categoryPage((await params).category);
  // Drupal main title / sub title of this category's page, else the dictionary text
  const meta = await pageMetadata(key);
  return { title: meta.title ?? page.title, description: meta.description ?? page.desc };
}

export default async function MediaCategory({ params }: Props) {
  const { category } = await params;
  const { locale, key, page } = await categoryPage(category);

  // the 3 sections from Drupal (ewa_content_api), in the visitor's language:
  // 1 featured (slider, up to 5) · 2 upcoming (events) / latest · 3 all — Events dated by their Date field,
  // other categories by publishing date. null everywhere = Drupal unreachable → built-in demo content
  const [featured, latest, all] = await Promise.all([
    getMediaSection("featured", category, locale, MAX_SLIDER_POSTS),
    getMediaSection("latest", category, locale),
    getMediaSection("posts", category, locale),
  ]);
  const fromDrupal = featured !== null || latest !== null || all !== null;

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page={key} image="/imgs/banners/banner-media-center.jpg" title={page.title} subtitle={page.desc} />

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
      <section
        id="latest-news"
        className="w-full min-h-125 bg-size-[100%_auto] bg-no-repeat bg-position-[center_-100px]"
        style={{ backgroundImage: assetBg("news-bg.svg", locale) }}
      >
        <div className="container mx-auto px-4">
          {/* section 1 (featured slider) + section 2 (upcoming / latest) */}
          <NewsSection
            featured={fromDrupal ? featured ?? [] : undefined}
            latest={fromDrupal ? latest ?? [] : undefined}
          />
        </div>
      </section>

       {/*<!--news-->*/}
      <section className="news">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          {/* section 3: all posts */}
          <NewsList items={fromDrupal ? all ?? [] : getAllNews(locale)} perPage={6} />
        </div>

        <div className="spacer-80"></div>
       </section>

    </div>
  );
}
