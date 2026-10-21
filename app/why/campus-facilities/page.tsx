import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CampusCarousel from "@/components/Campus";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import FacilitySection from "@/components/facilities/FacilitySection";
import { facilities } from "@/lib/facilities";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.campus.title,
  description: pages.campus.desc,
};

export default function CampusFacilities(){

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

      {/*<!--content-body-->*/}
      <section id="content-body" className="">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">


           {/*<!--content body start here-->*/}
           <div className="space-y-16 md:space-y-24 xl:space-y-32">
             {facilities.map((f, i) => (
               <FacilitySection
                 key={f.id}
                 id={f.id}
                 title={f.title}
                 images={f.images}
                 imageSide={i % 2 === 0 ? "left" : "right"}
                 priority={i === 0}
               >
                 {f.content}
               </FacilitySection>
             ))}
           </div>


        </div>

        <div className="spacer-80"></div>
      </section>






    </div>




  );
}
