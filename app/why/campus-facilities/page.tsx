import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import Facilities from "@/components/campus/Facilities";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.campus.title,
  description: pages.campus.desc,
};

export default function Home(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-campus.jpg)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">{pages.campus.title}</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">{pages.campus.desc}</p>
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
      <section id="programs" className="">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">        
          

          <Facilities />
        

        </div>
 
        <div className="spacer-40"></div>
      </section>

   




    </div>



    
  );
}
