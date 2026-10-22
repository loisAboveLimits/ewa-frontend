// Gallery images for the ticker. `ratio` = width / height of the thumbnail frame
// (the design uses wide, standard and tall-narrow frames). Put files in public/imgs/gallery/.
import type { Locale, Localized } from "@/lib/i18n/config";

export type GalleryImage = {
  src: string;
  alt: string;
  ratio: number;
};

const rows: { src: string; ratio: number; alt: Localized<string> }[][] = [
  [
    {
      src: "/imgs/slides/media1.jpg",
      ratio: 1.75,
      alt: { en: "Trainee using a VR headset in the simulator room", ar: "متدرب يستخدم نظارة الواقع الافتراضي في غرفة المحاكاة" },
    },
    {
      src: "/imgs/slides/media2.jpg",
      ratio: 2.3,
      alt: { en: "Female trainees in hard hats working in a lab", ar: "متدربات يرتدين خوذات السلامة أثناء العمل في المعمل" },
    },
    {
      src: "/imgs/slides/media3.jpg",
      ratio: 1.75,
      alt: { en: "Shaded parking area on campus", ar: "مواقف سيارات مظللة في الحرم" },
    },
  ],
  [
    {
      src: "/imgs/slides/slide1.jpg",
      ratio: 0.72,
      alt: { en: "Large EWA letters at the academy entrance", ar: "أحرف EWA الكبيرة عند مدخل الأكاديمية" },
    },
    {
      src: "/imgs/slides/slide2.jpg",
      ratio: 0.76,
      alt: { en: "EWA logo on the entrance pillar with palm trees", ar: "شعار الأكاديمية على عمود المدخل بين أشجار النخيل" },
    },
    {
      src: "/imgs/slides/slide3.jpg",
      ratio: 3.5,
      alt: { en: "Main gate and welcome sign of the Energy & Water Academy", ar: "البوابة الرئيسية ولوحة الترحيب في أكاديمية الطاقة والمياه" },
    },
  ],
];

export const getGalleryRows = (locale: Locale): GalleryImage[][] =>
  rows.map((row) => row.map(({ src, ratio, alt }) => ({ src, ratio, alt: alt[locale] })));
