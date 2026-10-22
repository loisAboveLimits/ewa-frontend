import type { Locale, Localized } from "@/lib/i18n/config";

export type FilterCategory = {
  id: string;
  parent: string;
  children: { id: string; name: string }[];
};

const categories: Localized<FilterCategory[]> = {
  en: [
    {
      id: "p1",
      parent: "Program Type",
      children: [
        { id: "c1", name: "Diploma Programs" },
        { id: "c2", name: "Short Courses" },
        { id: "c3", name: "Summer Courses" },
        { id: "c4", name: "Qualification Programs" },
      ],
    },
    {
      id: "p2",
      parent: "Duration",
      children: [
        { id: "c5", name: "Less than 1 month" },
        { id: "c6", name: "1-3 months" },
        { id: "c7", name: "3-6 months" },
        { id: "c8", name: "More than 6 months" },
      ],
    },
    {
      id: "p3",
      parent: "Industry",
      children: [
        { id: "c9", name: "Energy" },
        { id: "c10", name: "Water" },
        { id: "c11", name: "Environment" },
        { id: "c12", name: "Other" },
      ],
    },
    {
      id: "p4",
      parent: "Eligibility",
      children: [
        { id: "c13", name: "All levels" },
        { id: "c14", name: "High School" },
        { id: "c15", name: "Undergraduate" },
        { id: "c16", name: "Graduate" },
      ],
    },
  ],
  ar: [
    {
      id: "p1",
      parent: "نوع البرنامج",
      children: [
        { id: "c1", name: "برامج الدبلوم" },
        { id: "c2", name: "الدورات القصيرة" },
        { id: "c3", name: "الدورات الصيفية" },
        { id: "c4", name: "البرامج التأهيلية" },
      ],
    },
    {
      id: "p2",
      parent: "المدة",
      children: [
        { id: "c5", name: "أقل من شهر" },
        { id: "c6", name: "1-3 أشهر" },
        { id: "c7", name: "3-6 أشهر" },
        { id: "c8", name: "أكثر من 6 أشهر" },
      ],
    },
    {
      id: "p3",
      parent: "القطاع",
      children: [
        { id: "c9", name: "الطاقة" },
        { id: "c10", name: "المياه" },
        { id: "c11", name: "البيئة" },
        { id: "c12", name: "أخرى" },
      ],
    },
    {
      id: "p4",
      parent: "شروط القبول",
      children: [
        { id: "c13", name: "جميع المستويات" },
        { id: "c14", name: "الثانوية العامة" },
        { id: "c15", name: "طالب جامعي" },
        { id: "c16", name: "خريج جامعي" },
      ],
    },
  ],
};

export const getCategories = (locale: Locale) => categories[locale];
