"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

type StepperProps = {
  /** 0 = Register, 1 = Apply, 2 = Confirmation */
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

              <span
                className={
                  "relative z-10 flex h-12 w-12 md:h-[76px] md:w-[76px] items-center justify-center rounded-full transition " +
                  (active
                    ? "bg-[#EE7A52] ring-[3px] md:ring-4 ring-[#EE7A52] ring-offset-2 md:ring-offset-[3px] ring-offset-[#F2A285]"
                    : done
                    ? "bg-[#F2A285] ring-[3px] md:ring-4 ring-[#EE7A52]"
                    : "bg-[#F2A285]")
                }
                aria-current={active ? "step" : undefined}
              >
                <Icon
                  className={
                    "h-6 w-6 md:h-9 md:w-9 " + (active ? "text-white" : done ? "text-white/80" : "text-white/60")
                  }
                />
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
