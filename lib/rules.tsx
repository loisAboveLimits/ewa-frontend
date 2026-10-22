import type { ReactNode } from "react";
import type { Locale, Localized } from "@/lib/i18n/config";
import { Bullets, Gap, H3, LeafBox, NoteBox, Numbered, PolicyTitle } from "@/components/rules/blocks";

export type PolicyTab = { id: string; label: string; icon: string; content: ReactNode };

const icons = {
  atp: "/imgs/icons/calendar-green.svg",
  tlp: "/imgs/icons/grad-car-green.svg",
  ipp: "/imgs/icons/brain.svg",
  aip: "/imgs/icons/shield.svg",
} as const;

type TabId = keyof typeof icons;

const tabs: Localized<Record<TabId, { label: string; content: ReactNode }>> = {
  /* =============================== ENGLISH =============================== */
  en: {
    atp: {
      label: "Attendance Policy",
      content: (
        <>
          <PolicyTitle>Attendance Policy</PolicyTitle>
          <p className="fnt-green">
            The academy applies the complete training day system that depends on the annual training system. Each training
            year consists of three training semesters, and the training plan for each program is distributed on three levels
            or six levels according to the training period for each major.
          </p>
          <Gap />
          <LeafBox>
            <H3>Method of training and training levels at the academy:</H3>
            <Bullets>
              <li>The training system divides the training year into three main trimesters.</li>
              <li>The duration of one training trimester is twelve weeks.</li>
              <li>The training day consists of six training sessions.</li>
            </Bullets>
          </LeafBox>
          <Gap />
          <H3>Attendance:</H3>
          <Bullets className="fnt-green">
            <li>A trainee must attend theoretical training lectures (whether traditional or online) and the process determined by the training department according to the established training plan.</li>
            <li>A trainee is not allowed to be absent from sessions except with an official excuse accepted by the Department of Trainees Affairs.</li>
            <li>The first academic warning will be issued to a trainee if they miss six training sessions (traditional or online) in the training trimester without providing an official excuse.</li>
            <li>The second academic warning will be issued to a trainee if they miss twelve training sessions (traditional or online) in the training trimester without providing an official excuse.</li>
            <li>The final academic warning will be issued to a trainee if they miss eighteen training sessions (traditional or online) in the training trimester without providing an official excuse and they will be transferred to the disciplinary committee to determine their ability to continue with the program.</li>
            <li>A trainee who is denied entry to the final exam due to absence is considered to have failed the course.</li>
          </Bullets>
          <Gap />
          <LeafBox>
            <H3>Method of re-registration for training:</H3>
            <p>A trainee who has been dismissed may apply for re-registration, but this is subject to the approval of the Academy’s administration and the relevant authorities.</p>
          </LeafBox>
          <Gap />
          <H3>Graduation:</H3>
          <p className="fnt-green">The trainee graduates after successfully completing the graduation requirements according to the training plan.</p>
          <Gap />
          <H3>Dismissal:</H3>
          <p className="fnt-green">A trainee is dismissed from the academy in the following cases:</p>
          <Bullets className="fnt-green">
            <li>If they receive three warnings due to academic failure during the program.</li>
            <li>If they receive three warnings due to absence during the training trimester.</li>
            <li>If they receive three warnings for misconduct during the training program.</li>
            <li>If they do not complete the graduation requirements during the duration of the program.</li>
          </Bullets>
          <Gap />
          <NoteBox>
            EWA administration, in exceptional circumstances, may address the circumstances of trainees to whom the provisions of the preceding paragraphs apply, by giving them an exceptional opportunity as it deems appropriate.
          </NoteBox>
        </>
      ),
    },

    tlp: {
      label: "Training and Learning Policy",
      content: (
        <>
          <PolicyTitle>Training &amp; Learning Policy</PolicyTitle>
          <p className="fnt-green">
            The purpose of this policy is to outline the approach taken by EWA to train and assess Trainees and ensure that
            training and assessment strategies and practices are responsive to industry and learner needs and meet the
            requirements of training packages. The examination policy is to ensure that exams are conducted in a
            professional and academically sound manner within the academic honesty policies of EWA.
          </p>
          <Gap />
          <LeafBox>
            <H3>Objectives:</H3>
            <Numbered>
              <li>Implementing a comprehensive Training and Assessment Strategy for each of the course’s EWA undertakes to deliver.</li>
              <li>Engaging with industry to ensure industry needs are met.</li>
              <li>Supporting Trainees to meet the requirements of their course and to complete the relevant training.</li>
              <li>Implementing an assessment system that meets the requirements of the training package.</li>
            </Numbered>
          </LeafBox>
          <Gap />
          <H3>Process:</H3>
          <Numbered className="fnt-green font-bold">
            <li>Training and Assessment Strategies will be validated on a regular basis and updated where necessary to ensure they are in line with changes in industry technology and techniques, legislation, the training package, and the availability of resources within EWA.</li>
            <li>
              To ensure Trainees meet the requirements of their course and to maximize their chance to successfully complete their training, the Steering committee will:
              <Bullets className="font-normal!">
                <li>Determine the level of support needed for individual Trainees prior to their enrolment in a course.</li>
                <li>Provide access to educational and support services such as providing assistive technology, additional tutorials and/or assistance in using technology as may be necessary, for the individual Trainees to meet the requirements of their course.</li>
                <li>Identify particular requirements such as literacy, numeracy, English language or physical capabilities Trainees would need so as to complete their course.</li>
                <li>Develop and document support strategies where gaps are identified.</li>
              </Bullets>
            </li>
            <li>
              To meet the assessment requirements of the training package, the Steering committee will implement the following assessment systems:
              <Bullets className="font-normal!">
                <li>
                  Assessment methods and tools will be developed on the basis of the employability factors such as:
                  <Bullets>
                    <li>Behaviour.</li>
                    <li>Participation.</li>
                    <li>Attendance.</li>
                  </Bullets>
                </li>
                <li>
                  Assessment tools will include components such as:
                  <Bullets className="font-thin!">
                    <li>Quizzes (Written or Computer based).</li>
                    <li>Workshop practises.</li>
                    <li>Final Practical Test.</li>
                    <li>Final Theory Test.</li>
                  </Bullets>
                </li>
              </Bullets>
            </li>
            <li>
              For a Trainee to be assessed as competent they will:
              <Bullets className="font-normal!">
                <li>Undertake all required tasks identified in the elements of the unit.</li>
                <li>Demonstrate that they can perform these tasks to an acceptable level and in a variety of workplace situations, or accurately simulated workplace situations.</li>
                <li>Demonstrate their ability to do so in different contexts and environments.</li>
              </Bullets>
            </li>
            <li>Each trainee will undergo regular evaluation, and a monthly progress report on trainee progress shall be prepared.</li>
            <li>
              The said progress reports will comprise the following:
              <Bullets className="font-normal!">
                <li>Weekly attendance rates, including number of periods of authorised absence AND unauthorised absence.</li>
                <li>Comments on language performance and progress.</li>
                <li>Comments on technical performance and progress.</li>
              </Bullets>
            </li>
            <li>Each trainee’s progress will be graded as Excellent, Very Good, Good, Average, Poor based on the above parameters.</li>
            <li>The Steering Committee will regularly monitor the progress of the Trainees.</li>
          </Numbered>
          <Gap />
          <NoteBox>
            A final examination schedule will be distributed to each Trainee prior to the end of the term. It shall indicate the day and time a particular class should meet during Finals Week for the purpose of taking a final exam.
          </NoteBox>
        </>
      ),
    },

    ipp: {
      label: "Intellectual Property",
      content: (
        <>
          <PolicyTitle>Intellectual Property</PolicyTitle>
          <p className="fnt-green">
            All visitors to the eLearning Portal of the Energy and Water Academy must read this page that includes the
            privacy and intellectual properties at EWA. It is important before you view any of the pages on this website
            that you read this page carefully. It includes the privacy and security and rule of using this website. This page
            is the legal relation between the Energy and Water Academy and the users of this website. Your access to any page
            on this website is your agreement that you have read this page and adhering to what is in it. Therefore, if you
            do not agree to anything here, please leave this website immediately.
          </p>
          <Gap />
          <LeafBox>
            <H3>Intellectual Property of the Energy and Water Academy:</H3>
            <p>All the materials that are used in the training programs at the EWA are considered the intellectual properties of the institute unless indicated otherwise. Using these materials without the written approval of the management of the EWA will lead to legal actions.</p>
          </LeafBox>
          <Gap />
          <LeafBox>
            <H3>Intellectual properties for other parties:</H3>
            <p>All the materials that are used from outside the institute will be indicated because the institute respects the intellectual properties of others.</p>
          </LeafBox>
        </>
      ),
    },

    aip: {
      label: "Academic Integrity",
      content: (
        <>
          <PolicyTitle>Academic Integrity</PolicyTitle>
          <p className="fnt-green">
            The Energy and Water Academy (EWA) is a community of professional vocational people who seek the highest
            academic and training standards. Therefore, the academy takes the highest care for academic and training
            integrity and transparency. The academic integrity and transparency are considered the basis of intellectual
            development for the trainees and the academy’s standards for the academic integrity prohibit any unacceptable
            conduct.
          </p>
          <Gap />
          <LeafBox>
            <H3>Definition of violation of the academic integrity:</H3>
            <Bullets className="space-y-5">
              <li>To help the trainees acquire the full benefit of the educational and training chances presented by the Energy and Water Academy, the trainee should know the violations of the academic integrity and the unacceptable behaviour. Because of the severe penalties for the violation of the academic integrity and transparency, each trainee is responsible to know, understand and define all violations of the academic integrity and transparency. The trainee is also responsible to know and understand any training programs related to the policies and procedures of academic integrity.</li>
              <li>The following matters are considered guiding principles to acquaint with the violation of the academic integrity. The members of the teaching group and/or the training programs will provide extra guiding principles, or define more violations and/or the unacceptable conduct with full package of the teaching methods used in the Energy and Water Academy, also, the academy encourages the trainees who have questions or inquiries about the violations of the academic integrity and transparency to contact the instructor and the members of the teaching group and other employees of the academy.</li>
            </Bullets>
          </LeafBox>
          <Gap />
          <p className="fnt-green font-bold">
            The violation of the academic integrity is any action, procedure or attempt that may lead to creating
            academically unfair advantage for the trainee or for any other member of the academic society. It can include
            but are not limited to the following:
          </p>
          <Gap size={20} />
          <Numbered className="fnt-green">
            <li><b>Cheating:</b> it is defined as a premeditated attempt to get or to use illegal subjects or information (for example, papers of cheating, using another trainee’s account) or receiving or the attempt to get permitted help from another person (for example looking in the test paper of another trainee or asking another person during the exam or speaking during the test without permission) or using the mobile phone during exams and tests, the laboratory, the practical exercises or any other tasks.</li>
            <li><b>Forgery:</b> it is defined as the unlicensed deliberate forgery to invent or copy data or the project of practical training or research or the results of the practical test.</li>
            <li>
              <b>Literary theft:</b> It is the use of the intellectual subjects produced by another person without acknowledging with the source or to submit words or thoughts of another person claiming that it is for him- production. In addition to the above, the following also are considered literary theft.
              <Bullets>
                <li>Buying, robbing, or borrowing of a research paper or homework (including copying of a complete paper or essay or great parts of such type or from the web) or to lease a person to write the paper of research and / or copying of big parts of a text of a source without the two clues of quotation or the appropriate citing.</li>
                <li>The trainees must use the American documentation system APA which includes the documentation in the text and putting clues of texts for the copied words and the name of author and the date of the text and the page number. The half-copied thoughts in the language of the trainee shall be documented with the name of the author and the source date; otherwise it will be considered theft.</li>
              </Bullets>
            </li>
            <li><b>Conspiracy:</b> It is the provision of assistance to another person to cheat in an academic work on purpose; and this includes the permission for other person to make copies of your work.</li>
            <li><b>The full photocopying:</b> It is the process of full photocopying of literary subject without documenting the source.</li>
            <li><b>The illegal writing:</b> It is the request from another party to write on behalf of the trainee and to produce the work claiming that it is from the writing of the trainee.</li>
            <li><b>Using the work of another trainee without his knowledge.</b></li>
            <li><b>Violating copyright.</b></li>
            <li><b>Any other illegal act such as a lie in claiming the reasons for failure to deliver the homework or research on time or to submit a homework or paper for which the trainee has acquired degrees but is related to a different subject.</b></li>
          </Numbered>
          <Gap />
          <NoteBox>
            Each trainee should know the limits of the acceptable assistance, and accordingly he should consider that any assistance in the academic work is an illegal work unless this is mentioned in the academic plan. The academic cadre is responsible to explain any other matters that may be considered a violation to the academic integrity.
          </NoteBox>
        </>
      ),
    },
  },

  /* =============================== ARABIC =============================== */
  ar: {
    atp: {
      label: "سياسة الحضور",
      content: (
        <>
          <PolicyTitle>سياسة الحضور</PolicyTitle>
          <p className="fnt-green">
            تطبّق الأكاديمية نظام اليوم التدريبي الكامل المعتمد على نظام التدريب السنوي؛ إذ يتكوّن كل عام تدريبي من ثلاثة
            فصول تدريبية، وتُوزَّع الخطة التدريبية لكل برنامج على ثلاثة مستويات أو ستة مستويات وفقًا للمدة التدريبية لكل
            تخصص.
          </p>
          <Gap />
          <LeafBox>
            <H3>طريقة التدريب والمستويات التدريبية في الأكاديمية:</H3>
            <Bullets>
              <li>يقسّم نظام التدريب العام التدريبي إلى ثلاثة فصول رئيسية.</li>
              <li>مدة الفصل التدريبي الواحد اثنا عشر أسبوعًا.</li>
              <li>يتكوّن اليوم التدريبي من ست حصص تدريبية.</li>
            </Bullets>
          </LeafBox>
          <Gap />
          <H3>الحضور:</H3>
          <Bullets className="fnt-green">
            <li>يجب على المتدرب حضور المحاضرات التدريبية النظرية (سواء الحضورية أو عن بُعد) والتطبيقات العملية التي يحددها قسم التدريب وفق الخطة التدريبية المعتمدة.</li>
            <li>لا يُسمح للمتدرب بالغياب عن الحصص إلا بعذر رسمي تقبله إدارة شؤون المتدربين.</li>
            <li>يُصدَر الإنذار الأكاديمي الأول للمتدرب إذا تغيّب عن ست حصص تدريبية (حضورية أو عن بُعد) خلال الفصل التدريبي دون تقديم عذر رسمي.</li>
            <li>يُصدَر الإنذار الأكاديمي الثاني للمتدرب إذا تغيّب عن اثنتي عشرة حصة تدريبية (حضورية أو عن بُعد) خلال الفصل التدريبي دون تقديم عذر رسمي.</li>
            <li>يُصدَر الإنذار الأكاديمي النهائي للمتدرب إذا تغيّب عن ثماني عشرة حصة تدريبية (حضورية أو عن بُعد) خلال الفصل التدريبي دون تقديم عذر رسمي، ويُحال إلى لجنة الانضباط لتحديد مدى قدرته على الاستمرار في البرنامج.</li>
            <li>يُعد المتدرب الذي يُحرم من دخول الاختبار النهائي بسبب الغياب راسبًا في المقرر.</li>
          </Bullets>
          <Gap />
          <LeafBox>
            <H3>طريقة إعادة القيد في التدريب:</H3>
            <p>يجوز للمتدرب المفصول التقدّم بطلب لإعادة قيده، على أن يكون ذلك خاضعًا لموافقة إدارة الأكاديمية والجهات المعنية.</p>
          </LeafBox>
          <Gap />
          <H3>التخرّج:</H3>
          <p className="fnt-green">يتخرّج المتدرب بعد إتمامه متطلبات التخرج بنجاح وفق الخطة التدريبية.</p>
          <Gap />
          <H3>الفصل:</H3>
          <p className="fnt-green">يُفصل المتدرب من الأكاديمية في الحالات الآتية:</p>
          <Bullets className="fnt-green">
            <li>إذا حصل على ثلاثة إنذارات بسبب التعثّر الأكاديمي خلال البرنامج.</li>
            <li>إذا حصل على ثلاثة إنذارات بسبب الغياب خلال الفصل التدريبي.</li>
            <li>إذا حصل على ثلاثة إنذارات بسبب سوء السلوك خلال البرنامج التدريبي.</li>
            <li>إذا لم يستكمل متطلبات التخرج خلال المدة المحددة للبرنامج.</li>
          </Bullets>
          <Gap />
          <NoteBox>
            يجوز لإدارة الأكاديمية، في الظروف الاستثنائية، معالجة أوضاع المتدربين الذين تنطبق عليهم أحكام الفقرات السابقة، بمنحهم فرصة استثنائية وفق ما تراه مناسبًا.
          </NoteBox>
        </>
      ),
    },

    tlp: {
      label: "سياسة التدريب والتعلّم",
      content: (
        <>
          <PolicyTitle>سياسة التدريب والتعلّم</PolicyTitle>
          <p className="fnt-green">
            تهدف هذه السياسة إلى توضيح النهج الذي تتبعه الأكاديمية في تدريب المتدربين وتقييمهم، وضمان أن تكون استراتيجيات
            التدريب والتقييم وممارساتهما ملبّية لاحتياجات الصناعة والمتعلمين ومستوفية لمتطلبات الحقائب التدريبية. وتهدف
            سياسة الاختبارات إلى ضمان إجراء الاختبارات بطريقة مهنية وسليمة أكاديميًا ضمن سياسات النزاهة الأكاديمية في
            الأكاديمية.
          </p>
          <Gap />
          <LeafBox>
            <H3>الأهداف:</H3>
            <Numbered>
              <li>تطبيق استراتيجية شاملة للتدريب والتقييم لكل برنامج تتولى الأكاديمية تقديمه.</li>
              <li>التواصل مع قطاع الصناعة لضمان تلبية احتياجاته.</li>
              <li>دعم المتدربين لاستيفاء متطلبات برامجهم وإتمام التدريب ذي الصلة.</li>
              <li>تطبيق نظام تقييم يستوفي متطلبات الحقيبة التدريبية.</li>
            </Numbered>
          </LeafBox>
          <Gap />
          <H3>الإجراءات:</H3>
          <Numbered className="fnt-green font-bold">
            <li>تُراجَع استراتيجيات التدريب والتقييم بانتظام وتُحدَّث عند الحاجة لضمان مواكبتها للتغيرات في تقنيات الصناعة وأساليبها والأنظمة والتشريعات والحقيبة التدريبية، ومدى توافر الموارد في الأكاديمية.</li>
            <li>
              لضمان استيفاء المتدربين لمتطلبات برامجهم وزيادة فرصهم في إتمام التدريب بنجاح، تتولى اللجنة التوجيهية ما يلي:
              <Bullets className="font-normal!">
                <li>تحديد مستوى الدعم الذي يحتاجه كل متدرب قبل التحاقه بالبرنامج.</li>
                <li>إتاحة الخدمات التعليمية وخدمات الدعم، مثل توفير التقنيات المساعدة أو الدروس الإضافية و/أو المساعدة في استخدام التقنية عند الحاجة، ليتمكّن كل متدرب من استيفاء متطلبات برنامجه.</li>
                <li>تحديد المتطلبات الخاصة التي قد يحتاجها المتدربون لإتمام برامجهم، مثل مهارات القراءة والكتابة والحساب أو اللغة الإنجليزية أو القدرات البدنية.</li>
                <li>وضع استراتيجيات الدعم وتوثيقها عند رصد أي فجوات.</li>
              </Bullets>
            </li>
            <li>
              لاستيفاء متطلبات التقييم في الحقيبة التدريبية، تطبّق اللجنة التوجيهية أنظمة التقييم الآتية:
              <Bullets className="font-normal!">
                <li>
                  تُطوَّر أساليب التقييم وأدواته بناءً على عوامل الجاهزية للتوظيف، مثل:
                  <Bullets>
                    <li>السلوك.</li>
                    <li>المشاركة.</li>
                    <li>الحضور.</li>
                  </Bullets>
                </li>
                <li>
                  تشمل أدوات التقييم عناصر مثل:
                  <Bullets className="font-thin!">
                    <li>الاختبارات القصيرة (الورقية أو الإلكترونية).</li>
                    <li>التطبيقات العملية في الورش.</li>
                    <li>الاختبار العملي النهائي.</li>
                    <li>الاختبار النظري النهائي.</li>
                  </Bullets>
                </li>
              </Bullets>
            </li>
            <li>
              لكي يُقيَّم المتدرب بأنه كفء، عليه أن:
              <Bullets className="font-normal!">
                <li>يؤدي جميع المهام المطلوبة المحددة في عناصر الوحدة.</li>
                <li>يُثبت قدرته على أداء هذه المهام بمستوى مقبول وفي مواقف عمل متنوعة، أو في مواقف عمل محاكاة بدقة.</li>
                <li>يُثبت قدرته على ذلك في سياقات وبيئات مختلفة.</li>
              </Bullets>
            </li>
            <li>يخضع كل متدرب لتقييم منتظم، ويُعَدّ تقرير شهري عن مستوى تقدّمه.</li>
            <li>
              تتضمن تقارير التقدّم المذكورة ما يلي:
              <Bullets className="font-normal!">
                <li>نسب الحضور الأسبوعية، بما في ذلك عدد حصص الغياب بعذر والغياب بدون عذر.</li>
                <li>ملاحظات حول الأداء والتقدّم في اللغة.</li>
                <li>ملاحظات حول الأداء والتقدّم التقني.</li>
              </Bullets>
            </li>
            <li>يُقيَّم تقدّم كل متدرب بتقدير ممتاز أو جيد جدًا أو جيد أو مقبول أو ضعيف بناءً على المعايير السابقة.</li>
            <li>تتابع اللجنة التوجيهية تقدّم المتدربين بانتظام.</li>
          </Numbered>
          <Gap />
          <NoteBox>
            يُوزَّع جدول الاختبارات النهائية على كل متدرب قبل نهاية الفصل، ويبيّن اليوم والوقت المحددين لاجتماع كل شعبة خلال أسبوع الاختبارات النهائية لأداء الاختبار النهائي.
          </NoteBox>
        </>
      ),
    },

    ipp: {
      label: "الملكية الفكرية",
      content: (
        <>
          <PolicyTitle>الملكية الفكرية</PolicyTitle>
          <p className="fnt-green">
            يجب على جميع زوار بوابة التعلّم الإلكتروني في أكاديمية الطاقة والمياه قراءة هذه الصفحة التي تتضمن سياسة الخصوصية
            والملكية الفكرية في الأكاديمية. ومن المهم أن تقرأ هذه الصفحة بعناية قبل تصفّح أي من صفحات هذا الموقع، إذ تتضمن
            قواعد الخصوصية والأمان واستخدام الموقع، وتمثّل العلاقة القانونية بين أكاديمية الطاقة والمياه ومستخدمي هذا الموقع.
            ويُعد دخولك إلى أي صفحة من صفحات الموقع إقرارًا منك بأنك قرأت هذه الصفحة والتزمت بما ورد فيها؛ لذا، إن كنت لا
            توافق على أي مما ورد هنا، فيُرجى مغادرة الموقع فورًا.
          </p>
          <Gap />
          <LeafBox>
            <H3>الملكية الفكرية لأكاديمية الطاقة والمياه:</H3>
            <p>تُعد جميع المواد المستخدمة في البرامج التدريبية بالأكاديمية ملكية فكرية لها ما لم يُشَر إلى خلاف ذلك، ويترتب على استخدام هذه المواد دون موافقة كتابية من إدارة الأكاديمية اتخاذ الإجراءات القانونية.</p>
          </LeafBox>
          <Gap />
          <LeafBox>
            <H3>الملكية الفكرية للأطراف الأخرى:</H3>
            <p>يُشار إلى جميع المواد المستخدمة من خارج الأكاديمية، لأن الأكاديمية تحترم الملكية الفكرية للآخرين.</p>
          </LeafBox>
        </>
      ),
    },

    aip: {
      label: "النزاهة الأكاديمية",
      content: (
        <>
          <PolicyTitle>النزاهة الأكاديمية</PolicyTitle>
          <p className="fnt-green">
            أكاديمية الطاقة والمياه مجتمع من المهنيين في المجال المهني والتقني يسعى إلى تحقيق أعلى المعايير الأكاديمية
            والتدريبية؛ ولذلك تولي الأكاديمية أقصى درجات العناية بالنزاهة والشفافية الأكاديمية والتدريبية، إذ تُعد النزاهة
            والشفافية الأكاديمية أساس التطور الفكري للمتدربين، وتحظر معايير الأكاديمية للنزاهة الأكاديمية أي سلوك غير مقبول.
          </p>
          <Gap />
          <LeafBox>
            <H3>تعريف مخالفة النزاهة الأكاديمية:</H3>
            <Bullets className="space-y-5">
              <li>لمساعدة المتدربين على الاستفادة الكاملة من الفرص التعليمية والتدريبية التي تقدمها أكاديمية الطاقة والمياه، ينبغي للمتدرب أن يعرف مخالفات النزاهة الأكاديمية والسلوكيات غير المقبولة. ونظرًا لشدة العقوبات المترتبة على مخالفة النزاهة والشفافية الأكاديمية، يتحمّل كل متدرب مسؤولية معرفة جميع مخالفات النزاهة والشفافية الأكاديمية وفهمها وتحديدها، كما يتحمّل مسؤولية معرفة وفهم أي برامج تدريبية تتعلق بسياسات النزاهة الأكاديمية وإجراءاتها.</li>
              <li>تُعد الأمور الآتية مبادئ إرشادية للتعريف بمخالفات النزاهة الأكاديمية، وسيقدّم أعضاء هيئة التدريب و/أو البرامج التدريبية مبادئ إرشادية إضافية، أو يحددون مخالفات و/أو سلوكيات غير مقبولة أخرى ضمن منظومة أساليب التدريس المتبعة في أكاديمية الطاقة والمياه. كما تشجّع الأكاديمية المتدربين الذين لديهم أسئلة أو استفسارات حول مخالفات النزاهة والشفافية الأكاديمية على التواصل مع المدرب وأعضاء هيئة التدريب وغيرهم من موظفي الأكاديمية.</li>
            </Bullets>
          </LeafBox>
          <Gap />
          <p className="fnt-green font-bold">
            مخالفة النزاهة الأكاديمية هي أي فعل أو إجراء أو محاولة قد تؤدي إلى تحقيق ميزة أكاديمية غير عادلة للمتدرب أو لأي
            عضو آخر في المجتمع الأكاديمي، وقد تشمل على سبيل المثال لا الحصر ما يلي:
          </p>
          <Gap size={20} />
          <Numbered className="fnt-green">
            <li><b>الغش:</b> ويُعرَّف بأنه محاولة متعمّدة للحصول على مواد أو معلومات غير مسموح بها أو استخدامها (مثل أوراق الغش أو استخدام حساب متدرب آخر)، أو تلقّي مساعدة غير مسموح بها من شخص آخر أو محاولة الحصول عليها (مثل النظر في ورقة اختبار متدرب آخر، أو سؤال شخص آخر أثناء الاختبار، أو التحدث أثناء الاختبار دون إذن)، أو استخدام الهاتف الجوال أثناء الاختبارات أو في المعمل أو التمارين العملية أو أي مهام أخرى.</li>
            <li><b>التزوير:</b> ويُعرَّف بأنه الاختلاق أو النسخ المتعمّد غير المصرّح به للبيانات أو لمشروع التدريب العملي أو البحث أو نتائج الاختبار العملي.</li>
            <li>
              <b>السرقة الأدبية:</b> وهي استخدام النتاج الفكري لشخص آخر دون الإشارة إلى المصدر، أو تقديم كلمات شخص آخر أو أفكاره على أنها من إنتاج المتدرب نفسه. ويُعد من السرقة الأدبية أيضًا ما يلي:
              <Bullets>
                <li>شراء ورقة بحثية أو واجب أو سرقتهما أو استعارتهما (بما في ذلك نسخ ورقة أو مقالة كاملة أو أجزاء كبيرة منها أو من الإنترنت)، أو الاستعانة بشخص لكتابة الورقة البحثية، و/أو نسخ أجزاء كبيرة من نص مصدر دون علامتَي التنصيص أو التوثيق المناسب.</li>
                <li>يجب على المتدربين استخدام نظام التوثيق الأمريكي APA، الذي يشمل التوثيق داخل النص ووضع علامات التنصيص للكلمات المنقولة مع ذكر اسم المؤلف وتاريخ النص ورقم الصفحة. كما يجب توثيق الأفكار المنقولة بتصرّف بلغة المتدرب باسم المؤلف وتاريخ المصدر، وإلا عُدّت سرقة.</li>
              </Bullets>
            </li>
            <li><b>التواطؤ:</b> وهو تقديم المساعدة عمدًا لشخص آخر للغش في عمل أكاديمي، ويشمل ذلك السماح لشخص آخر بنسخ عملك.</li>
            <li><b>النسخ الكامل:</b> وهو نسخ مادة أدبية نسخًا كاملًا دون توثيق المصدر.</li>
            <li><b>الكتابة غير المشروعة:</b> وهي طلب المتدرب من طرف آخر أن يكتب نيابة عنه، ثم تقديم العمل على أنه من كتابته.</li>
            <li><b>استخدام عمل متدرب آخر دون علمه.</b></li>
            <li><b>انتهاك حقوق النشر.</b></li>
            <li><b>أي فعل آخر غير مشروع، مثل الكذب في ادعاء أسباب عدم تسليم الواجب أو البحث في موعده، أو تقديم واجب أو ورقة سبق أن حصل المتدرب على درجات عليها في مقرر مختلف.</b></li>
          </Numbered>
          <Gap />
          <NoteBox>
            ينبغي لكل متدرب أن يعرف حدود المساعدة المقبولة، وعليه أن يعدّ أي مساعدة في العمل الأكاديمي عملًا غير مشروع ما لم يُنص على ذلك في الخطة الأكاديمية. ويتولى الكادر الأكاديمي مسؤولية توضيح أي أمور أخرى قد تُعد مخالفة للنزاهة الأكاديمية.
          </NoteBox>
        </>
      ),
    },
  },
};

export const getPolicyTabs = (locale: Locale): PolicyTab[] =>
  (Object.keys(icons) as TabId[]).map((id) => ({ id, icon: icons[id], ...tabs[locale][id] }));
