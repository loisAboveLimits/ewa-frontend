import Link from "next/link";
import Image from "next/image";
import CampusCarousel from "@/components/Campus";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pages } from "@/lib/pages";

import FilterPrograms from "@/components/filter/Filter";
import ProgramsSlider from "@/components/filter/ProgramsSlider";

export const metadata: Metadata = {
  title: pages.programs.title,
  description: "",
};

export default function Home(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-programs.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">Our Programs</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">Building Skills, Creating Opportunities</p>
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
      <section id="programs" className="relative pb-[5%]">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">        
          
          <div className="flex flex-col md:flex-row">

            <div className="md:w-[30%] p-8 flex flex-col">

              <FilterPrograms />

            </div>

            <div className="md:w-[70%] p-8 flex flex-col">

              <ProgramsSlider />

            </div>


          </div>
        

        </div>
 
        <div className="spacer-40"></div>
      </section>

   




    </div>



    
  );
}
