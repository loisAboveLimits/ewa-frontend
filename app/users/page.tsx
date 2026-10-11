import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import ContactForm from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: pages.users.title,
  description: "",
};

export default function Users(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-users.png)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-end banner-title">EWA Users</h1>
              <div className="spacer-10"></div>
              <p className="banner-subtitle">A Seamless Experience with EWA</p>
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
      <section id="" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          <div className="grid grid-cols-2 gap-4">

            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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

            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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


            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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


            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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

            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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

            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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

            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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

            <div className="box box-user p-8 bg-[url(/imgs/assets/box-user-bg.svg)] bg-cover">

              <div className="flex sm:flex-row md:flex-row justify-center items-center">

                <div className="md:w-[20%] text-center">
                  <Image src="/imgs/icons/grad-cap.svg" alt="EWA" width={150} height={150} className="max-w-full h-auto"/>
                </div>

                <div className="md:w-[80%] px-4">
                  <h4 className="text-[24px]! font-bold fnt-orange">Trainee Management System</h4>
                  <p className="text-[18px]! fnt-orange">Access your training programs, schedules, assessments and more</p>

                  <div className="spacer-40"></div>
                </div>                  

              </div> 

                <div className="flex justify-end mt-auto">
                    <Link href="" className="btn btn-transparent font-bold fnt-orange remPad">
                      Visit Portal
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
 

        <div className="spacer-40"></div>
      </section>



    </div>



    
  );
}
