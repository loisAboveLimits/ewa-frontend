import type { NewsItem } from "@/lib/news";
import { newsCategories } from "@/lib/news";
import type { Locale, Localized } from "@/lib/i18n/config";

const copy: Localized<{ title: string; excerpt: string }> = {
  en: {
    title: "57 Trainees finish EWA Program in Rabigh",
    excerpt:
      "Fifty seven trainees, 42 from Global Environment Management Services (GEMS) and 15 from Emad Khalid Bawazir (EKB) company, completed their technical training program at the Higher Institute for Water and Power Technologies (EWA). Their graduation ceremony was held at the EWA auditorium in Rabigh on March 1, 2023.",
  },
  ar: {
    title: "57 متدربًا يُتمّون برنامج الأكاديمية في رابغ",
    excerpt:
      "أتمّ سبعة وخمسون متدربًا، منهم 42 من شركة الخدمات العالمية لإدارة البيئة (GEMS) و15 من شركة عماد خالد باوزير (EKB)، برنامجهم التدريبي التقني في أكاديمية الطاقة والمياه (EWA)، وأُقيم حفل تخرجهم في قاعة الأكاديمية برابغ في 1 مارس 2023.",
  },
};

/** Placeholder list of 24 stories — replace with your CMS / API data. */
export const getAllNews = (locale: Locale): NewsItem[] =>
  Array.from({ length: 24 }, (_, i) => ({
    id: `57-trainees-rabigh-${i + 1}`,
    category: newsCategories[locale].news,
    title: copy[locale].title,
    excerpt: copy[locale].excerpt,
    date: "2023-09-08",
    image: "/imgs/slides/media5.jpg",
    href: `/media-center/news-articles/57-trainees-finish-ewa-program-${i + 1}`,
  }));
