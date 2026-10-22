// News data for the media-center news section. Replace with your CMS / API data.
import { formatDate, type Locale, type Localized } from "@/lib/i18n/config";

export type NewsItem = {
  id: string;
  category: string;
  title: string;
  excerpt?: string;
  date: string; // ISO date, e.g. "2023-09-08"
  image: string;
  href: string;
  /** label for the featured slide link, e.g. "Read her story" */
  ctaLabel?: string;
};

export const newsCategories: Localized<{ stories: string; events: string; news: string }> = {
  en: { stories: "Success Stories", events: "Events", news: "News & Articles" },
  ar: { stories: "قصص النجاح", events: "الفعاليات", news: "الأخبار والمقالات" },
};

const featured: Localized<NewsItem[]> = {
  en: [
    {
      id: "amani-al-saedi",
      category: newsCategories.en.stories,
      title: "Women Who Inspire: Meet Amani Al-Saedi",
      excerpt:
        "Meet Amani Al-Saedi from Madina, who holds a bachelor's degree in chemistry sciences and is studying water desalination plant operation at EWA with the support of the ENGIE company.",
      date: "2023-10-01",
      image: "/imgs/slides/media3.jpg",
      href: "/media-center/success-stories/amani-al-saedi",
      ctaLabel: "Read her story",
    },
    {
      id: "featured-2",
      category: newsCategories.en.events,
      title: "EWA Hosts Annual Graduation Ceremony",
      excerpt:
        "Trainees, families and industry partners gathered at Ghazi Al-Gosaibi Hall to celebrate the achievements of this year's graduating class.",
      date: "2023-09-20",
      image: "/imgs/slides/media5.jpg",
      href: "/media-center/news-articles/annual-graduation-ceremony",
    },
    {
      id: "featured-3",
      category: newsCategories.en.news,
      title: "New Renewable Energy Workshop Opens",
      excerpt:
        "The academy has opened a new tech-equipped workshop for solar and wind energy training, giving trainees hands-on experience with industry equipment.",
      date: "2023-09-12",
      image: "/imgs/slides/media4.jpg",
      href: "/media-center/news-articles/renewable-energy-workshop",
    },
  ],
  ar: [
    {
      id: "amani-al-saedi",
      category: newsCategories.ar.stories,
      title: "نساء مُلهِمات: تعرّف على أماني الصاعدي",
      excerpt:
        "تعرّف على أماني الصاعدي من المدينة المنورة، الحاصلة على درجة البكالوريوس في العلوم الكيميائية، والتي تدرس تشغيل محطات تحلية المياه في الأكاديمية بدعم من شركة إنجي.",
      date: "2023-10-01",
      image: "/imgs/slides/media3.jpg",
      href: "/media-center/success-stories/amani-al-saedi",
      ctaLabel: "اقرأ قصتها",
    },
    {
      id: "featured-2",
      category: newsCategories.ar.events,
      title: "الأكاديمية تحتفي بحفل التخرج السنوي",
      excerpt:
        "اجتمع المتدربون وأسرهم وشركاء الصناعة في قاعة غازي القصيبي للاحتفاء بإنجازات دفعة الخريجين لهذا العام.",
      date: "2023-09-20",
      image: "/imgs/slides/media5.jpg",
      href: "/media-center/news-articles/annual-graduation-ceremony",
    },
    {
      id: "featured-3",
      category: newsCategories.ar.news,
      title: "افتتاح ورشة جديدة للطاقة المتجددة",
      excerpt:
        "افتتحت الأكاديمية ورشة جديدة مجهّزة تقنيًا للتدريب على الطاقة الشمسية وطاقة الرياح، لتمنح المتدربين خبرة عملية على معدات الصناعة.",
      date: "2023-09-12",
      image: "/imgs/slides/media4.jpg",
      href: "/media-center/news-articles/renewable-energy-workshop",
    },
  ],
};

const latestTitle: Localized<string> = {
  en: "57 Trainees finish EWA Program in Rabigh",
  ar: "57 متدربًا يُتمّون برنامج الأكاديمية في رابغ",
};

const latestImages = ["/imgs/slides/slide2.jpg", "/imgs/slides/slide3.jpg", "/imgs/slides/slide1.jpg"];

export const getFeaturedNews = (locale: Locale): NewsItem[] => featured[locale];

export const getLatestNews = (locale: Locale): NewsItem[] =>
  latestImages.map((image, i) => ({
    id: `57-trainees-rabigh-${i + 1}`,
    category: newsCategories[locale].news,
    title: latestTitle[locale],
    date: "2023-09-08",
    image,
    href: "/media-center/news-articles/57-trainees-finish-ewa-program",
  }));

export const formatNewsDate = (iso: string, locale: Locale) => formatDate(iso, locale);
