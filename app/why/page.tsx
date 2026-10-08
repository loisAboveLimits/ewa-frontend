import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home(){

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
                  href=""
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
      <section id="glance" className="">
        <div className="spacer-40"></div>

        <div className="bg-[url(/imgs/bgs/glance.jpg)] bg-cover bg-center h-[150px] w-full">

        </div>


        <div className="spacer-40"></div> 
      </section>    



    </div>



    
  );
}
