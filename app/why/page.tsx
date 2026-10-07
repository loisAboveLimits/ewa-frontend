import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import ContactForm from "@/components/Contact";

export default function Home(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-why.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">WHY EWA</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">More Than Just An Academy</p>
            </div>
          </div>

      </section>

      {/*<!--section-->*/}
      <section id="" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          


        </div>
 

        <div className="spacer-40"></div>
      </section>



    </div>



    
  );
}
