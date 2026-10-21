import Link from "next/link";
import Image from "next/image";
import CampusCarousel from "@/components/Campus";
import StoriesCarousel from "@/components/stories/Stories";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTabs from "@/components/media/CategoryTabs";
import GalleryTicker from "@/components/media/GalleryTicker";
import GraduateCarousel from "@/components/media/Graduate";
import NewsSection from "@/components/media/NewsSection";
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

      {/*<!--latest-->*/}
      <section id="content-body" className="">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">        

           <NewsSection />
          {/*<NewsSection featured={myFeatured} latest={myLatest} />*/}

        </div>
 
        <div className="spacer-40"></div>
      </section>


      {/*<!--stories-->*/}
      <section id="stories">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Success Stories</h2>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>

        <div className="">
          <StoriesCarousel />
        </div>


         <div className="spacer-40"></div>
      </section>


      {/*<!--graduate-->*/}
      <section id="graduate">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Graduate Stories</h2>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>

        <div className="">
          <GraduateCarousel />
        </div>


         <div className="spacer-80"></div>
      </section>

      {/*<!--gallery-->*/}
      <section id="gallery">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Gallery</h2>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>

        <div className="">

          <GalleryTicker speed={60} />  // slower (pixels per second)          
         
        </div>


         <div className="spacer-80"></div>
      </section>

   




    </div>



    
  );
}
