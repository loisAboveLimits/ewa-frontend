import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import { formatDate, type Localized } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";

/* ------------------------------------------------------------------ */
/*  Article data – swap for a CMS / lib/news.ts lookup later          */
/* ------------------------------------------------------------------ */
type Article = { title: string; imageAlt: string; body: string[] };

const articleMeta = {
  date: "2023-09-08",
  image: "/imgs/slides/media4.jpg",
};

const articles: Localized<Article> = {
  en: {
    title: "57 Trainees finish EWA Program in Rabigh",
    imageAlt: "EWA graduates and guests seated at the graduation ceremony in Rabigh",
    body: [
      "Fifty seven trainees, 42 from Global Environment Management Services (GEMS) and 15 from Emad Khalid Bawazir (EKB) company, completed their technical training program at the Higher Institute for Water and Power Technologies (EWA). Their graduation ceremony was held at the EWA auditorium in Rabigh on March 1, 2023.",
      "GEMS apprentices successfully completed a 6-month technical qualification program in the fields of instrumentation, SCADA, and welding, while EKB trainees finished a 2-year diploma program in electrical equipment maintenance.",
      "The graduation ceremony of the trainees was witnessed by both company delegations, with the special attendance of Engr. Khaled Al-Rashed, GEMS Chief Executive Officer, and Saudi Investment Recycling Company (SIRC) Chief Operating Officer, together with Eng. Abdulrahman Al-Obaid, Executive Vice President of Human Resources at SIRC.",
      "EWA Chairman Thamer Al-Sharhan, along with management and staff, was also present to celebrate the event.\nHonorable guests and delegates spent almost the entire day meeting graduates, witnessing their projects, and discussing and sharing their feedback with the EWA management and staff.",
      "“It is a clear manifestation of EWA’s commitment to young Saudi talent, with practical steps taken towards implementing Vision 2030 in terms of localization and knowledge economy,” Chairman Al-Sharhan said during the event.",
      "He further said that the institute looks forward to enhancing further cooperation with its esteemed sponsors and partners for the noble purpose of building human capital and enhancing the lives of citizens.",
      "“And on behalf of the EWA management, I would like to express our gratitude for your support, GEMS and EKB, as we celebrate the graduation of 57 talented young Saudis.”",
      "Commenting on the event, GEMS CEO/ SIRC COO Al-Rashed stated: “The truth of what I witnessed today during the visit to the institute and seeing the supplies, equipment, laboratories and workshops, as well as during my meeting with the trainees, exceeds expectations a lot, and it is one of the best institutes, that I had the honor to visit.”",
      "“Today I saw technicians 100% ready to start working on sites and enable them to work fully, imbued with a culture of discipline, achievement and safety.”",
      "On the culmination of the event, GEMS agreed to send a new batch of trainees, who will be arranged soon after the company finishes determining the need for technicians in the fields. GEMS, headquartered in Jeddah, is a leading provider of integrated waste management solutions in the Kingdom of Saudi Arabia. It was founded in 2008 and fully acquired by SIRC in 2019, which is a subsidiary of the Public Investment Fund.",
    ],
  },
  ar: {
    title: "57 متدربًا يُتمّون برنامج الأكاديمية في رابغ",
    imageAlt: "خريجو الأكاديمية وضيوفها خلال حفل التخرج في رابغ",
    body: [
      "أتمّ سبعة وخمسون متدربًا، منهم 42 متدربًا من شركة الخدمات العالمية لإدارة البيئة (GEMS) و15 متدربًا من شركة عماد خالد باوزير (EKB)، برنامجهم التدريبي التقني في أكاديمية الطاقة والمياه (EWA)، وأُقيم حفل تخرجهم في قاعة الأكاديمية برابغ في 1 مارس 2023.",
      "وأنهى متدربو شركة GEMS بنجاح برنامج تأهيل تقني مدته ستة أشهر في مجالات أجهزة القياس وأنظمة سكادا (SCADA) واللحام، فيما أتمّ متدربو شركة EKB برنامج دبلوم مدته سنتان في صيانة المعدات الكهربائية.",
      "وشهد حفل تخرج المتدربين وفدا الشركتين، بحضور خاص من المهندس خالد الراشد، الرئيس التنفيذي لشركة GEMS والرئيس التنفيذي للعمليات في الشركة السعودية الاستثمارية لإعادة التدوير (سرك)، والمهندس عبدالرحمن العبيد، نائب الرئيس التنفيذي للموارد البشرية في الشركة.",
      "كما حضر رئيس مجلس إدارة الأكاديمية ثامر الشرهان، إلى جانب الإدارة والموظفين، للاحتفاء بهذه المناسبة.\nوأمضى الضيوف الكرام والوفود معظم اليوم في لقاء الخريجين والاطلاع على مشاريعهم، ومناقشة ملاحظاتهم ومشاركتها مع إدارة الأكاديمية وموظفيها.",
      "وقال رئيس مجلس الإدارة الشرهان خلال الحفل: «إنه تجسيد واضح لالتزام الأكاديمية تجاه المواهب السعودية الشابة، بخطوات عملية نحو تحقيق رؤية 2030 في مجالَي التوطين واقتصاد المعرفة».",
      "وأضاف أن الأكاديمية تتطلع إلى تعزيز مزيد من التعاون مع رعاتها وشركائها الكرام، تحقيقًا للهدف النبيل المتمثل في بناء رأس المال البشري وتحسين حياة المواطنين.",
      "«وباسم إدارة الأكاديمية، أودّ أن أعبّر عن امتناننا لدعمكم، GEMS وEKB، ونحن نحتفي بتخرج 57 شابًا سعوديًا موهوبًا».",
      "وفي تعليقه على الحدث، قال الراشد: «إن ما شاهدته اليوم خلال زيارتي للأكاديمية واطلاعي على التجهيزات والمعدات والمعامل والورش، وكذلك خلال لقائي بالمتدربين، يفوق التوقعات كثيرًا، وهي من أفضل المعاهد التي تشرّفت بزيارتها».",
      "«لقد رأيت اليوم فنيين جاهزين بنسبة 100% لبدء العمل في المواقع والقيام بمهامهم كاملة، متشبّعين بثقافة الانضباط والإنجاز والسلامة».",
      "وفي ختام الحفل، وافقت شركة GEMS على إرسال دفعة جديدة من المتدربين، سيُرتَّب لها قريبًا بعد أن تنتهي الشركة من تحديد احتياجها من الفنيين في المواقع. ويقع المقر الرئيسي لشركة GEMS في جدة، وهي مزوّد رائد لحلول إدارة النفايات المتكاملة في المملكة العربية السعودية، تأسست عام 2008 واستحوذت عليها بالكامل الشركة السعودية الاستثمارية لإعادة التدوير عام 2019، التابعة لصندوق الاستثمارات العامة.",
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  return { title: articles[locale].title, description: articles[locale].body[0] };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function NewsDetail() {
  const { locale, t } = await getI18n();
  const article = { ...articleMeta, ...articles[locale] };

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-media-center.jpg" title={t.pages.media.title} subtitle={t.pages.media.desc} />

      {/*<!--breadcrumps-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs currentTitle={article.title} />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--content-body-->*/}
      <section id="content-body" className="">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          {/*<!--content body start here-->*/}

          <article className="overflow-hidden rounded-se-[50px] md:rounded-se-[80px] bg-[#C8ECEA]">

            {/* Featured image with teal frame */}
            <div className="rounded-se-[50px] md:rounded-se-[80px] border-[6px] md:border-8 border-[#14989A] overflow-hidden">
              <div className="relative aspect-[16/9] md:aspect-[16/5] w-full">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="px-5 py-8 sm:px-8 md:px-10 md:py-14 lg:pe-24">
              <header className="mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-[#14989A]">
                  {article.title}
                </h2>
                <time
                  dateTime={article.date}
                  className="mt-2 block text-lg md:text-2xl text-[#14989A]"
                >
                  {formatDate(article.date, locale)}
                </time>
              </header>

              <div className="space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed text-[#1E1E1E]">
                {article.body.map((para, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </article>

        </div>

        <div className="spacer-40"></div>
      </section>
    </div>
  );
}
