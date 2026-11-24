"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

type StepperProps = {
  /** 0 = Register, 1 = Apply, 2 = Confirmation, 3 = all finished */
  current: number;
  className?: string;
};

const stepDefs = [
  { key: "register", Icon: RegisterIcon },
  { key: "apply", Icon: ApplyIcon },
  { key: "confirmation", Icon: ConfirmIcon },
] as const;

export default function Stepper({ current, className = "" }: StepperProps) {
  const { t } = useI18n();
  const steps = stepDefs.map((s) => ({ ...s, label: t.registration.steps[s.key] }));
  return (
    <nav
      aria-label={t.registration.progressAria}
      className={
        "mx-auto w-full max-w-[730px] rounded-[20px] md:rounded-[26px] bg-[#7AC4C4] px-4 py-6 sm:px-8 md:px-14 md:py-12 " +
        "shadow-[-10px_10px_20px_rgba(0,0,0,0.08)] " +
        className
      }
    >
      <ol className="flex items-start">
        {steps.map(({ key, label, Icon }, i) => {
          const done = i < current;
          const active = i === current;
          const isLast = i === steps.length - 1;
          return (
            <li key={key} className="relative flex flex-1 flex-col items-center">
              {/* connector to the next step */}
              {!isLast && (
                <span
                  aria-hidden
                  className={
                    "absolute top-6 md:top-[38px] start-1/2 h-[3px] w-full -translate-y-1/2 " +
                    (done ? "bg-[#EE7A52]" : "bg-[#EE7A52]/80")
                  }
                />
              )}

              {/*
                current step: orange circle inside a progress ring (solid arc + faded dashes)
                finished step: solid orange circle with a thin light ring inside its edge
                next steps:   light orange circle, faded icon
              */}
              <span
                className={
                  "relative z-10 flex h-12 w-12 md:h-[76px] md:w-[76px] items-center justify-center rounded-full transition-colors duration-300 " +
                  (active || done ? "bg-[#EE7A52]" : "bg-[#F2A285]")
                }
                aria-current={active ? "step" : undefined}
              >
                {/* current step: half solid / half dashed ring; finished step: full solid ring */}
                {(active || done) && <StepRing progress={done ? 1 : 0.5} />}
                <Icon className={"relative h-6 w-6 md:h-9 md:w-9 " + (active || done ? "text-white" : "text-white/60")} />
              </span>

              <span
                className={
                  "mt-3 md:mt-5 text-sm sm:text-base md:text-2xl text-white text-center " +
                  (active ? "font-bold" : "font-normal")
                }
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Ring around the current step: a solid arc on the leading half and faded dashes on the other
 *  (mirrored in Arabic). */
function StepRing({ progress = 0.5 }: { progress?: number }) {
  const p = Math.min(Math.max(progress, 0), 1) * 100;
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="pointer-events-none absolute -inset-[7px] md:-inset-[11px] h-[calc(100%+14px)] w-[calc(100%+14px)] md:h-[calc(100%+22px)] md:w-[calc(100%+22px)] -rotate-90 rtl:rotate-90 rtl:-scale-x-100"
      fill="none"
      strokeLinecap="round"
    >
      {/* faded dashes all the way round (the part still to do) */}
      <circle cx="50" cy="50" r="45" pathLength={100} stroke="#EE7A52" strokeOpacity="0.45" strokeWidth="5" strokeDasharray="4 3.5" />
      {/* solid arc = how far through this step the user is; starts at the top, grows clockwise */}
      <circle
        cx="50"
        cy="50"
        r="45"
        pathLength={100}
        stroke="#EE7A52"
        strokeWidth="6"
        strokeDasharray={`${p} 100`}
        style={{ transition: "stroke-dasharray 500ms ease" }}
      />
    </svg>
  );
}

/* ---------- icons ---------- */
type IconProps = { className?: string };

function RegisterIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="7" y="4" width="18" height="24" rx="2.5" />
      <circle cx="16" cy="11.5" r="2.6" />
      <path d="M11.5 18c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" strokeLinecap="round" />
      <path d="M11 22h10M11 25h7" strokeLinecap="round" />
    </svg>
  );
}

function ApplyIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 13V7a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 6 7v18a2.5 2.5 0 0 0 2.5 2.5H15" />
      <path d="M10 10h1M14 10h4M10 15h1M14 15h4M10 20h1M14 20h2" strokeLinecap="round" />
      <path d="m19 26 .6-3.2 6.4-6.4a1.8 1.8 0 0 1 2.6 2.6l-6.4 6.4z" strokeLinejoin="round" />
    </svg>
  );
}

function ConfirmIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="4" width="20" height="24" rx="2.5" />
      <path d="M10 10h1M14 10h8M10 15h1M14 15h8M10 20h1M14 20h2" strokeLinecap="round" />
      <path d="m18 22.5 2.5 2.5 5-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
