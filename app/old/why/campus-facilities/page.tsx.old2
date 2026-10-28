import FacilitySection, { type Facility } from "@/components/facilities/FacilitySection";

export const metadata = {
  title: "Campus Facilities",
};

// Add as many photos per facility as you like — each section gets its own slider.
const facilities: Facility[] = [
  {
    title: "Ghazi Al-Gosaibi Hall",
    images: ["/imgs/facilities/hall-1.jpg", "/imgs/facilities/hall-2.jpg"],
    body: (
      <p>
        A modern, well-equipped auditorium with a capacity of up to 400 people. Designed for official
        events like lectures, graduations, awards, and academic/community gatherings. Its versatility
        makes it a central venue for knowledge-sharing and celebration.
      </p>
    ),
  },
  {
    title: "Our Classrooms",
    images: ["/imgs/facilities/classrooms-1.jpg", "/imgs/facilities/classrooms-2.jpg"],
    body: (
      <p>
        Two academic buildings with state-of-the-art learning tools and interactive smart boards that
        enhance trainee engagement, access to digital resources, and usage of advanced educational
        software. A place where knowledge is built into practical skills for job readiness.
      </p>
    ),
  },
  {
    title: "The Library",
    images: ["/imgs/facilities/library-1.jpg", "/imgs/facilities/library-2.jpg"],
    body: (
      <p>
        The training course enables its trainees to get hands-on experience in an academic library. It
        gives them the opportunity to spend time improving their literacy, especially in English. The
        library is located on the ground floor of Academic Building B of the institute.
      </p>
    ),
  },
  {
    title: "Computer Labs",
    images: ["/imgs/facilities/labs-1.jpg", "/imgs/facilities/labs-2.jpg"],
    body: (
      <p>
        There are four AWE computer labs across campus. They serve as physical learning and study
        destinations, providing trainees with the latest and greatest computing tools, software,
        printing and other technology resources to accomplish their academic goals for instruction,
        research, and presentation. These lab rooms are also used for regularly scheduled computer
        classes, summer online courses, online exams, and certification programs related to HSE,
        Tokamol, and CWQAP Saudi Aramco that need online testing.
      </p>
    ),
  },
  {
    title: "Simulator Room",
    images: ["/imgs/facilities/simulator-1.jpg", "/imgs/facilities/simulator-2.jpg"],
    body: (
      <>
        <p>Simulator training is one of the institute&apos;s specialized programs. It has two areas:</p>
        <p className="mt-3">
          1- For local and CCR operators, the Workshop&apos;s Process Area houses simulations for
          combined cycle gas turbines, thermal power, and reverse osmosis.
        </p>
        <p className="mt-3">
          2- A virtual reality welding training simulator is used to augment the training of trainees
          in the welding course and it is located in the Mechanical Workshop.
        </p>
      </>
    ),
  },
  {
    title: "Our Various Workshops",
    images: ["/imgs/facilities/workshops-1.jpg", "/imgs/facilities/workshops-2.jpg"],
    body: (
      <>
        <p>
          A core part of EWA&apos;s training journey, where theoretical knowledge is applied
          practically. Divided into six specialty areas:
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
          These are interactive, tech-equipped spaces, including virtual reality tools for hands-on,
          advanced learning.
        </p>
      </>
    ),
  },
  {
    title: "Accommodation",
    images: ["/imgs/facilities/accommodation-1.jpg", "/imgs/facilities/accommodation-2.jpg"],
    body: (
      <p>
        Fully-equipped accommodation for male and female trainees with all comfort and safety
        measures. Includes furnished rooms with private bathrooms, lounges, kitchens, internet, laundry
        rooms, and safety systems (monitoring and alarms).
      </p>
    ),
  },
  {
    title: "Sports & Recreation",
    images: ["/imgs/facilities/sports-1.jpg", "/imgs/facilities/sports-2.jpg"],
    body: (
      <>
        <ul>
          <li>A football field next to the gym</li>
          <li>Volleyball court</li>
          <li>Basketball court</li>
          <li>Swimming pool</li>
          <li>Fitness club for trainees</li>
        </ul>
        <p>
          Trainees can unwind after training sessions and participate in regular sports tournaments
          across various games like football and volleyball as part of the Academy&apos;s
          extracurricular engagement.
        </p>
      </>
    ),
  },
  {
    title: "Parking Areas",
    images: ["/imgs/facilities/parking-1.jpg", "/imgs/facilities/parking-2.jpg"],
    body: (
      <>
        <p>
          The institute provides accommodation for its trainees as well as for staff and guests. The
          housing is split into Building A and Building B.
        </p>
        <p className="mt-3">
          Each building offers fully furnished rooms with attached bathrooms, as well as kitchens and
          household equipment that are available. The building has internet access, laundry rooms,
          security cameras, and fire safety features.
        </p>
      </>
    ),
  },
  {
    title: "Canteen",
    images: ["/imgs/facilities/canteen-1.jpg", "/imgs/facilities/canteen-2.jpg"],
    body: (
      <p>
        The campus has a canteen for staff and trainees, which is nearby the football field. It has a
        special dining area for visitors to the institute. The canteen offers a wide range of food,
        freshly cooked and prepared, and attention is paid to quality. It serves breakfast, lunch, and
        dinner.
      </p>
    ),
  },
  {
    title: "Masjid",
    images: ["/imgs/facilities/masjid-1.jpg", "/imgs/facilities/masjid-2.jpg"],
    body: (
      <p>
        The institute has a masjid where staff and trainees perform obligatory prayers. It is close to
        the accommodation in Building A.
      </p>
    ),
  },
];

export default function CampusFacilitiesPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:px-8 md:space-y-24 md:py-20">
        {facilities.map((f, i) => (
          <FacilitySection key={f.title} {...f} imageSide={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </main>
  );
}
