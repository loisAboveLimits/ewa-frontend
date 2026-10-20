import Link from "next/link";
import Image from "next/image";
import CampusCarousel from "@/components/campus/Campus";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.why.title,
  description: "",
};

export default function Why(){

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

      {/*<!--breadcrumps-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>      

      {/*<!--why-->*/}
      <section id="why" className="relative pb-[5%]">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">        
          
          <div className="flex flex-col md:flex-row">

            {/* LEFT */}
            <div className="md:w-[33.33%] p-6 flex flex-col">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="sm:w-[10%] text-center">
                  <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                </div>
              
                <div className="sm:w-[90%]">
                  <h2 className="font-bold title fnt-green">Why EWA</h2>
                </div>
              </div> 
              
              <div className="spacer-20"></div> 

              <p className="text-base! fnt-green">Our programs are designed in collaboration with industry leaders to ensure you gain the skills and knowledge needed for today's challenges and tomorrow's opportunities.</p>

              <div className="spacer-20"></div> 

              <div className="md:col-span-2 flex justify-end">
                <Link
                  href="/why/programs"
                  className="btn btn-transparent fnt-orange remPad font-bold"
                >
                  View Programs
                  <Image src="/imgs/icons/icon-send-orange.png" alt="EWA" width={30} height={30} className="mar-left-5"/>
                </Link>
              </div>

            </div>

             {/* center */}
            <div className="md:w-[33.33%] p-6 flex">

              <div className="box box-mixed p-8 bg-[url(/imgs/bgs/why-sec1.jpg)] bg-cover bg-center w-full flex"></div>  

            </div>        

            {/* RIGHT */}
            <div className="md:w-[33.33%] p-6 grid relative">

                <div className="box box-green p-6">

                  <div className="flex sm:flex-row md:flex-row justify-center items-center">

                    <div className="md:w-[20%] text-center">
                      <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                    </div>

                    <div className="md:w-[80%]">
                      <h4 className="text-[14px]! font-bold">Technical & Professional Courses</h4>
                      <p className="text-[14px]!">Bulid in-demand skills across key energy and water sectors.</p>
                    </div>                  

                  </div>

                </div>

                <div className="spacer-10"></div>

                <div className="box box-green p-6">

                  <div className="flex sm:flex-row md:flex-row justify-center items-center">

                    <div className="md:w-[20%] text-center">
                      <Image src="/imgs/icons/calendar.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                    </div>

                    <div className="md:w-[80%]">
                      <h4 className="text-[14px]! font-bold">Long and Short Courses Provided</h4>
                      <p className="text-[14px]!">Flexible learning paths for different career stoges.</p>
                    </div>                  

                  </div>

                </div>  

                <div className="spacer-10"></div>  

                 <div className="w-[150%] absolute right-0 top-[90%] framed-10">
                  <div className="box box-green p-6">

                    <div className="flex sm:flex-row md:flex-row justify-center items-center">

                      <div className="md:w-[20%] text-center">
                        <Image src="/imgs/icons/dart.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                      </div>

                      <div className="md:w-[80%]">
                        <h4 className="text-[14px]! font-bold">Industry-Aligned Curriculum</h4>
                        <p className="text-[14px]!">Developed with leading organizations and experts in your preferred field you can trust.</p>
                      </div>                  

                    </div>

                  </div>   
                 </div>                   

            </div>

          </div>

        

        </div>
 
        <div className="spacer-40"></div>
      </section>

      {/*<!--accreditation-->*/}
      <section id="accreditation" className="">    
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Accreditation</h2>
            </div>
          </div>  
          
          <div className="spacer-20"></div>

          <p className="fnt-green">EWA's programs are accredited by leading local and international bodies, ensuring your training meets the highest standards and gives you a competitive advantage.</p>

        </div>

        <div className="spacer-20"></div>

        <div className="flex flex-wrap">
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner13.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner14.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner15.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner16.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner17.svg" alt="partner" width={150} height={60} className="w-full"/></div>
        </div>        

        <div className="spacer-40"></div>
      </section>  

      {/*<!--glance-->*/}
      <section id="glance">
        <div className="spacer-40"></div>

        <div className="bg-[url('/imgs/bgs/glance.jpg')] bg-cover bg-center w-full">

          <div className="flex flex-col md:flex-row md:min-h-[150px]">

            {/* LEFT */}
            <div className="w-full md:w-[15%]">
              <div className="glance-left p-8 min-h-[150px] w-full flex flex-col justify-center">
                <h4 className="font-bold text-[25px] leading-tight">
                  EWA IN A GLANCE
                </h4>
              </div>
            </div>

            {/* CENTER */}
            <div className="w-full md:w-[70%] flex items-center">
              <div className="container mx-auto px-4">
         
                 <div className="flex flex-col md:flex-row">

                    <div className="w-full md:w-[25%] p-4">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-[25%] text-center">
                            <Image src="/imgs/icons/glance-grad.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                          </div>

                          <div className="md:w-[75%] px-3">
                            <h4 className="text-[25px]! leading-tight">84,000+</h4>
                            <p className="text-[12px]!">Graduated Trainees</p>
                          </div>                  
                        </div>  
                    </div>

                    <div className="w-full md:w-[25%] p-4">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-[25%] text-center">
                            <Image src="/imgs/icons/glace-industry-part.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                          </div>

                          <div className="md:w-[75%] px-3">
                            <h4 className="text-[25px]! leading-tight">60+</h4>
                            <p className="text-[12px]!">Industry Partners</p>
                          </div>                  
                        </div>  
                    </div>  

                    <div className="w-full md:w-[25%] p-4">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-[25%] text-center">
                            <Image src="/imgs/icons/glace-expert-inst.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                          </div>

                          <div className="md:w-[75%] px-3">
                            <h4 className="text-[25px]! leading-tight">120+</h4>
                            <p className="text-[12px]!">Expert Instructors</p>
                          </div>                  
                        </div>  
                    </div> 

                    <div className="w-full md:w-[25%] p-4">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-[25%] text-center">
                            <Image src="/imgs/icons/glace-acc-progs.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                          </div>

                          <div className="md:w-[75%] px-3">
                            <h4 className="text-[25px]! leading-tight">25+</h4>
                            <p className="text-[12px]!">Accredited Programs</p>
                          </div>                  
                        </div>  
                    </div>                                      


                 </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-[15%]">
              <div className="glance-right p-8 min-h-[150px] w-full flex flex-col justify-center items-center text-center">
                <p className="text-[32px]! leading-tight">
                  4,130,814
                </p>
                <p className="text-[12px]! leading-tight">
                  Safe Working Hours
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="spacer-40"></div>
      </section>


      {/*<!--campus-->*/}
      <section id="campus" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Campus & Facilities</h2>
            </div>
          </div>  
          
          <div className="spacer-20"></div>

          

            <div className="flex flex-col md:flex-row items-stretch">

              {/* LEFT */}
              <div className="w-full md:w-1/2 p-8 flex flex-col gap-10">

                <div className="box bg-[url('/imgs/bgs/campus-tech.png')] bg-cover bg-center w-full flex flex-col justify-end min-h-[180px] px-8 py-12">
                  <h3 className="font-bold sub-title mt-auto">
                    Technical Labs
                  </h3>
                </div>

                <div className="box bg-[url('/imgs/bgs/campus-simulation.png')] bg-cover bg-center w-full flex flex-col justify-end min-h-[180px] px-8 py-12">
                  <h3 className="font-bold sub-title mt-auto">
                    Simulation Rooms
                  </h3>
                </div>

                <div className="box bg-[url('/imgs/bgs/campus-spaces.png')] bg-cover bg-center w-full flex flex-col  justify-end min-h-[180px] px-8 py-12">
                  <h3 className="font-bold sub-title mt-auto">
                    Learning Spaces
                  </h3>
                </div>

              </div>

              {/* RIGHT */}
              <div className="w-full md:w-1/2 p-8 flex flex-col gap-10">

                <div className="flex-1 min-h-[250px]">
                  <CampusCarousel />
                </div>

                <div className="box box-orange p-8">
                  <h2 className="font-bold title text-[27px]!">
                    Built for Hands-On Learning
                  </h2>

                  <div className="spacer-10"></div>

                  <p className="text-[18px]!">
                    Our world-class facilities create the ideal
                    environment for practical training, innovation
                    and collaboration, with modern labs, simulation
                    rooms and dedicated learning spaces.
                  </p>
                </div>

              </div>

            </div>


          </div>
   
          <Image src="/imgs/logos/logo-circle-white.svg" alt="EWA" width={150} height={150} className="h-auto w-auto absolute inset-0 top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover items-center justify-center z-[100]"/>

        <div className="spacer-40"></div>
      </section>     




    </div>



    
  );
}
