// Course catalogue shown on the "Apply" step.
// Replace with data from your API/CMS — credit values here are placeholders.

export type Course = {
  id: string;
  title: string;
  field: "Industrial" | "Energy" | "Safety";
  durationMonths: number;
  credits: number;
  description: string;
  href?: string; // optional "Read More" page
};

export const courses: Course[] = [
  {
    id: "facilities-management",
    title: "Facilities Management",
    field: "Industrial",
    durationMonths: 24,
    credits: 60,
    description:
      "The 2-Year Facility Management Diploma Program is designed to provide students with comprehensive training in the maintenance, operation, and management of building systems, equipment, and services across industrial and commercial facilities.",
  },
  {
    id: "instrumentation-control-maintenance",
    title: "Instrumentation & Control Maintenance",
    field: "Industrial",
    durationMonths: 24,
    credits: 60,
    description:
      "Compliance with the technical professional standard required in the national industry for instrument maintenance technicians. The program supports trainees in calibrating, maintaining and repairing measurement and control instruments used in plants.",
  },
  {
    id: "renewable-energy-technology",
    title: "Renewable Energy Technology",
    field: "Energy",
    durationMonths: 24,
    credits: 60,
    description:
      "Compliance with the technical professional standard required in the national industry for maintenance technicians. The program supports training in both solar and wind energy systems, from installation to operation and maintenance.",
  },
  {
    id: "diesel-engine-operation",
    title: "Diesel Engine Operation Technology",
    field: "Energy",
    durationMonths: 24,
    credits: 60,
    description:
      "The Diesel Engine Operation Program at the EWA is designed to meet the needs of the industry, power plants, and has taken into consideration the technical skills required to operate and maintain large diesel engines safely and efficiently.",
  },
  {
    id: "firefighting",
    title: "Firefighting",
    field: "Safety",
    durationMonths: 12,
    credits: 30,
    description:
      "The Fire-fighter Training Program of the Energy & Water Academy is designed to meet the needs for firefighters of the industry and power plants and develops the practical skills needed for fire prevention, response and rescue.",
  },
  {
    id: "instrument-control-troubleshooting",
    title: "Instrument & Control Troubleshooting",
    field: "Industrial",
    durationMonths: 12,
    credits: 30,
    description:
      "An applied program focused on diagnosing and resolving faults in instrumentation and control loops, using industry-standard tools and structured troubleshooting methods.",
  },
];

export const courseFields = ["Industrial", "Energy", "Safety"] as const;
