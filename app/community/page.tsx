import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import MediaCarousel from "@/components/Media";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.why.title,
  description: "",
};

export default function Community(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-community.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">EWA Community</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">Harbored By Success</p>
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

      {/*<!--media center-->*/}
      <section id="media-center" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Media Center</h2>
            </div>
          </div>   
          

          <div className="spacer-40"></div>

          <MediaCarousel />

          <div className="spacer-40"></div> 

          <div className="md:col-span-2 flex justify-center">
            <Link
              href="/why/programs"
              className="btn btn-transparent fnt-orange remPad font-bold"
            >
              View More
              <Image src="/imgs/icons/icon-send-orange.png" alt="EWA" width={30} height={30} className="mar-left-5"/>
            </Link>
          </div>          

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
              <h2 className="font-bold title fnt-green">Success Stories<br />EWA & <font className="fnt-orange">Partners</font></h2>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>

        <div className="">
          <StoriesCarousel />
        </div>


         <div className="spacer-80"></div>
      </section>

      {/*<!--testimmonies-->*/}
      <section id="testimonies">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Testimonials<br /> of our <font className="fnt-orange">Sponsors</font> & Alumni</h2>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>

        <div className="flex items-center justify-center h-screen">
          <Image src="/imgs/logos/logo-circle-white.svg" alt="EWA" width={300} height={300} className="h-auto w-auto"/>
        </div>


         <div className="spacer-80"></div>
      </section>      



    </div>



    
  );
}
