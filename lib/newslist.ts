export const allNews: NewsItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: `57-trainees-rabigh-${i + 1}`,
  category: "News & Articles",
  title: "57 Trainees finish EWA Program in Rabigh",
  excerpt:
    "Fifty seven trainees, 42 from Global Environment Management Services (GEMS) and 15 from Emad Khalid Bawazir (EKB) company, completed their technical training program at the Higher Institute for Water and Power Technologies (EWA). Their graduation ceremony was held at the EWA auditorium in Rabigh on March 1, 2023.",
  date: "2023-09-08",
  image: "/imgs/slides/media5.jpg",
  href: `/news/57-trainees-finish-ewa-program-${i + 1}`,
}));