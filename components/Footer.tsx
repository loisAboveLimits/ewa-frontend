import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white bg-right-bottom bg-no-repeat"    style={{backgroundImage: "url('/imgs/assets/footer-bg.png')",}}>

      <div className="spacer-80"></div>

      <div className="desktop-view">
        <div className="container mx-auto px-4">


          <div className="flex flex-col md:flex-row">

            <div className="w-full md:w-1/4 gap-6 p-8">

                <Image src="/imgs/logos/logo.svg" alt="EWA" width={150} height={60} className="h-auto w-auto"/>  

                <div className="spacer-20"></div>

                <div className="contact">

                <ul className="list-none">
                  <li>
                    <Link className="flex icons-contact text-white-400 hover:text-gray-400" href="">
                      <Image src="/imgs/icons/phone.svg" alt="EWA" width={30} height={30} className=""/>
                      +966 12 422 2322
                    </Link>
                  </li>

                  <li>
                    <Link className="flex icons-contact text-white-400 hover:text-gray-400" href="">
                      <Image src="/imgs/icons/mail.svg" alt="EWA" width={30} height={30} className=""/>
                      info@ewa.edu.sa
                     </Link>
                  </li>

                  <li>
                    <Link className="flex icons-contact text-white-400 hover:text-gray-400" href="">
                      <Image src="/imgs/icons/droppin.svg" alt="EWA" width={30} height={30} className=""/>
                      303, Al-Naeem, Rabigh 25754
                     </Link>
                  </li>
                </ul>
                  
                </div>

                <div className="spacer-20"></div>

                <div className="flex flex-nowrap social-media">
                  <div className="">
                    <Link className="text-white-400 hover:text-gray-400" href=""><i className="fa-brands fa-x-twitter"></i></Link>
                  </div>

                  <div className="">
                    <Link className="text-white-400 hover:text-gray-400" href=""><i className="fa-brands fa-instagram"></i></Link>
                  </div>

                  <div className="">
                    <Link className="text-white-400 hover:text-gray-400" href=""><i className="fa-brands fa-square-linkedin"></i></Link>
                  </div>                                    
                </div>       

            </div>

            <div className="w-full md:w-3/4 gap-6 p-8">

              <div className="flex flex-col md:flex-row">

                <div className="w-full md:w-1/4 footer-column">

                  <h3 className="mb-5 text-lg font-semibold">
                    About EWA
                  </h3>

                  <ul className="space-y-3 text-white-400">
                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        About Us
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Vision, Mission, Values
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Chairman Message
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Board of Directors
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Strategic Partners
                      </Link>
                    </li>                                          
                  </ul> 

                </div>

                <div className="w-full md:w-1/4 footer-column">

                  <h3 className="mb-5 text-lg font-semibold">
                    Why EWA
                  </h3>

                  <ul className="space-y-3 text-white-400">
                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                       Accreditation
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Facilities & Campus 
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Success Stories
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        News & Events 
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        FAQ'S
                      </Link>
                    </li>                                          
                  </ul>                   

                </div>

                <div className="w-full md:w-1/4 footer-column">

                  <h3 className="mb-5 text-lg font-semibold">
                    Programs
                  </h3>

                  <ul className="space-y-3 text-white-400">
                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                       Diploma Programs
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Short Courses
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                       Summer Courses 
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Qualification
                      </Link>
                    </li>                                          
                  </ul>  

                </div>  

                <div className="w-full md:w-1/4 footer-column">

                  <h3 className="mb-5 text-lg font-semibold">
                    Support and Help
                  </h3>

                  <ul className="space-y-3 text-white-400">
                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                       Rules and Regulations 
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Privacy Policy 
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                       Terms & Conditions 
                      </Link>
                    </li>

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Accessibility 
                      </Link>
                    </li>  

                    <li><div className="spacer-20"></div></li>  

                    <li>
                      <Link href="" className="transition hover:text-gray-400">
                        Contact Us 
                      </Link>
                    </li>                                                            
                  </ul>  

                </div>            

              </div>

            </div>

          </div>
        </div>
      </div>


     <div className="mobile-view">

      </div>

     <div className="spacer-80"></div>

{/*      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          

          <div>
            <Image
              src="/imgs/logos/logo.svg"
              alt="EWA"
              width={150}
              height={60}
              className="h-auto w-auto"
            />

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Building meaningful experiences and creating lasting impact.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition hover:text-gray-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-gray-400">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/services" className="transition hover:text-gray-400">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

       
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>Jeddah, Saudi Arabia</p>

              <a
                href="mailto:info@example.com"
                className="block transition hover:text-gray-400"
              >
                info@example.com
              </a>

              <a
                href="tel:+966123456789"
                className="block transition hover:text-gray-400"
              >
                +966 12 345 6789
              </a>
            </div>
          </div>


          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Follow Us
            </h3>

            <div className="flex gap-5 text-sm text-gray-400">
              <a href="#" className="transition hover:text-gray-400">
                LinkedIn
              </a>

              <a href="#" className="transition hover:text-gray-400">
                Instagram
              </a>

              <a href="#" className="transition hover:text-gray-400">
                X
              </a>
            </div>
          </div>

        </div>


        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          
          <p>
            © {new Date().getFullYear()} EWA. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-gray-400">
              Terms & Conditions
            </Link>
          </div>

        </div>

      </div>*/}
    </footer>
  );
}