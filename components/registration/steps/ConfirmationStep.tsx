"use client";

import Link from "next/link";
import { Panel } from "../ui";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ConfirmationStep({ homeHref = "/" }: { homeHref?: string }) {
  const { t } = useI18n();
  const d = t.registration.done;
  return (
    <Panel bubbles="bottom">
      <div className="py-2 md:py-4" role="status" aria-live="polite">
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight text-[#13999C]">
          {d.title}
        </h2>
        <p className="mt-2 text-base sm:text-lg md:text-2xl text-[#13999C]">
          {d.text}
        </p>

        <Link
          href={homeHref}
          className="group mt-6 md:mt-8 inline-flex items-center gap-4 md:gap-6 text-lg md:text-[28px] font-bold text-[#13999C] underline underline-offset-4"
        >
          <span className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#EE7A52] text-white transition group-hover:-translate-x-1 rtl:group-hover:translate-x-1">
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5 rtl-flip" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m6-6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {d.home}
        </Link>
      </div>
    </Panel>
  );
}
