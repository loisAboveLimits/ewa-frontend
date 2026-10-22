"use client";

import { useState } from "react";
import { fmt } from "@/lib/i18n/config";

export type CourseItem = { name: string; credits: string };
export type Course = { name: string; items: CourseItem[] };
export type Module = { title: string; courses: Course[] };

type Props = {
  modules: Module[];
  /** index open on first render; -1 for all closed */
  defaultOpen?: number;
  /** e.g. "{n} credits" — translated by the page */
  creditsLabel?: string;
};

export default function ProgramModules({ modules, defaultOpen = 0, creditsLabel = "{n} credits" }: Props) {
  const [open, setOpen] = useState<number>(defaultOpen);

  return (
    <div className="flex flex-col gap-5">
      {modules.map((mod, i) => {
        const isOpen = open === i;
        const panelId = `module-panel-${i}`;
        const buttonId = `module-button-${i}`;

        return (
          <div
            key={mod.title}
            className="overflow-hidden rounded-ss-[30px] rounded-se-[30px] rounded-es-[30px] md:rounded-ss-[40px] md:rounded-se-[40px] md:rounded-es-[40px] bg-[#BCE3E2]"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 md:px-12 md:py-7 text-start focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#14989A]/40"
              >
                <span className="text-xl md:text-2xl font-semibold text-white">{mod.title}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-7 w-7 md:h-9 md:w-9 shrink-0 text-[#F07B52] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 9 7 7 7-7" />
                </svg>
              </button>
            </h3>

            {/* grid-rows trick gives a smooth height animation */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2 md:gap-8 md:px-12 md:pb-8 lg:pe-28">
                  {mod.courses.map((course) => (
                    <div
                      key={course.name}
                      className="rounded-se-[20px] rounded-ee-[20px] rounded-es-[20px] bg-[#D5EEEE] px-6 py-5 md:px-8 md:py-6 shadow-sm"
                    >
                      <h4 className="mb-3 text-lg md:text-xl font-semibold text-[#14989A]">
                        {course.name}
                      </h4>
                      <ul className="space-y-2">
                        {course.items.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-base md:text-xl text-[#14989A]">
                            <span aria-hidden="true">•</span>
                            <span>
                              {item.name} · {fmt(creditsLabel, { n: item.credits })}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
