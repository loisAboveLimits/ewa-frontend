import Link from "next/link";
import Image from "next/image";
import StoriesCarousel from "@/components/Stories";
import ContactForm from "@/components/Contact";

export default function Home(){

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-home.jpg)] bg-cover bg-center w-full vh-100">

          <div className="banner-caption top-[40%] -translate-y-1/2 absolute inset-0 vh-100">
            <div className="container mx-auto h-full px-4">
              <h1 className="flex h-full items-center fnt-orange banner-title">Empowering Generation<br/>Powering The Nation</h1>
            </div>
          </div>

      </section>

      {/*<!--about-->*/}
      <section id="about" className="relative">

        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          
        <div className="flex flex-col md:flex-row items-stretch">

          {/* LEFT */}
          <div className="md:w-1/2 p-8 flex flex-col">

            <div className="box box-green px-8 py-12">
              <h3 className="font-bold sub-title">About EWA</h3>
              <h2 className="font-bold title">Academy for Quality</h2>

              <div className="spacer-40"></div>

              <p className="text-justify">
                We Are a Non-Profit Training Academy That Offers High-Quality
                Technical Training and Vocational Education Focused on Water,
                Energy and Other Related Industrial Fields.
              </p>

              <div className="spacer-40"></div>

              <div className="flex justify-start">
                <Link
                  href=""
                  className="btn btn-transparent font-bold remPad"
                >
                  Learn More

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

            <div className="spacer-40"></div>

            <div className="box box-orange px-8 py-12">
              <h2 className="font-bold title">
                Success Partner
              </h2>

              <div className="spacer-40"></div>

              <p>
                Leading the Way in Training and Developing Our National Workforce
              </p>

              <div className="spacer-40"></div>

              <div className="flex justify-end">
                <Link
                  href=""
                  className="ml-auto btn btn-transparent font-bold remPad"
                >
                  Send a Request

                  <Image
                    src="/imgs/icons/icon-send-orange.png"
                    alt="EWA"
                    width={30}
                    height={30}
                    className="mar-left-5"
                  />
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="md:w-1/2 p-8 flex">

            <div className="box box-mixed p-8 bg-[url(/imgs/bgs/home-about-bg.jpg)] bg-cover bg-center w-full flex">

              <div className="flex flex-col md:flex-row w-full">

                <div className="md:w-1/2 prog">
                  <div className="flex flex-col justify-end h-full text-center">
                    <p className="counter">20</p>
                    <p>Diploma Programs</p>
                  </div>
                </div>

                <div className="md:w-1/2 prog">
                  <div className="flex flex-col justify-end h-full text-center">
                    <p className="counter">70</p>
                    <p>Sponsorship Partners</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        </div>
 
        <Image src="/imgs/logos/logo-circle-white.svg" alt="EWA" width={150} height={150} className="h-auto w-auto absolute inset-0 top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover items-center justify-center"/>

        <div className="spacer-40"></div>
      </section>

      {/*<!--partners-->*/}
      <section id="partners">
        <div className="spacer-20"></div>

        <div className="flex flex-wrap">
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner1.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner2.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner3.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner4.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner5.svg" alt="partner" width={150} height={60} className="w-full"/></div>
          <div className="flex-1 gap-4 p-4"><Image src="/imgs/partners/partner6.svg" alt="partner" width={150} height={60} className="w-full"/></div>
        </div>

        <div className="spacer-20"></div>
      </section>

      {/*<!--courses-->*/}
      <section id="courses">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="box bg-[url(/imgs/bgs/home-courses.jpg)] bg-cover bg-center w-full">

            <div className="spacer-40"></div>

            <div className="flex flex-col h-full md:flex-row">

              <div className="md:w-1/4 gap-6 p-8 mt-auto">
                <h2 className="font-bold title">EWA<br/>Programs </h2>
              </div>

              <div className="md:w-1/2 gap-6 p-8">

                <div id="course-lists" className="course-programs">

                  <div className="item text-center">
                    <p>Short Courses</p>
                  </div>

                  <div className="item text-center">
                    <hr />
                  </div>

                  <div className="item text-center active">
                    <p>Diploma Programs</p>
                  </div>

                  <div className="item text-center">
                    <hr />
                  </div>                  

                  <div className="item text-center">
                    <p>Summer Courses</p>
                  </div>                  
                  
                </div>

              </div>

              <div className="md:w-1/4 gap-6 p-8"></div>                            

            </div>

            <div className="spacer-40"></div>

          </div>

        </div>

        <div className="spacer-20"></div>
      </section>

      {/*<!--stories-->*/}
      <section id="stories">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Success Stories<br />EWA & <font className="fnt-orange">Partners</font></h2>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>

        <div className="">
          <StoriesCarousel />
        </div>


         <div className="spacer-80"></div>
      </section>

      {/*<!--testimmonies-->*/}
      <section id="testimonies">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Testimonials<br /> of our <font className="fnt-orange">Sponsors</font> & Alumni</h2>
            </div>
          </div>

        </div>

        <div className="spacer-40"></div>

        <div className="flex items-center justify-center h-screen">
          <Image src="/imgs/logos/logo-circle-white.svg" alt="EWA" width={300} height={300} className="h-auto w-auto"/>
        </div>


         <div className="spacer-80"></div>
      </section>


      {/*<!--contact-->*/}
      <section id="contact">
        <div className="spacer-20"></div>

        <div className="container mx-auto px-4">

          <div className="flex sm:flex-row md:flex-row justify-center items-center">

            <div className="sm:w-[5%] text-center">
              <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
            </div>
          
            <div className="sm:w-[95%]">
              <h2 className="font-bold title fnt-green">Contact Us<br /><font className="fnt-orange">Stay Connected</font></h2>
            </div>
          </div>

        </div>



        <div className="spacer-40"></div>

        <div className="contactus-form">

          <ContactForm />
         
        </div>


         <div className="spacer-80"></div>
      </section>


    </div>



    
  );
}
