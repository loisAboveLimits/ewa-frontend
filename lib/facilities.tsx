import type { ReactNode } from "react";
import type { SlideImage } from "@/components/facilities/FacilitySlider";
import type { Locale, Localized } from "@/lib/i18n/config";

export type Facility = {
  id: string;
  title: string;
  images: SlideImage[];
  content: ReactNode;
};

type FacilityCopy = { title: string; content: ReactNode };

/**
 * Builds the slider images for a facility.
 * Drop your photos into public/imgs/campus/ (e.g. <id>-1.jpg) and point `src` there, or replace with explicit arrays.
 */
const gallery = (title: string, photoLabel: string, count = 3): SlideImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/imgs/slides/slide${i + 1}.jpg`,
    alt: `${title} – ${photoLabel} ${i + 1}`,
  }));

const ids = [
  "ghazi-al-gosaibi-hall",
  "classrooms",
  "library",
  "computer-labs",
  "simulator-room",
  "workshops",
  "accommodation",
  "sports-recreation",
  "parking-areas",
  "canteen",
  "masjid",
] as const;

type FacilityId = (typeof ids)[number];

const photoLabel: Localized<string> = { en: "photo", ar: "صورة" };

const copy: Localized<Record<FacilityId, FacilityCopy>> = {
  en: {
    "ghazi-al-gosaibi-hall": {
      title: "Ghazi Al-Gosaibi Hall",
      content: (
        <p>
          A modern, well-equipped auditorium with a capacity of up to 400 people. Designed for official events like
          lectures, graduations, awards, and academic/community gatherings. Its versatility makes it a central venue for
          knowledge-sharing and celebration.
        </p>
      ),
    },
    classrooms: {
      title: "Our Classrooms",
      content: (
        <p>
          Two academic buildings with state-of-the-art learning tools and interactive smart boards that enhance trainee
          engagement, access to digital resources, and usage of advanced educational software. A place where knowledge is
          built into practical skills for job readiness.
        </p>
      ),
    },
    library: {
      title: "The Library",
      content: (
        <p>
          The training course enables its trainees to get hands-on experience in an academic library. It gives them the
          opportunity to spend time improving their literacy, especially in English. The library is located on the ground
          floor of Academic Building B of the institute.
        </p>
      ),
    },
    "computer-labs": {
      title: "Computer Labs",
      content: (
        <p>
          There are four EWA computer labs across campus. They serve as physical learning and study destinations,
          providing trainees with the latest and greatest computing tools, software, printing, and other technology
          resources to accomplish their academic goals for instruction, research, and presentation. These labs are also
          used for regularly scheduled computer classes, summer online courses, online exams, and certification programs
          related to VSE, Takamol, and CWQAT Saudi Aramco that need online testing.
        </p>
      ),
    },
    "simulator-room": {
      title: "Simulator Room",
      content: (
        <>
          <p>Simulator training is one of the institute&apos;s specialized programs. It has two areas:</p>
          <ol>
            <li>
              For local and CCR operators, the Workshop&apos;s Process Area houses simulations for combined cycle gas
              turbines, thermal power, and reverse osmosis.
            </li>
            <li>
              A virtual reality welding training simulator is used to augment the training of trainees in the welding
              course and it&apos;s located in the Mechanical Workshop.
            </li>
          </ol>
        </>
      ),
    },
    workshops: {
      title: "Our Various Workshops",
      content: (
        <>
          <p>
            A core part of EWA&apos;s training journey, where theoretical knowledge is applied practically. Divided into
            six specialty areas:
          </p>
          <ul>
            <li>Electricity</li>
            <li>Operations</li>
            <li>Desalination</li>
            <li>Innovation &amp; Creativity Center</li>
            <li>Renewable Energy</li>
            <li>Welding</li>
          </ul>
          <p>
            These are interactive, tech-equipped spaces, including virtual reality tools for hands-on, advanced learning.
          </p>
        </>
      ),
    },
    accommodation: {
      title: "Accommodation",
      content: (
        <p>
          Fully-equipped accommodation for male and female trainees with all comfort and safety measures. Includes
          furnished rooms with private bathrooms, lounges, kitchens, internet, laundry rooms, and safety systems
          (monitoring and alarms).
        </p>
      ),
    },
    "sports-recreation": {
      title: "Sports & Recreation",
      content: (
        <>
          <ul>
            <li>A football field next to the gym</li>
            <li>Volleyball court</li>
            <li>Basketball court</li>
            <li>Swimming pool</li>
            <li>Fitness club for trainees</li>
          </ul>
          <p>
            Trainees can unwind after training sessions and participate in regular sports tournaments across various
            games like football and volleyball as part of the Academy&apos;s extracurricular engagement.
          </p>
        </>
      ),
    },
    "parking-areas": {
      title: "Parking Areas",
      // NOTE: copy below is as it appears in the design — it describes housing, not parking. Confirm with the client.
      content: (
        <>
          <p>
            The institute provides accommodation for its trainees as well as for staff and guests. The housing is split
            into Building A and Building B.
          </p>
          <p>
            Each building offers fully furnished rooms with attached bathrooms, as well as kitchens and household
            equipment that are available. The building has internet access, laundry rooms, security cameras, and fire
            safety features.
          </p>
        </>
      ),
    },
    canteen: {
      title: "Canteen",
      content: (
        <p>
          The campus has a canteen for staff and trainees, which is nearby the football field. It has a special dining
          area for visitors to the institute. The canteen offers a wide range of food, freshly cooked and prepared, and
          attention is paid to quality. It serves breakfast, lunch, and dinner.
        </p>
      ),
    },
    masjid: {
      title: "Masjid",
      content: (
        <p>
          The institute has a masjid where staff and trainees perform obligatory prayers. It is close to the accommodation
          in Building A.
        </p>
      ),
    },
  },

  ar: {
    "ghazi-al-gosaibi-hall": {
      title: "قاعة غازي القصيبي",
      content: (
        <p>
          قاعة حديثة ومجهّزة تجهيزًا متكاملًا تتسع لما يصل إلى 400 شخص، صُممت لاستضافة الفعاليات الرسمية مثل المحاضرات
          وحفلات التخرج وتوزيع الجوائز واللقاءات الأكاديمية والمجتمعية. ويجعلها تعدّد استخداماتها مكانًا محوريًا لتبادل
          المعرفة والاحتفاء بالإنجازات.
        </p>
      ),
    },
    classrooms: {
      title: "قاعاتنا الدراسية",
      content: (
        <p>
          مبنيان أكاديميان مزوّدان بأحدث أدوات التعلّم والسبورات الذكية التفاعلية التي تعزّز تفاعل المتدربين ووصولهم إلى
          المصادر الرقمية واستخدامهم للبرمجيات التعليمية المتقدمة؛ مكانٌ تتحوّل فيه المعرفة إلى مهارات عملية تؤهّل لسوق
          العمل.
        </p>
      ),
    },
    library: {
      title: "المكتبة",
      content: (
        <p>
          تتيح الدورة التدريبية للمتدربين اكتساب خبرة عملية في مكتبة أكاديمية، وتمنحهم فرصة لقضاء الوقت في تحسين مهاراتهم
          في القراءة والكتابة، ولا سيما باللغة الإنجليزية. وتقع المكتبة في الطابق الأرضي من المبنى الأكاديمي (ب).
        </p>
      ),
    },
    "computer-labs": {
      title: "معامل الحاسب الآلي",
      content: (
        <p>
          تضم الأكاديمية أربعة معامل للحاسب الآلي موزّعة في أرجاء الحرم، وهي وجهات للتعلّم والدراسة توفّر للمتدربين أحدث
          أدوات الحوسبة والبرمجيات وخدمات الطباعة وغيرها من الموارد التقنية لتحقيق أهدافهم الأكاديمية في التعليم والبحث
          والعروض التقديمية. وتُستخدم هذه المعامل أيضًا لحصص الحاسب المجدولة والدورات الصيفية عن بُعد والاختبارات
          الإلكترونية وبرامج الشهادات المرتبطة بـ VSE وتكامل و CWQAT أرامكو السعودية التي تتطلب اختبارات إلكترونية.
        </p>
      ),
    },
    "simulator-room": {
      title: "غرفة المحاكاة",
      content: (
        <>
          <p>يُعد التدريب بالمحاكاة أحد البرامج المتخصصة في الأكاديمية، ويشمل منطقتين:</p>
          <ol>
            <li>
              لمشغّلي المحطات المحليين ومشغّلي غرف التحكم المركزية، تضم منطقة العمليات في الورشة أجهزة محاكاة لتوربينات
              الغاز ذات الدورة المركبة والطاقة الحرارية والتناضح العكسي.
            </li>
            <li>
              جهاز محاكاة للتدريب على اللحام بتقنية الواقع الافتراضي يُستخدم لتعزيز تدريب المتدربين في دورة اللحام، ويقع
              في الورشة الميكانيكية.
            </li>
          </ol>
        </>
      ),
    },
    workshops: {
      title: "ورشنا المتنوعة",
      content: (
        <>
          <p>جزء أساسي من رحلة التدريب في الأكاديمية، حيث تُطبَّق المعرفة النظرية عمليًا. وتنقسم إلى ست مناطق تخصصية:</p>
          <ul>
            <li>الكهرباء</li>
            <li>التشغيل</li>
            <li>التحلية</li>
            <li>مركز الابتكار والإبداع</li>
            <li>الطاقة المتجددة</li>
            <li>اللحام</li>
          </ul>
          <p>وهي مساحات تفاعلية مجهّزة تقنيًا، تشمل أدوات الواقع الافتراضي للتعلّم العملي المتقدم.</p>
        </>
      ),
    },
    accommodation: {
      title: "السكن",
      content: (
        <p>
          سكن مجهّز بالكامل للمتدربين والمتدربات يوفّر جميع وسائل الراحة والسلامة، ويشمل غرفًا مفروشة بدورات مياه خاصة
          وصالات ومطابخ وخدمة إنترنت وغرف غسيل وأنظمة سلامة (مراقبة وإنذار).
        </p>
      ),
    },
    "sports-recreation": {
      title: "الرياضة والترفيه",
      content: (
        <>
          <ul>
            <li>ملعب كرة قدم بجوار الصالة الرياضية</li>
            <li>ملعب كرة طائرة</li>
            <li>ملعب كرة سلة</li>
            <li>مسبح</li>
            <li>نادٍ رياضي للمتدربين</li>
          </ul>
          <p>
            يمكن للمتدربين الاسترخاء بعد الجلسات التدريبية والمشاركة في بطولات رياضية منتظمة في ألعاب متنوعة مثل كرة القدم
            والكرة الطائرة، ضمن الأنشطة اللاصفية في الأكاديمية.
          </p>
        </>
      ),
    },
    "parking-areas": {
      title: "مواقف السيارات",
      // NOTE: نص التصميم يصف السكن وليس المواقف — يُرجى التأكد مع العميل.
      content: (
        <>
          <p>توفّر الأكاديمية السكن لمتدربيها وكذلك للموظفين والضيوف، وينقسم السكن إلى المبنى (أ) والمبنى (ب).</p>
          <p>
            يوفّر كل مبنى غرفًا مفروشة بالكامل بدورات مياه ملحقة، إضافة إلى مطابخ وأدوات منزلية متاحة. ويتوفر في المبنى
            إنترنت وغرف غسيل وكاميرات مراقبة وأنظمة للسلامة من الحريق.
          </p>
        </>
      ),
    },
    canteen: {
      title: "المقصف",
      content: (
        <p>
          يضم الحرم مقصفًا للموظفين والمتدربين بالقرب من ملعب كرة القدم، وفيه منطقة طعام خاصة لزوار الأكاديمية. ويقدّم
          المقصف تشكيلة واسعة من الأطعمة المطهوة والمُعدّة طازجة مع الحرص على الجودة، ويقدّم وجبات الإفطار والغداء
          والعشاء.
        </p>
      ),
    },
    masjid: {
      title: "المسجد",
      content: <p>تضم الأكاديمية مسجدًا يؤدي فيه الموظفون والمتدربون الصلوات المفروضة، ويقع بالقرب من السكن في المبنى (أ).</p>,
    },
  },
};

export function getFacilities(locale: Locale): Facility[] {
  return ids.map((id) => {
    const { title, content } = copy[locale][id];
    return { id, title, content, images: gallery(title, photoLabel[locale]) };
  });
}
