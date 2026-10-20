import Link from "next/link";
import Image from "next/image";
import CampusCarousel from "@/components/Campus";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/rules/Tabs";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.rules.title,
  description: "",
};

export default function Rules(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/rules.jpg)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">{pages.rules.title}</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">{pages.rules.desc}</p>
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

      {/*<!--why-->*/}
      <section id="rules-regulations" className="">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">        
          

          <Tabs />
        

        </div>
 
        <div className="spacer-40"></div>
      </section>

   




    </div>



    
  );
}
