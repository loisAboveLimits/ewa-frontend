import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import CareersCarousel from "@/components/Careers";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.join.title,
  description: pages.join.desc,
};

export default function Join(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-join.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">{pages.join.title}</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">{pages.join.desc}</p>
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

      {/*<!--section-->*/}
      <section id="trainee" className="">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Become a Trainee</h2>
            </div>
          </div> 

          <div className="spacer-20"></div>  
          
          <div className="box box-orange p-12 w-full bg-bottom-right bg-no-repeat" style={{backgroundImage: "url('/imgs/assets/footer-bg.png')",}}>

            <div className="flex sm:flex-row md:flex-row justify-center">

              <div className="md:w-[70%]">
                <h2 className="font-bold text-[35px]">Why Join EWA</h2>
                <div className="spacer-20"></div>

                <p className="">EWA is designed in collaboration with industry leaders to ensure you gain the skills and knowledge needed for today's challenges and tomorrow's opportunities.</p>
              </div>
            
              <div className="md:w-[30%]">
                
              </div>
            </div> 

          </div>        
          


        </div>
 

        <div className="spacer-40"></div>
      </section>

      {/*<!--requirements-->*/}
      <section id="requirements" className="">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">


          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center"></div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Requirements</h2>
            </div>
          </div> 

          <div className="spacer-40"></div>            

            <div className="flex sm:flex-row md:flex-row justify-center items-start">

              <div className="md:w-[16.66%] text-center"></div>

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/ksa.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Saudi Citizen</p>
              </div>

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/grad-cap-big.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">75% +<br />High School</p>
              </div>  

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/vision-big.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Under 24<br />Years Old</p>
              </div> 

              <div className="md:w-[16.66%] text-center">
                <Link href="" className="">
                  <center>
                    <Image src="/imgs/icons/plus.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                  </center>
                  <p className="fnt-green font-bold">More</p>
                </Link>
              </div> 

              <div className="md:w-[16.66%] text-center"> </div>                                         

            </div>          

        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--requirements-->*/}
      <section id="requirements" className="">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Careers</h2>
            </div>
          </div> 

          <div className="spacer-40"></div> 

          <CareersCarousel />

          <div className="spacer-80"></div>
        </div>

        <div className="spacer-40"></div>
      </section>


    </div>



    
  );
}
