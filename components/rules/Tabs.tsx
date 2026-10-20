"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";

const tabs = [
  { id: "atp", label: "Attendance Policy", icon: "/imgs/icons/calendar-green.svg" },
  { id: "tlp", label: "Training and Learning Policy", icon: "/imgs/icons/grad-car-green.svg" },
  { id: "ipp", label: "Intellectual Property", icon: "/imgs/icons/brain.svg" },
  { id: "aip", label: "Academic Integrity", icon: "/imgs/icons/shield.svg" },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow / Home / End keyboard navigation for the tablist
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="w-full">
      {/* Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Policy tabs"
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`
                group flex h-full min-h-[84px] flex-col items-start gap-3 rounded-xl border-2
                border-[#EF7D53] px-4 py-4 text-left transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7D53]
                focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:gap-4 sm:px-5
                lg:min-h-[100px] lg:gap-5 lg:px-8
                ${
                  isActive
                    ? "bg-[#EF7D53] text-white"
                    : "bg-white text-[#13999A] hover:bg-[#EF7D53]/10"
                }
              `}
            >
              <Image
                src={tab.icon}
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className={`
                  h-8 w-8 shrink-0 transition-[filter] duration-300 lg:h-10 lg:w-10
                  ${isActive ? "brightness-0 invert" : ""}
                `}
              />
              <span className="text-sm font-semibold leading-snug sm:text-base lg:text-lg">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content with Fade Effect */}
      <div className="bg-white pt-8">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            aria-hidden={activeTab !== tab.id}
            inert={activeTab !== tab.id}
            className={`
              transition-opacity duration-500 ease-in-out
              ${
                activeTab === tab.id
                  ? "opacity-100 relative"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }
            `}
          >
            {tab.id === "atp" && (
              <div>
                <div className="spacer-40"></div>

                <div className="flex sm:flex-row md:flex-row justify-center items-center">

                  <div className="sm:w-[5%] text-center">
                    <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                  </div>
                
                  <div className="sm:w-[95%]">
                    <h2 className="font-bold title fnt-orange">Attendance Policy</h2>
                  </div>
                </div> 

                <div className="spacer-20"></div>

                <p className="fnt-green">The academy applies the complete training day system that depends on the annual training system. Each training year consists of three training semesters, and the training plan for each program is distributed on three levels or six levels according to the training period for each major.</p>

                 <div className="spacer-40"></div>

                 <div className="box-leaf-green py-8 px-10 bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom">

                  <div className="flex sm:flex-row md:flex-row justify-center">

                    <div className="md:w-[80%] fnt-green">

                      <h3 className="fnt-orange font-bold text-[30px]">Method of training and training levels at the academy:</h3>
                      <ul className="list-disc pl-6">
                        <li>The training system divides the training year into three main trimesters.</li>
                        <li>The duration of one training trimester is twelve weeks.</li>
                        <li>The training day consists of six training sessions.</li>
                      </ul>
                      
                    </div>
                  
                    <div className="md:w-[20%]"></div>
                   </div>                   

                  </div>

                  <div className="spacer-40"></div>

                  <h3 className="fnt-orange font-bold text-[30px]">Attendance:</h3>
                  <ul className="list-disc pl-6 fnt-green">
                    <li>A trainee must attend theoretical training lectures (whether traditional or online) and the process determined by the training department according to the established training plan.</li>
                    <li>A trainee is not allowed to be absent from sessions except with an official excuse accepted by the Department of Trainees Affairs.</li>
                    <li>The first academic warning will be issued to a trainee if they miss six training sessions (traditional or online) in the training trimester without providing an official excuse.</li>
                    <li>The second academic warning will be issued to a trainee if they miss twelve training sessions (traditional or online) in the training trimester without providing an official excuse.</li>
                    <li>The final academic warning will be issued to a trainee if they miss eighteen training sessions (traditional or online) in the training trimester without providing an official excuse and they will be transferred to the disciplinary committee to determine their ability to continue with the program.</li>
                    <li>A trainee who is denied entry to the final exam due to absence is considered to have failed the course.</li>
                  </ul>

                  <div className="spacer-40"></div>

                  <div className="box-leaf-green py-8 px-10 bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom">

                    <div className="flex sm:flex-row md:flex-row justify-center">

                      <div className="md:w-[80%] fnt-green">

                        <h3 className="fnt-orange font-bold text-[30px]">Method of re-registration for training:</h3>
                        <p>A trainee who has been dismissed may apply for re-registration, but this is subject to the approval of the Academy’s administration and the relevant authorities.</p>
                        
                      </div>
                    
                      <div className="md:w-[20%]"></div>
                    </div>                   

                   </div> 

                  <div className="spacer-40"></div>  

                  <h3 className="fnt-orange font-bold text-[30px]">Graduation:</h3>   
                  <p className="fnt-green">The trainee graduates after successfully completing the graduation requirements according to the training plan.</p>    

                  <div className="spacer-40"></div>   

                  <h3 className="fnt-orange font-bold text-[30px]">Dismissal:</h3>
                  <p className="fnt-green">TA trainee is dismissed from the academy in the following cases:</p> 
                  <ul className="list-disc pl-6 fnt-green">
                    <li>If they receive three warnings due to academic failure during the program.</li>
                    <li>If they receive three warnings due to absence during the training trimester.</li>
                    <li>If they receive three warnings for misconduct during the training program.</li>
                    <li>If they do not complete the graduation requirements during the duration of the program.</li>
                  </ul>

                  <div className="spacer-40"></div> 

                  <div className="box-leaf-orange py-8 px-10 bg-[url(/imgs/assets/box-leaf-orange-bg.svg)] bg-no-repeat bg-left-bottom">

                    <div className="flex sm:flex-row md:flex-row justify-center">

                      <div className="md:w-[20%]"></div>

                      <div className="md:w-[80%] fnt-orange">

                        <p><i className="fa-solid fa-asterisk mar-right-5"></i> EWA administration, in exceptional circumstances, may address the circumstances of trainees to whom the provisions of the preceding paragraphs apply, by giving them an exceptional opportunity as it deems appropriate.</p>
                        
                      </div>
                    
                      
                    </div>                   

                   </div>                   
                                       
              </div>
            )}

            {tab.id === "tlp" && (
              <div>
                  <div className="spacer-40"></div>

                  <div className="flex sm:flex-row md:flex-row justify-center items-center">
                    <div className="sm:w-[5%] text-center">
                      <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                    </div>
                  
                    <div className="sm:w-[95%]">
                      <h2 className="font-bold title fnt-orange">Training & Learning Policy</h2>
                    </div>
                  </div> 

                <div className="spacer-20"></div>

                <p className="fnt-green">The purpose of this policy is to outline the approach taken by EWA to train and assess Trainees and ensure that training and assessment strategies and practices are responsive to industry and learner needs and meet the requirements of training packages. The examination policy is to ensure that exams are conducted in a professional and academically sound manner within the academic honesty policies of EWA.</p>      
                
                <div className="spacer-40"></div>   


                <div className="box-leaf-green py-8 px-10 bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom">

                  <div className="flex sm:flex-row md:flex-row justify-center">

                    <div className="md:w-[80%] fnt-green">

                      <h3 className="fnt-orange font-bold text-[30px]">Objectives:</h3>

                      <ul className="list-decimal pl-6 fnt-green">
                        <li>Implementing a comprehensive Training and Assessment Strategy for each of the course’s EWA undertakes to deliver.</li>
                        <li>Engaging with industry to ensure industry needs are met.</li>
                        <li>Supporting Trainees to meet the requirements of their course and to complete the relevant training.</li>
                        <li>Implementing an assessment system that meets the requirements of the training package.</li>
                      </ul>

                      
                    </div>
                  
                    <div className="md:w-[20%]"></div>
                   </div>                   

                </div>  

                <div className="spacer-40"></div>   

                <h3 className="fnt-orange font-bold text-[30px]">Process:</h3>

                <ul className="list-decimal pl-6 fnt-green font-bold">
                  <li>Training and Assessment Strategies will be validated on a regular basis and updated where necessary to ensure they are in line with changes in industry technology and techniques, legislation, the training package, and the availability of resources within EWA.</li>

                  <li>
                    To ensure Trainees meet the requirements of their course and to maximize their chance to successfully complete their training, the Steering committee will:
                    <ul className="list-disc pl-6 font-normal!">
                      <li>Determine the level of support needed for individual Trainees prior to their enrolment in a course.</li>
                      <li>Provide access to educational and support services such as providing assistive technology, additional tutorials and/or assistance in using technology as may be necessary, for the individual Trainees to meet the requirements of their course.</li>
                      <li>Identify particular requirements such as literacy, numeracy, English language or physical capabilities Trainees would need so as to complete their course.</li>
                      <li>Develop and document support strategies where gaps are identified.</li>
                    </ul>
                  </li>

                  <li>
                    To meet the assessment requirements of the training package, the Steering committee will implement the following assessment systems:
                    <ul className="list-disc pl-6 font-normal!">
                      <li>
                        Assessment methods and tools will be developed on the basis of the employability factors such as:
                        <ul className="list-disc pl-6">
                          <li>Behaviour.</li>
                          <li>Participation.</li>
                          <li>Attendance.</li>
                        </ul>
                      </li>
                      <li>
                        Assessment tools will include components such as:
                        <ul className="list-disc pl-6 font-thin!">
                          <li>Quizzes (Written or Computer based).</li>
                          <li>Workshop practises.</li>
                          <li>Final Practical Test.</li>
                          <li>Final Theory Test.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li>
                    For a Trainee to be assessed as competent they will:
                    <ul className="list-disc pl-6 font-normal!">
                      <li>Undertake all required tasks identified in the elements of the unit.</li>
                      <li>Demonstrate that they can perform these tasks to an acceptable level and in a variety of workplace situations, or accurately simulated workplace situations.</li>
                      <li>Demonstrate their ability to do so in different contexts and environments.</li>
                    </ul>
                  </li>

                  <li>Each trainee will undergo regular evaluation, and a monthly progress report on trainee progress shall be prepared.</li>

                  <li>
                    The said progress reports will comprise the following:
                    <ul className="list-disc pl-6 font-normal!">
                      <li>Weekly attendance rates, including number of periods of authorised absence AND unauthorised absence.</li>
                      <li>Comments on language performance and progress.</li>
                      <li>Comments on technical performance and progress.</li>
                    </ul>
                  </li>

                  <li>Each trainee’s progress will be graded as Excellent, Very Good, Good, Average, Poor based on the above parameters.</li>

                  <li>The Steering Committee will regularly monitor the progress of the Trainees.</li>
                </ul>

                  <div className="spacer-40"></div> 

                  <div className="box-leaf-orange py-8 px-10 bg-[url(/imgs/assets/box-leaf-orange-bg.svg)] bg-no-repeat bg-left-bottom">

                    <div className="flex sm:flex-row md:flex-row justify-center">

                      <div className="md:w-[20%]"></div>

                      <div className="md:w-[80%] fnt-orange">

                        <p><i className="fa-solid fa-asterisk mar-right-5"></i> A final examination schedule will be distributed to each Trainee prior to the end of the term. It shall indicate the day and time a particular class should meet during Finals Week for the purpose of taking a final exam.</p>
                        
                      </div>
                    
                      
                    </div>                   

                   </div>                 
                                                      


              </div>
            )}

            {tab.id === "ipp" && (
              <div>
                  <div className="spacer-40"></div>

                  <div className="flex sm:flex-row md:flex-row justify-center items-center">
                    <div className="sm:w-[5%] text-center">
                      <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                    </div>
                  
                    <div className="sm:w-[95%]">
                      <h2 className="font-bold title fnt-orange">Intellectual Property</h2>
                    </div>
                  </div> 

                  <div className="spacer-20"></div>

                  <p className="fnt-green">All visitors to the eLearning Portal of the Energy and Water Academy must read this page that includes the privacy and intellectual properties at EWA. It is important before you view any of the pages on this website that you read this page carefully. It includes the privacy and security and rule of using this website. This page is the legal relation between the Energy and Water Academy and the users of this website. Your access to any page on this website is your agreement that you have read this page and adhering to what is in it. Therefore, if you do not agree to anything here, please leave this website immediately.</p>  
                  
                  <div className="spacer-40"></div>  

                  <div className="box-leaf-green py-8 px-10 bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom">

                    <div className="flex sm:flex-row md:flex-row justify-center">

                      <div className="md:w-[80%] fnt-green">

                        <h3 className="fnt-orange font-bold text-[30px]">Intellectual Property of the Energy and Water Academy:</h3>
                        <p>All the materials that are used in the training programs at the EWA are considered the intellectual properties of the institute unless indicated otherwise. Using these materials without the written approval of the management of the EWA will lead to legal actions.</p>
                        
                      </div>
                    
                      <div className="md:w-[20%]"></div>
                    </div>                   

                   </div> 

                  <div className="spacer-40"></div>  
                  
                  <div className="box-leaf-green py-8 px-10 bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom">

                    <div className="flex sm:flex-row md:flex-row justify-center">

                      <div className="md:w-[80%] fnt-green">

                        <h3 className="fnt-orange font-bold text-[30px]">Intellectual properties for other parties:</h3>
                        <p>All the materials that are used from outside the institute will be indicated because the institute respects the intellectual properties of others.</p>
                        
                      </div>
                    
                      <div className="md:w-[20%]"></div>
                    </div>                   

                   </div>                                              



              </div>
            )}

            {tab.id === "aip" && (
              <div>
                 <div className="spacer-40"></div>

                <div className="flex sm:flex-row md:flex-row justify-center items-center">

                  <div className="sm:w-[5%] text-center">
                    <Image src="/imgs/icons/title.svg" alt="EWA" width={150} height={150} className="h-auto w-auto"/>
                  </div>
                
                  <div className="sm:w-[95%]">
                    <h2 className="font-bold title fnt-orange">Academic Integrity</h2>
                  </div>
                </div> 

                <div className="spacer-20"></div>

                <p className="fnt-green">The Energy and Water Academy (EWA) is a community of professional vocational people who seek the highest academic and training standards. Therefore, the academy takes the highest care for academic and training integrity and transparency. The academic integrity and transparency are considered the basis of intellectual development for the trainees and the academy’s standards for the academic integrity prohibit any unacceptable conduct.</p>

                <div className="spacer-40"></div>

                 <div className="box-leaf-green py-8 px-10 bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom">

                  <div className="flex sm:flex-row md:flex-row justify-center">

                    <div className="md:w-[80%] fnt-green">

                      <h3 className="fnt-orange font-bold text-[30px]">Definition of violation of the academic integrity:</h3>
                      <ul className="list-disc pl-6">
                        <li>To help the trainees acquire the full benefit of the educational and training chances presented by the Energy and Water Academy, the trainee should know the violations of the academic integrity and the unacceptable behaviour. Because of the severe penalties for the violation of the academic integrity and transparency, each trainee is responsible to know, understand and define all violations of the academic integrity and transparency. The trainee is also responsible to know and understand any training programs related to the policies and procedures of academic integrity.
                          <div className="spacer-20"></div> 
                        </li>
                        <li>The following matters are considered guiding principles to acquaint with the violation of the academic integrity. The members of the teaching group and/or the training programs will provide extra guiding principles, or define more violations and/or the unacceptable conduct with full package of the teaching methods used in the Energy and Water Academy, also, the academy encourages the trainees who have questions or inquiries about the violations of the academic integrity and transparency to contact the instructor and the members of the teaching group and other employees of the academy.
                          <div className="spacer-20"></div> 
                        </li>

                      </ul>
                      
                    </div>
                  
                    <div className="md:w-[20%]"></div>
                   </div>                   

                  </div> 
                  
                  <div className="spacer-40"></div>   

                  <p className="fnt-green font-bold">The violation of the academic integrity is any action, procedure or attempt that may lead to creating academically unfair advantage for the trainee or for any other member of the academic society. It can include but are not limited to the following:</p>  

                   <div className="spacer-20"></div>

                  <ul className="list-decimal pl-6 fnt-green">
                    <li><b>Cheating:</b> it is defined as a premeditated attempt to get or to use illegal subjects or information (for example, papers of cheating, using another trainee’s account) or receiving or the attempt to get permitted help from another person (for example looking in the test paper of another trainee or asking another person during the exam or speaking during the test without permission) or using the mobile phone during exams and tests, the laboratory, the practical exercises or any other tasks.</li>

                    <li><b>Forgery:</b> it is defined as the unlicensed deliberate forgery to invent or copy data or the project of practical training or research or the results of the practical test.</li>

                    <li><b>Literary theft:</b> It is the use of the intellectual subjects produced by another person without acknowledging with the source or to submit words or thoughts of another person claiming that it is for him- production. In addition to the above, the following also are considered literary theft.</li>

                      <ul className="list-disc pl-6 fnt-green">
                        <li>Buying, robbing, or borrowing of a research paper or homework (including copying of a complete paper or essay or great parts of such type or from the web) or to lease a person to write the paper of research and / or copying of big parts of a text of a source without the two clues of quotation or the appropriate citing.</li>   
                        <li>The trainees must use the American documentation system APA which includes the documentation in the text and putting clues of texts for the copied words and the name of author and the date of the text and the page number. The half-copied thoughts in the language of the trainee shall be documented with the name of the author and the source date; otherwise it will be considered theft.</li>                                             
                      </ul>

                    <li><b>Conspiracy:</b> It is the provision of assistance to another person to cheat in an academic work on purpose; and this includes the permission for other person to make copies of your work.</li>

                    <li><b>The full photocopying:</b> It is the process of full photocopying of literary subject without documenting the source.</li>

                    <li><b>The illegal writing:</b> It is the request from another party to write on behalf of the trainee and to produce the work claiming that it is from the writing of the trainee.</li>

                    <li><b>Using the work of another trainee without his knowledge.</b></li>

                    <li><b>Violating copywrite.</b></li>

                    <li><b>Any other illegal act such as a lie in claiming the reasons for failure to deliver the homework or research on time or to submit a homework or paper for which the trainee has acquired degrees but is related to a different subject.</b></li>
                  </ul>

                  <div className="spacer-40"></div> 

                  <div className="box-leaf-orange py-8 px-10 bg-[url(/imgs/assets/box-leaf-orange-bg.svg)] bg-no-repeat bg-left-bottom">

                    <div className="flex sm:flex-row md:flex-row justify-center">

                      <div className="md:w-[20%]"></div>

                      <div className="md:w-[80%] fnt-orange">

                        <p><i className="fa-solid fa-asterisk mar-right-5"></i> Each trainee should know the limits of the acceptable assistance, and accordingly he should consider that any assistance in the academic work is an illegal work unless this is mentioned in the academic plan. The academic cadre is responsible to explain any other matters that may be considered a violation to the academic integrity.</p>
                        
                      </div>
                    
                      
                    </div>                   

                   </div>                   




              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
