// Programs listed on /why/programs. Replace with your CMS / API data.
import type { Locale, Localized } from "@/lib/i18n/config";

export type Program = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
};

type ProgramBase = Pick<Program, "id" | "image" | "link">;
type ProgramCopy = Pick<Program, "title" | "category" | "description">;

const base: ProgramBase[] = [
  { id: "ic-troubleshooting", image: "/imgs/bgs/campus-tech.png", link: "/why/programs/instrument-control-troubleshooting" },
  { id: "electrical-maintenance", image: "/imgs/bgs/campus-simulation.png", link: "/why/programs/electrical-maintenance" },
  { id: "mechanical-pumps", image: "/imgs/bgs/campus-spaces.png", link: "/why/programs/pumps-rotating-equipment" },
  { id: "water-desalination", image: "/imgs/bgs/why-sec1.jpg", link: "/why/programs/desalination-plant-operations" },
  { id: "power-plant-ops", image: "/imgs/bgs/home-courses.jpg", link: "/why/programs/power-plant-operations" },
  { id: "hse-essentials", image: "/imgs/bgs/glance.jpg", link: "/why/programs/hse-essentials" },
  { id: "solar-pv", image: "/imgs/bgs/about-sec1.jpg", link: "/why/programs/solar-pv" },
  { id: "summer-stem", image: "/imgs/bgs/home-about-bg.jpg", link: "/why/programs/summer-stem" },
];

const copy: Localized<Record<string, ProgramCopy>> = {
  en: {
    "ic-troubleshooting": {
      title: "Instrument & Control Troubleshooting",
      category: "Technical Course – I&C Field",
      description: "Build practical skills in industrial instrumentation, control systems, PLCs, and troubleshooting.",
    },
    "electrical-maintenance": {
      title: "Electrical Maintenance Fundamentals",
      category: "Technical Course – Electrical Field",
      description: "Learn safe isolation, motor control circuits, testing equipment and preventive maintenance.",
    },
    "mechanical-pumps": {
      title: "Pumps & Rotating Equipment",
      category: "Technical Course – Mechanical Field",
      description: "Understand pump operation, alignment, seals and vibration basics for rotating machinery.",
    },
    "water-desalination": {
      title: "Desalination Plant Operations",
      category: "Diploma Program – Water Field",
      description: "Operate reverse-osmosis and thermal desalination units, from intake to product water quality.",
    },
    "power-plant-ops": {
      title: "Power Plant Operations",
      category: "Diploma Program – Energy Field",
      description: "Gain hands-on knowledge of boilers, turbines, generators and control-room procedures.",
    },
    "hse-essentials": {
      title: "Health, Safety & Environment Essentials",
      category: "Short Course – HSE",
      description: "Apply permit-to-work, risk assessment and incident reporting in industrial sites.",
    },
    "solar-pv": {
      title: "Solar PV Installation & Maintenance",
      category: "Short Course – Renewable Energy",
      description: "Design, install and maintain grid-tied photovoltaic systems to international standards.",
    },
    "summer-stem": {
      title: "Summer STEM Discovery",
      category: "Summer Course – High School",
      description: "Explore energy and water engineering through labs, site visits and team projects.",
    },
  },
  ar: {
    "ic-troubleshooting": {
      title: "تشخيص أعطال أجهزة القياس والتحكم",
      category: "دورة تقنية – مجال القياس والتحكم",
      description: "اكتسب مهارات عملية في أجهزة القياس الصناعية وأنظمة التحكم ووحدات PLC وتشخيص الأعطال.",
    },
    "electrical-maintenance": {
      title: "أساسيات الصيانة الكهربائية",
      category: "دورة تقنية – المجال الكهربائي",
      description: "تعلّم العزل الآمن ودوائر التحكم في المحركات وأجهزة الاختبار والصيانة الوقائية.",
    },
    "mechanical-pumps": {
      title: "المضخات والمعدات الدوّارة",
      category: "دورة تقنية – المجال الميكانيكي",
      description: "افهم تشغيل المضخات والمحاذاة والموانع وأساسيات الاهتزاز في الآلات الدوّارة.",
    },
    "water-desalination": {
      title: "تشغيل محطات التحلية",
      category: "برنامج دبلوم – مجال المياه",
      description: "شغّل وحدات التحلية بالتناضح العكسي والتحلية الحرارية، من مأخذ المياه حتى جودة المياه المنتجة.",
    },
    "power-plant-ops": {
      title: "تشغيل محطات الطاقة",
      category: "برنامج دبلوم – مجال الطاقة",
      description: "اكتسب معرفة عملية بالغلايات والتوربينات والمولدات وإجراءات غرفة التحكم.",
    },
    "hse-essentials": {
      title: "أساسيات الصحة والسلامة والبيئة",
      category: "دورة قصيرة – الصحة والسلامة والبيئة",
      description: "طبّق تصاريح العمل وتقييم المخاطر والإبلاغ عن الحوادث في المواقع الصناعية.",
    },
    "solar-pv": {
      title: "تركيب وصيانة الأنظمة الكهروضوئية",
      category: "دورة قصيرة – الطاقة المتجددة",
      description: "صمّم وركّب وصِن أنظمة الطاقة الشمسية الكهروضوئية المرتبطة بالشبكة وفق المعايير الدولية.",
    },
    "summer-stem": {
      title: "برنامج اكتشاف العلوم الصيفي",
      category: "دورة صيفية – المرحلة الثانوية",
      description: "استكشف هندسة الطاقة والمياه من خلال المعامل والزيارات الميدانية والمشاريع الجماعية.",
    },
  },
};

export const getPrograms = (locale: Locale): Program[] => base.map((p) => ({ ...p, ...copy[locale][p.id] }));
