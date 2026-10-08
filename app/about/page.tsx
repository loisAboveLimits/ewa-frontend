import Link from "next/link";
import Image from "next/image";
import DirectorsCarousel from "@/components/Directors";
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

              <p className="fnt-green text-base!">The Energy and Water Academy (EWA) was established by ACWA Power under a Strategic Partnership Agreement signed with Technical and Vocational Training Corporation (TVTC) under Council of Ministers Resolution No. 17 dated January 12, 2009. The academy is registered with TVTC to operate as a non-profit organization located in the industrial city of Rabigh, Kingdom of Saudi Arabia that specializes in international standards training for the water and energy industrial sectors. It is one of the strategic partnership institutions in the Kingdom, with accredited programs recognized by the Colleges of Excellence and supported by the Human Resources Development Fund (HRDF).</p>   

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
      <section id="chairman" className="relative">

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

          <div className="spacer-20"></div>

          <div className="flex flex-col md:flex-row items-stretch gap-6">

            {/* Left Column */}
            <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-0">

              <Image
                src="/imgs/others/cm-msg.jpg"
                alt="Chairman"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover box"
              />

              <div className="absolute top-[15%] left-[5%] z-10">
                <h4 className="font-bold text-[40px] text-white leading-none">
                  Chairman<br />Message
                </h4>
              </div>

            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2">

              <div className="box box-green px-8 py-12 h-full flex flex-col">

                <h4 className="font-bold text-white text-[30px]">
                  Welcome to our learning, teaching, and training programs.
                </h4>

                <div className="spacer-20"></div>

                <p className="text-justify">
                  It is a pleasure and an honor to address you on behalf
                  of The Energy and Water Academy (EWA).
                  I strongly believe that there can be no…
                </p>

                <div className="spacer-20"></div>

                <div className="flex justify-end mt-auto">
                  <Link href="" className="btn btn-transparent font-bold remPad">
                    Read More
                    <Image
                      src="/imgs/icons/icon-send-green.png"
                      alt="EWA"
                      width={30}
                      height={30}
                      className="mar-left-5"
                    />
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>

        <div className="spacer-40"></div>
      </section>

      {/*<!--directors-->*/}
      <section id="directors" className="relative"> 
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <center>
            <h2 className="font-bold fnt-orange text-[35px]">Board of Directors</h2>
          </center>

          <div className="spacer-40"></div>

          <DirectorsCarousel />

        </div>

        <div className="spacer-80"></div>
      </section>  


      {/*<!--timeline-->*/}
      <section id="timeline" className="">    
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Academic Timeline</h2>
            </div>
          </div>  
          
          <center>
            
            <p className="font-thin fnt-green text-[28px]! p-8">Download our EWA Academic Calendar YYYY-YYYY for your copy and information.</p>

            <Link href="" className="btn btn-transparent fnt-orange text-[25px] font-bold remPad">
              Download
              <Image
                src="/imgs/icons/icon-send-orange.png"
                alt="EWA"
                width={30}
                height={30}
                className="mar-left-5"
                download
              />
            </Link>

          </center>

        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--sponsors-->*/}
      <section id="sponsors" className="">    
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Sponsors</h2>
            </div>
          </div>  
        
        </div>

        <div className="spacer-20"></div>

        <div className="flex flex-wrap">
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner1.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner2.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner3.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner4.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner5.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner6.svg" alt="partner" width={150} height={60} className="w-full"/></div>
        </div>  

        <div className="flex flex-wrap">
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner7.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner8.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner9.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner10.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner11.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner12.svg" alt="partner" width={150} height={60} className="w-full"/></div>
        </div>       

        <div className="spacer-40"></div>
      </section>  


    </div>



    
  );
}
