import type { ReactNode } from "react";

/** Page title + intro inside the trainee area. */
export function TraineeHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-6 md:mb-8">
      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#14989A]">{title}</h2>
      {intro && <p className="mt-2 max-w-[48rem] text-base md:text-lg leading-relaxed text-[#14989A]">{intro}</p>}
    </header>
  );
}

/** Light teal card with rounded top-end corner (same as the Media Center post card). */
export function TraineeCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-se-[40px] md:rounded-se-[60px] bg-[#C8ECEA] p-5 sm:p-7 md:p-9 ${className}`}>{children}</div>;
}

/** Shown while a section has nothing to list yet. */
export function TraineeEmpty({ icon, title, text, children }: { icon: ReactNode; title: string; text: string; children?: ReactNode }) {
  return (
    <TraineeCard className="flex flex-col items-center text-center">
      <span aria-hidden className="flex h-20 w-20 items-center justify-center rounded-full bg-white/70 text-[#14989A] md:h-24 md:w-24">
        {icon}
      </span>
      <h3 className="mt-5 text-xl md:text-2xl font-bold text-[#14989A]">{title}</h3>
      <p className="mt-2 max-w-[36rem] text-base md:text-lg leading-relaxed text-[#14989A]">{text}</p>
      {children && <div className="mt-6">{children}</div>}
    </TraineeCard>
  );
}

export const traineeLinkClass =
  "inline-flex items-center gap-2 rounded-full border-2 border-[#EE7A52] px-5 py-2.5 text-base font-bold text-[#EE7A52] transition hover:bg-[#EE7A52] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2";
