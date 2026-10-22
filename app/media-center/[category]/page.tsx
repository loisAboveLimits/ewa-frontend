import Link from "next/link";
import Image from "next/image";
import CampusCarousel from "@/components/Campus";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/media/CategoryTabs";
import NewsSection from "@/components/media/NewsSection";
import NewsList from "@/components/media/NewsList";
import { allNews } from "@/lib/newslist";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.media.title,
  description: pages.media.desc,
};

export default function MediaCenter(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-media-center.jpg)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">{pages.media.title}</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">{pages.media.desc}</p>
            </div>
          </div>

      </section>

      {/*<!--breadcrumps-->*/}
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
      <section id="latest-news" className="w-full min-h-125 bg-[url(/imgs/assets/news-bg.svg)] bg-size-[100%_auto] bg-no-repeat  bg-position-[center_-100px]">

        <div className="container mx-auto px-4">        

          
          <NewsSection />
          {/*<NewsSection featured={myFeatured} latest={myLatest} />*/}


        </div>
 
        
      </section>

       {/*<!--news-->*/}
      <section className="news">  
        <div className="spacer-40"></div>  

        <div className="container mx-auto px-4"> 
          {/*<NewsList items={allNews} />*/}
          <NewsList items={allNews} perPage={6} />           
        </div> 

        <div className="spacer-80"></div>  
       </section>
    

    </div>






    
  );
}
