// Course catalogue shown on the "Apply" step.
// Replace with data from your API/CMS — credit values here are placeholders.
import type { Locale, Localized } from "@/lib/i18n/config";

export type CourseField = "Industrial" | "Energy" | "Safety";

export type Course = {
  id: string;
  title: string;
  /** stable key — translate with t.registration.courses.fields[field] */
  field: CourseField;
  durationMonths: number;
  credits: number;
  description: string;
  href?: string; // optional "Read More" page
};

type CourseBase = Omit<Course, "title" | "description">;
type CourseCopy = Pick<Course, "title" | "description">;

const base: CourseBase[] = [
  { id: "facilities-management", field: "Industrial", durationMonths: 24, credits: 60 },
  { id: "instrumentation-control-maintenance", field: "Industrial", durationMonths: 24, credits: 60 },
  { id: "renewable-energy-technology", field: "Energy", durationMonths: 24, credits: 60 },
  { id: "diesel-engine-operation", field: "Energy", durationMonths: 24, credits: 60 },
  { id: "firefighting", field: "Safety", durationMonths: 12, credits: 30 },
  { id: "instrument-control-troubleshooting", field: "Industrial", durationMonths: 12, credits: 30 },
];

const copy: Localized<Record<string, CourseCopy>> = {
  en: {
    "facilities-management": {
      title: "Facilities Management",
      description:
        "The 2-Year Facility Management Diploma Program is designed to provide students with comprehensive training in the maintenance, operation, and management of building systems, equipment, and services across industrial and commercial facilities.",
    },
    "instrumentation-control-maintenance": {
      title: "Instrumentation & Control Maintenance",
      description:
        "Compliance with the technical professional standard required in the national industry for instrument maintenance technicians. The program supports trainees in calibrating, maintaining and repairing measurement and control instruments used in plants.",
    },
    "renewable-energy-technology": {
      title: "Renewable Energy Technology",
      description:
        "Compliance with the technical professional standard required in the national industry for maintenance technicians. The program supports training in both solar and wind energy systems, from installation to operation and maintenance.",
    },
    "diesel-engine-operation": {
      title: "Diesel Engine Operation Technology",
      description:
        "The Diesel Engine Operation Program at the EWA is designed to meet the needs of the industry, power plants, and has taken into consideration the technical skills required to operate and maintain large diesel engines safely and efficiently.",
    },
    firefighting: {
      title: "Firefighting",
      description:
        "The Fire-fighter Training Program of the Energy & Water Academy is designed to meet the needs for firefighters of the industry and power plants and develops the practical skills needed for fire prevention, response and rescue.",
    },
    "instrument-control-troubleshooting": {
      title: "Instrument & Control Troubleshooting",
      description:
        "An applied program focused on diagnosing and resolving faults in instrumentation and control loops, using industry-standard tools and structured troubleshooting methods.",
    },
  },
  ar: {
    "facilities-management": {
      title: "إدارة المرافق",
      description:
        "صُمّم برنامج دبلوم إدارة المرافق، ومدته سنتان، لتزويد المتدربين بتدريب شامل في صيانة أنظمة المباني ومعداتها وخدماتها وتشغيلها وإدارتها في المنشآت الصناعية والتجارية.",
    },
    "instrumentation-control-maintenance": {
      title: "صيانة أجهزة القياس والتحكم",
      description:
        "يستوفي البرنامج المعيار المهني التقني المطلوب في الصناعة الوطنية لفنيي صيانة أجهزة القياس، ويدعم المتدربين في معايرة أجهزة القياس والتحكم المستخدمة في المحطات وصيانتها وإصلاحها.",
    },
    "renewable-energy-technology": {
      title: "تقنية الطاقة المتجددة",
      description:
        "يستوفي البرنامج المعيار المهني التقني المطلوب في الصناعة الوطنية لفنيي الصيانة، ويشمل التدريب على أنظمة الطاقة الشمسية وطاقة الرياح، بدءًا من التركيب وحتى التشغيل والصيانة.",
    },
    "diesel-engine-operation": {
      title: "تقنية تشغيل محركات الديزل",
      description:
        "صُمّم برنامج تشغيل محركات الديزل في الأكاديمية لتلبية احتياجات الصناعة ومحطات الطاقة، مع مراعاة المهارات التقنية اللازمة لتشغيل محركات الديزل الكبيرة وصيانتها بأمان وكفاءة.",
    },
    firefighting: {
      title: "مكافحة الحرائق",
      description:
        "صُمّم برنامج تدريب رجال الإطفاء في أكاديمية الطاقة والمياه لتلبية احتياج الصناعة ومحطات الطاقة من رجال الإطفاء، ويطوّر المهارات العملية اللازمة للوقاية من الحرائق والاستجابة لها وعمليات الإنقاذ.",
    },
    "instrument-control-troubleshooting": {
      title: "تشخيص أعطال أجهزة القياس والتحكم",
      description:
        "برنامج تطبيقي يركّز على تشخيص الأعطال في أجهزة القياس وحلقات التحكم ومعالجتها، باستخدام أدوات قياسية معتمدة في الصناعة وأساليب منهجية لتحرّي الأعطال.",
    },
  },
};

export const getCourses = (locale: Locale): Course[] => base.map((c) => ({ ...c, ...copy[locale][c.id] }));

export const courseFields = ["Industrial", "Energy", "Safety"] as const;
