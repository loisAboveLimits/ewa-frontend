"use client";
import { useId, useState } from "react";
import { getCategories } from "@/lib/categories";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Programs filter box. On phones and tablets the header is a button that opens / closes the
 * list (closed at first); from the lg breakpoint the list is always shown.
 */
export default function FilterPrograms() {
  const { locale, t } = useI18n();
  const categories = getCategories(locale);
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <div className="box filter-box">

      <div className="filter-box-header px-6 py-4">
        <h2 className="fnt-green text-[24px] md:text-[30px] font-bold text-center">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={bodyId}
            className="flex w-full items-center justify-center gap-3 cursor-pointer lg:cursor-default lg:pointer-events-none"
          >
            <span>{t.programs.filterTitle}</span>
            {/* chevron — only on small screens, where the box can be collapsed */}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className={`size-6 shrink-0 transition-transform duration-300 lg:hidden ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </h2>
      </div>

      <div
        id={bodyId}
        className={`filter-box-body px-6 py-4 grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-1 lg:grid ${open ? "grid" : "hidden"}`}
      >
        {categories.map((category) => (
          <fieldset key={category.id}>

            <legend className="font-bold fnt-green text-[20px] md:text-[24px]">
              {category.parent}
            </legend>

            <div className="spacer-10"></div>

            {category.children.map((child) => (
              <label
                key={`${category.id}-${child.id}`}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={category.id}
                  value={child.id}
                  className="
                    w-5 h-5 shrink-0
                    appearance-none
                    border-2
                    rounded
                    checked:bg-teal-500
                    checked:border-teal-500
                    cursor-pointer
                    filter-cb
                  "
                />

                <span className="fnt-green">
                  {child.name}
                </span>
              </label>
            ))}

            <div className="spacer-40"></div>

          </fieldset>
        ))}
      </div>

    </div>
  );
}
