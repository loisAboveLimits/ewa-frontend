import type { ReactNode } from "react";
import type { SlideImage } from "@/components/facilities/FacilitySlider";

export type Facility = {
  id: string;
  title: string;
  images: SlideImage[];
  content: ReactNode;
};

/**
 * Builds /imgs/campus/<id>-1.jpg … <id>-N.jpg
 * Drop your photos into public/imgs/campus/ with these names, or replace with explicit arrays.
 */
const gallery = (id: string, title: string, count = 3): SlideImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/imgs/slides/slide${i + 1}.jpg`,
    alt: `${title} – photo ${i + 1}`,
  }));

export const facilities: Facility[] = [
  {
    id: "ghazi-al-gosaibi-hall",
    title: "Ghazi Al-Gosaibi Hall",
    images: gallery("ghazi-al-gosaibi-hall", "Ghazi Al-Gosaibi Hall"),
    content: (
      <p>
        A modern, well-equipped auditorium with a capacity of up to 400 people. Designed for official events like
        lectures, graduations, awards, and academic/community gatherings. Its versatility makes it a central venue for
        knowledge-sharing and celebration.
      </p>
    ),
  },
  {
    id: "classrooms",
    title: "Our Classrooms",
    images: gallery("classrooms", "Classrooms"),
    content: (
      <p>
        Two academic buildings with state-of-the-art learning tools and interactive smart boards that enhance trainee
        engagement, access to digital resources, and usage of advanced educational software. A place where knowledge is
        built into practical skills for job readiness.
      </p>
    ),
  },
  {
    id: "library",
    title: "The Library",
    images: gallery("library", "The Library"),
    content: (
      <p>
        The training course enables its trainees to get hands-on experience in an academic library. It gives them the
        opportunity to spend time improving their literacy, especially in English. The library is located on the ground
        floor of Academic Building B of the institute.
      </p>
    ),
  },
  {
    id: "computer-labs",
    title: "Computer Labs",
    images: gallery("computer-labs", "Computer Labs"),
    content: (
      <p>
        There are four EWA computer labs across campus. They serve as physical learning and study destinations,
        providing trainees with the latest and greatest computing tools, software, printing, and other technology
        resources to accomplish their academic goals for instruction, research, and presentation. These labs are also
        used for regularly scheduled computer classes, summer online courses, online exams, and certification programs
        related to VSE, Takamol, and CWQAT Saudi Aramco that need online testing.
      </p>
    ),
  },
  {
    id: "simulator-room",
    title: "Simulator Room",
    images: gallery("simulator-room", "Simulator Room"),
    content: (
      <>
        <p>Simulator training is one of the institute&apos;s specialized programs. It has two areas:</p>
        <ol>
          <li>
            For local and CCR operators, the Workshop&apos;s Process Area houses simulations for combined cycle gas
            turbines, thermal power, and reverse osmosis.
          </li>
          <li>
            A virtual reality welding training simulator is used to augment the training of trainees in the welding
            course and it&apos;s located in the Mechanical Workshop.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "workshops",
    title: "Our Various Workshops",
    images: gallery("workshops", "Workshops"),
    content: (
      <>
        <p>
          A core part of EWA&apos;s training journey, where theoretical knowledge is applied practically. Divided into
          six specialty areas:
        </p>
        <ul>
          <li>Electricity</li>
          <li>Operations</li>
          <li>Desalination</li>
          <li>Innovation &amp; Creativity Center</li>
          <li>Renewable Energy</li>
          <li>Welding</li>
        </ul>
        <p>
          These are interactive, tech-equipped spaces, including virtual reality tools for hands-on, advanced learning.
        </p>
      </>
    ),
  },
  {
    id: "accommodation",
    title: "Accommodation",
    images: gallery("accommodation", "Accommodation"),
    content: (
      <p>
        Fully-equipped accommodation for male and female trainees with all comfort and safety measures. Includes
        furnished rooms with private bathrooms, lounges, kitchens, internet, laundry rooms, and safety systems
        (monitoring and alarms).
      </p>
    ),
  },
  {
    id: "sports-recreation",
    title: "Sports & Recreation",
    images: gallery("sports-recreation", "Sports & Recreation"),
    content: (
      <>
        <ul>
          <li>A football field next to the gym</li>
          <li>Volleyball court</li>
          <li>Basketball court</li>
          <li>Swimming pool</li>
          <li>Fitness club for trainees</li>
        </ul>
        <p>
          Trainees can unwind after training sessions and participate in regular sports tournaments across various
          games like football and volleyball as part of the Academy&apos;s extracurricular engagement.
        </p>
      </>
    ),
  },
  {
    id: "parking-areas",
    title: "Parking Areas",
    images: gallery("parking-areas", "Parking Areas"),
    // NOTE: copy below is as it appears in the design — it describes housing, not parking. Confirm with the client.
    content: (
      <>
        <p>
          The institute provides accommodation for its trainees as well as for staff and guests. The housing is split
          into Building A and Building B.
        </p>
        <p>
          Each building offers fully furnished rooms with attached bathrooms, as well as kitchens and household
          equipment that are available. The building has internet access, laundry rooms, security cameras, and fire
          safety features.
        </p>
      </>
    ),
  },
  {
    id: "canteen",
    title: "Canteen",
    images: gallery("canteen", "Canteen"),
    content: (
      <p>
        The campus has a canteen for staff and trainees, which is nearby the football field. It has a special dining
        area for visitors to the institute. The canteen offers a wide range of food, freshly cooked and prepared, and
        attention is paid to quality. It serves breakfast, lunch, and dinner.
      </p>
    ),
  },
  {
    id: "masjid",
    title: "Masjid",
    images: gallery("masjid", "Masjid"),
    content: (
      <p>
        The institute has a masjid where staff and trainees perform obligatory prayers. It is close to the accommodation
        in Building A.
      </p>
    ),
  },
];
