import type { ReactNode } from "react";
import OrbitShowcase, { type OrbitAction, type OrbitMember } from "./OrbitShowcase";
import TestimonialsSlider from "./TestimonialsSlider";

/**
 * Testimonials / team section.
 * - Phones (< 768px): swipeable card slider
 * - Tablets and up (≥ 768px): the rotating orbit
 */
export default function Testimonials({
  members,
  actions,
  center,
  label,
}: {
  members: OrbitMember[];
  actions?: OrbitAction[];
  center?: ReactNode;
  label?: string;
}) {
  return (
    <>
      <div className="md:hidden">
        <TestimonialsSlider members={members} actions={actions} label={label} />
      </div>

      <div className="hidden md:block px-4">
        <OrbitShowcase members={members} actions={actions} outerDuration={60} innerDuration={40} center={center} />
      </div>
    </>
  );
}
