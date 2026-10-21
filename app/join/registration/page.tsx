import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CampusCarousel from "@/components/Campus";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.registration.title,
  description: pages.registration.desc,
};

export default function Home(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-programs.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">{pages.registration.title}</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">{pages.registration.desc}</p>
            </div>
          </div>

      </section>

      {/*<!--breadcrumps-->*/}
      {/*<section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>*/}

      {/*<!--content-body-->*/}
      <section id="content-body" className="relative -top-15">


        <div className="container mx-auto px-4">


           {/*<!--content body start here-->*/}
           <RegistrationForm signInHref="/login" homeHref="/" />


        </div>

        <div className="spacer-40"></div>
      </section>






    </div>




  );
}
