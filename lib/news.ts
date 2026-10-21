// News data for the home-page news section. Replace with your CMS / API data.

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

export const featuredNews: NewsItem[] = [
  {
    id: "amani-al-saedi",
    category: "Success Stories",
    title: "Women Who Inspire: Meet Amani Al-Saedi",
    excerpt:
      "Meet Amani Al-Saedi from Madina, who holds a bachelor's degree in chemistry sciences and is studying water desalination plant operation at EWA with the support of the ENGIE company.",
    date: "2023-10-01",
    image: "/imgs/slides/media3.jpg",
    href: "/success-stories/amani-al-saedi",
    ctaLabel: "Read her story",
  },
  {
    id: "featured-2",
    category: "Events",
    title: "EWA Hosts Annual Graduation Ceremony",
    excerpt:
      "Trainees, families and industry partners gathered at Ghazi Al-Gosaibi Hall to celebrate the achievements of this year's graduating class.",
    date: "2023-09-20",
    image: "/imgs/slides/media5.jpg",
    href: "/news/annual-graduation-ceremony",
  },
  {
    id: "featured-3",
    category: "News & Articles",
    title: "New Renewable Energy Workshop Opens",
    excerpt:
      "The academy has opened a new tech-equipped workshop for solar and wind energy training, giving trainees hands-on experience with industry equipment.",
    date: "2023-09-12",
    image: "/imgs/slides/media4.jpg",
    href: "/news/renewable-energy-workshop",
  },
];

export const latestNews: NewsItem[] = [
  {
    id: "57-trainees-rabigh-1",
    category: "News & Articles",
    title: "57 Trainees finish EWA Program in Rabigh",
    date: "2023-09-08",
    image: "/imgs/slides/slide2.jpg",
    href: "/news/57-trainees-finish-ewa-program",
  },
  {
    id: "57-trainees-rabigh-2",
    category: "News & Articles",
    title: "57 Trainees finish EWA Program in Rabigh",
    date: "2023-09-08",
    image: "/imgs/slides/slide3.jpg",
    href: "/news/57-trainees-finish-ewa-program",
  },
  {
    id: "57-trainees-rabigh-3",
    category: "News & Articles",
    title: "57 Trainees finish EWA Program in Rabigh",
    date: "2023-09-08",
    image: "/imgs/slides/slide1.jpg",
    href: "/news/57-trainees-finish-ewa-program",
  },
];

export const formatNewsDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso)
  );
