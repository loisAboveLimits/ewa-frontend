import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-about.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">About EWA</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">Shaping Tomorrow’s Workforce</p>
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

      {/*<!--about-->*/}
      <section id="about" className="relative pb-[15%]">

        <div className="spacer-20"></div>

        <div className="container mx-auto px-4 relative">

          <div className="flex sm:flex-row md:flex-row">

            <div className="md:w-[50%] p-8">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="sm:w-[5%] text-center">
                  <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </div>
              
                <div className="sm:w-[95%]">
                  <h2 className="font-bold title fnt-green">About EWA</h2>
                </div>
              </div>       
              
              <div className="spacer-20"></div>  

              <p className="fnt-green text-base! text-justify">The Energy and Water Academy (EWA) was established by ACWA Power under a Strategic Partnership Agreement signed with Technical and Vocational Training Corporation (TVTC) under Council of Ministers Resolution No. 17 dated January 12, 2009. The academy is registered with TVTC to operate as a non-profit organization located in the industrial city of Rabigh, Kingdom of Saudi Arabia that specializes in international standards training for the water and energy industrial sectors. It is one of the strategic partnership institutions in the Kingdom, with accredited programs recognized by the Colleges of Excellence and supported by the Human Resources Development Fund (HRDF).</p>   

              <div className="spacer-20"></div>  

              <div className="box box-orange px-8 py-12">

                <div className="flex sm:flex-row md:flex-row justify-center items-center">

                  <div className="md:w-[20%] text-center">
                    <Image src="/imgs/icons/vision.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                  </div>

                  <div className="md:w-[80%]">
                    <h4 className="text-2xl! font-bold">Our Vision</h4>
                    <p>To be pioneers in developing skilled talents in the energy, water, and industrial sectors.</p>
                  </div>                  

                </div>

              </div>

              <div className="spacer-20"></div> 

            </div>

            <div className="md:w-[50%] p-8">
              <div className="box bg-[url(/imgs/bgs/about-sec1.jpg)] bg-cover bg-center min-h-[110%]"></div>
            </div>            

          </div>

          <div className="mission-div absolute top-[93%] w-[60%] framed">

            <div className="box box-orange px-8 py-12">
              
                <div className="flex sm:flex-row md:flex-row justify-center items-center">

                  <div className="md:w-[15%] text-center">
                    <Image src="/imgs/icons/mission.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                  </div>

                  <div className="md:w-[85%]">
                    <h4 className="text-2xl! font-bold">Our Mission</h4>
                    <p>To improve the teaching and learning environment through innovative, multimedia-based vocational and technical programs that meet labor market needs, enabling a competitive and creative workforce.</p>
                  </div>                  

                </div>

            </div>          
          </div>          

        </div>

        <div className="spacer-40"></div>
      </section>

       {/*<!--values-->*/}
      <section id="values" className="">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

            <div className="flex sm:flex-row md:flex-row justify-center items-center">

              <div className="sm:w-[5%] text-center">
                <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
              </div>
            
              <div className="sm:w-[95%]">
                <h2 className="font-bold title fnt-green">Our Values</h2>
              </div>
            </div> 

            <div className="spacer-40"></div>

            <div className="flex sm:flex-row md:flex-row justify-center items-center">

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/excellence.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Excellence</p>
              </div>

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/integrity.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Integrity</p>
              </div>

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/collaboration.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Collaboration</p>
              </div>  

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/impact.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Impact</p>
              </div> 

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/safe-ethics.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Safe Ethics</p>
              </div> 

              <div className="md:w-[16.66%] text-center">
                <center>
                  <Image src="/imgs/icons/professionalism.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </center>
                <p className="fnt-green font-bold">Professionalism</p>
              </div>                                         

            </div>

        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--team-->*/}
      <section id="team" className="">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Our Team</h2>
            </div>
          </div>           

        </div>

        <div className="spacer-40"></div>
      </section>

    </div>



    
  );
}
