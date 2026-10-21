// Gallery images for the ticker. `ratio` = width / height of the thumbnail frame
// (the design uses wide, standard and tall-narrow frames). Put files in public/imgs/gallery/.

export type GalleryImage = {
  src: string;
  alt: string;
  ratio: number;
};

export const galleryRows: GalleryImage[][] = [
  [
    { src: "/imgs/slides/media1.jpg", alt: "Trainee using a VR headset in the simulator room", ratio: 1.75 },
    { src: "/imgs/slides/media2.jpg", alt: "Female trainees in hard hats working in a lab", ratio: 2.3 },
    { src: "/imgs/slides/media3.jpg", alt: "Shaded parking area on campus", ratio: 1.75 },
  ],
  [
    { src: "/imgs/slides/slide1.jpg", alt: "Large EWA letters at the academy entrance", ratio: 0.72 },
    { src: "/imgs/slides/slide2.jpg", alt: "EWA logo on the entrance pillar with palm trees", ratio: 0.76 },
    { src: "/imgs/slides/slide3.jpg", alt: "Main gate and welcome sign of the Energy & Water Academy", ratio: 3.5 },
  ],
];
