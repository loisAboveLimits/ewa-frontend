import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import ProgramModules, { type Module } from "@/components/ProgramModules";
import { fmt, type Localized } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";

/* ------------------------------------------------------------------ */
/*  Program data – swap for a CMS / lib/programs.ts lookup later       */
/* ------------------------------------------------------------------ */
const programs: Localized<{
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  type: string;
  eligibility: string;
  nextIntake: string;
  location: string;
}> = {
  en: {
    title: "Facilities Management",
    subtitle: "Industrial Field - 24 Months Program",
    description:
      "The Facilities Management Diploma is a two-year program that prepares students to maintain, operate, and manage the buildings and technical systems that keep industrial and energy facilities running safely and efficiently. Through a mix of classroom learning and hands-on training, students build practical skills in facility operations, preventive maintenance, safety, and team coordination. Graduates are ready to start careers as facilities technicians and supervisors, supporting the reliable day-to-day performance of industrial sites, power plants, and large commercial properties.",
    duration: "Twenty Four Months",
    type: "Diploma",
    eligibility: "High School Diploma",
    nextIntake: "23rd September",
    location: "On-Site (Main Campus)",
  },
  ar: {
    title: "إدارة المرافق",
    subtitle: "المجال الصناعي - برنامج مدته 24 شهرًا",
    description:
      "دبلوم إدارة المرافق برنامج مدته سنتان يؤهّل المتدربين لصيانة المباني والأنظمة التقنية وتشغيلها وإدارتها، وهي الأنظمة التي تحافظ على تشغيل المنشآت الصناعية ومنشآت الطاقة بأمان وكفاءة. ومن خلال الجمع بين التعلّم في القاعات والتدريب العملي، يكتسب المتدربون مهارات تطبيقية في تشغيل المرافق والصيانة الوقائية والسلامة وتنسيق فرق العمل. ويكون الخريجون مستعدين لبدء مسيرتهم المهنية فنيين ومشرفين للمرافق، داعمين الأداء اليومي الموثوق للمواقع الصناعية ومحطات الطاقة والمنشآت التجارية الكبرى.",
    duration: "أربعة وعشرون شهرًا",
    type: "دبلوم",
    eligibility: "شهادة الثانوية العامة",
    nextIntake: "23 سبتمبر",
    location: "حضوري (الحرم الرئيسي)",
  },
};

const programMeta = {
  image: "/imgs/slides/slide1.jpg",
  credits: "3",
  applyHref: "/join/registration",
};

function buildModules(t: Dictionary["programDetail"]): Module[] {
  const placeholderCourse = (n: number) => ({
    name: fmt(t.course, { n }),
    items: Array.from({ length: 3 }, () => ({ name: t.moduleName, credits: "[X]" })),
  });
  return [1, 2, 3, 4].map((n) => ({
    title: fmt(t.module, { n }),
    courses: [placeholderCourse(1), placeholderCourse(2)],
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  return { title: programs[locale].title, description: programs[locale].subtitle };
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
const iconProps = {
  className: "h-9 w-9 md:h-11 md:w-11 shrink-0 text-[#14989A]",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const ClockIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
    <path d="M3 3.5V7h3.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

const CalendarIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

const CertificateIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M14 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
    <path d="M8 8h8M8 12h4" />
    <circle cx="18" cy="16" r="2.5" />
    <path d="m16.8 18.2-.8 3.3 2-1 2 1-.8-3.3" />
  </svg>
);

const ModulesMark = () => (
  <svg viewBox="0 0 40 80" className="h-14 w-7 md:h-20 md:w-10 shrink-0" aria-hidden="true">
    <path d="M24 2c8 6 6 22-4 26C14 20 16 8 24 2Z" fill="#14989A" />
    <path d="M14 34c14 4 22 22 12 42C10 70 2 48 14 34Z" fill="#14989A" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      {icon}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-[#14989A] leading-tight">{label}</h3>
        <p className="text-sm md:text-base text-[#14989A]">{value}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-semibold text-[#14989A] leading-tight">{label}</h3>
      <p className="mt-1 text-sm md:text-base text-[#14989A]">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function ProgramDetail() {
  const { locale, t } = await getI18n();
  const d = t.programDetail;
  const program = { ...programs[locale], ...programMeta };
  const modules = buildModules(d);

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-programs.png" title={program.title} subtitle={program.subtitle} />

      {/*<!--breadcrumps-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs currentTitle={program.title} />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--content-body-->*/}
      <section id="content-body" className="">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          {/*<!--content body start here-->*/}

          {/* Overview: image | info card / description | details */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">

            {/* Image */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] md:aspect-[16/7] w-full overflow-hidden rounded-ss-[60px] rounded-ee-[60px] md:rounded-ss-[90px] md:rounded-ee-[90px]">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info card */}
            <aside className="lg:col-span-4">
              <div className="h-full rounded-se-[60px] rounded-es-[60px] border-2 border-[#14989A] border-b-[#F07B52] border-s-[#F07B52] bg-[#C8ECEA] px-6 py-8 md:rounded-se-[90px] md:rounded-es-[90px] md:px-12 md:py-10">
                <div className="flex flex-col justify-center gap-6 h-full">
                  <InfoRow icon={<ClockIcon />} label={d.duration} value={program.duration} />
                  <InfoRow icon={<CalendarIcon />} label={d.type} value={program.type} />
                  <InfoRow icon={<CertificateIcon />} label={d.eligibility} value={program.eligibility} />
                </div>
              </div>
            </aside>

            {/* Description */}
            <div className="lg:col-span-8">
              <p className="text-base md:text-lg font-semibold leading-relaxed text-[#14989A]">
                {program.description}
              </p>
            </div>

            {/* Details + CTA */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:flex lg:flex-col lg:px-16">
              <DetailItem label={d.nextIntake} value={program.nextIntake} />
              <DetailItem label={d.credits} value={program.credits} />
              <DetailItem label={d.location} value={program.location} />
            </div>
          </div>

          {/* Modules heading + Apply */}
          <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-10">
            <div className="order-2 lg:order-1 lg:col-span-8 flex items-center gap-4">
              <ModulesMark />
              <h2 className="text-2xl md:text-4xl font-semibold text-[#14989A]">{d.modules}</h2>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-4 lg:self-start">
              <Link
                href={program.applyHref}
                className="block w-full rounded-2xl bg-[#F07B52] px-6 py-4 text-center text-lg md:text-xl font-semibold text-white transition hover:bg-[#e2683d] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F07B52]/40"
              >
                {d.apply}
              </Link>
            </div>
          </div>

          {/* Accordion */}
          <div className="mt-8">
            <ProgramModules modules={modules} creditsLabel={d.creditsSuffix} />
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>
    </div>
  );
}
