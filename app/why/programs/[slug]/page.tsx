import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProgramModules, { type Module } from "@/components/ProgramModules";

/* ------------------------------------------------------------------ */
/*  Program data – swap for a CMS / lib/programs.ts lookup later       */
/* ------------------------------------------------------------------ */
const program = {
  title: "Facilities Management",
  subtitle: "Industrial Field - 24 Months Program",
  image: "/imgs/slides/slide1.jpg",
  description:
    "The Facilities Management Diploma is a two-year program that prepares students to maintain, operate, and manage the buildings and technical systems that keep industrial and energy facilities running safely and efficiently. Through a mix of classroom learning and hands-on training, students build practical skills in facility operations, preventive maintenance, safety, and team coordination. Graduates are ready to start careers as facilities technicians and supervisors, supporting the reliable day-to-day performance of industrial sites, power plants, and large commercial properties.",
  duration: "Twenty Four Months",
  type: "Diploma",
  eligibility: "High School Diploma,",
  nextIntake: "23rd September",
  credits: "3",
  location: "On-Site (Main Campus)",
  applyHref: "/join/registration",
};

const placeholderCourse = (name: string) => ({
  name,
  items: Array.from({ length: 3 }, () => ({ name: "[Module name]", credits: "[X]" })),
});

const modules: Module[] = [1, 2, 3, 4].map((n) => ({
  title: `Module ${n}`,
  courses: [placeholderCourse("Course 1"), placeholderCourse("Course 2")],
}));

export const metadata: Metadata = {
  title: program.title,
  description: program.subtitle,
};

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
export default function ProgramDetail() {
  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-programs.png)] bg-cover bg-center w-full vh-100">
        <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
          <div className="container mx-auto h-full px-4">
            <h1 className="flex h-full items-end banner-title">{program.title}</h1>
            <div className="spacer-10"></div>
            <p className="banner-subtitle">{program.subtitle}</p>
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

      {/*<!--content-body-->*/}
      <section id="content-body" className="">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">

          {/*<!--content body start here-->*/}

          {/* Overview: image | info card / description | details */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">

            {/* Image */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/7] w-full overflow-hidden rounded-tl-[60px] rounded-br-[60px] md:rounded-tl-[90px] md:rounded-br-[90px]">
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
              <div className="h-full rounded-tr-[60px] rounded-bl-[60px] border-2 border-[#14989A] border-b-[#F07B52] border-l-[#F07B52] bg-[#C8ECEA] px-6 py-8 md:rounded-tr-[90px] md:rounded-bl-[90px] md:px-12 md:py-10">
                <div className="flex flex-col justify-center gap-6 h-full">
                  <InfoRow icon={<ClockIcon />} label="Duration" value={program.duration} />
                  <InfoRow icon={<CalendarIcon />} label="Program Type" value={program.type} />
                  <InfoRow icon={<CertificateIcon />} label="Eligibility" value={program.eligibility} />
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
            <div className="lg:col-span-4 flex flex-col gap-6 sm:px-6 md:px-16 lg:px-16">
              <DetailItem label="Next Intake" value={program.nextIntake} />
              <DetailItem label="Credits" value={program.credits} />
              <DetailItem label="Location" value={program.location} />
            </div>
          </div>

          {/* Modules heading + Apply */}
          <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-10">
            <div className="order-2 lg:order-1 lg:col-span-8 flex items-center gap-4">
              <ModulesMark />
              <h2 className="text-2xl md:text-4xl font-semibold text-[#14989A]">Program Modules</h2>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-4 lg:self-start">
              <Link
                href={program.applyHref}
                className="block w-full rounded-2xl bg-[#F07B52] px-6 py-4 text-center text-lg md:text-xl font-semibold text-white transition hover:bg-[#e2683d] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F07B52]/40"
              >
                Apply to this course
              </Link>
            </div>
          </div>

          {/* Accordion */}
          <div className="mt-8">
            <ProgramModules modules={modules} />
          </div>

        </div>

        <div className="spacer-40"></div>
      </section>
    </div>
  );
}
