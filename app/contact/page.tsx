import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import ContactForm from "@/components/Contact";

export default function Home(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-contact.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">Contact EWA</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">Always Stay Connected</p>
            </div>
          </div>

      </section>

      {/*<!--section-->*/}
      <section id="" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Contact Us<br /><font className="fnt-orange">Stay Connected</font></h2>
            </div>
          </div>

           <div className="spacer-40"></div>
          
          <div className="contactus-form">

            <ContactForm />
           
          </div>

           <div className="spacer-40"></div>

           <div className="w-full max-w-4xl mx-auto">
             <div className="flex sm:flex-row md:flex-row">

              <div className="md:w-[33.33%]">
                <p className="fnt-green !text-4xl"><i className="fa-brands fa-square-whatsapp"></i></p>
                <p className="text-black font-bold">Via WhatsApp</p>
                <p className="text-black">+966 123 456 7890</p>
              </div>

              <div className="md:w-[33.33%]">
                <p className="fnt-green !text-4xl"><i className="fa-solid fa-envelope"></i></p>
                <p className="text-black font-bold">Email</p>
                <p className="text-black">info@ewa.sa</p>
              </div>

              <div className="md:w-[33.33%]">
                <p className="fnt-green !text-4xl"><i className="fa-solid fa-location-dot"></i></p>
                <p className="text-black font-bold">Address</p>
                <p className="text-black">Kingdom of Saudi Arabia - Rabigh</p>
              </div>                           
            </div>
           </div>


        </div>
 

        <div className="spacer-80"></div>
      </section>



    </div>



    
  );
}
