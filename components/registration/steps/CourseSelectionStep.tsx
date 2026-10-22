"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { StepProps } from "../RegistrationForm";
import { getCourses, courseFields, type Course } from "@/lib/courses";
import { BackButton, Panel, PanelHeading, PrimaryButton } from "../ui";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type CourseCopy = Dictionary["registration"]["courses"];

export default function CourseSelectionStep({ data, errors, update, onBack, submitting }: StepProps) {
  const { locale, t } = useI18n();
  const c = t.registration.courses;
  const courses = useMemo(() => getCourses(locale), [locale]);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [field, setField] = useState<string>("all");

  const selected = useMemo(() => courses.filter((course) => data.courses.includes(course.id)), [courses, data.courses]);
  const totalCredits = selected.reduce((sum, c) => sum + c.credits, 0);

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale);
    return courses.filter(
      (course) =>
        (field === "all" || course.field === field) &&
        (!q ||
          course.title.toLocaleLowerCase(locale).includes(q) ||
          course.description.toLocaleLowerCase(locale).includes(q))
    );
  }, [courses, query, field, locale]);

  const toggle = (id: string) =>
    update("courses", data.courses.includes(id) ? data.courses.filter((x) => x !== id) : [...data.courses, id]);

  return (
    <div className="space-y-12 md:space-y-20">
      {/* ---------- Your Courses ---------- */}
      <Panel bubbles="top">
        <div className="flex min-h-[200px] md:min-h-[260px] flex-col">
          <PanelHeading title={c.yourCourses} subtitle={selected.length ? undefined : c.empty} />

          {selected.length > 0 && (
            <ul className="flex flex-wrap gap-3 -mt-2 md:-mt-4">
              {selected.map((course) => (
                <li
                  key={course.id}
                  className="flex items-center gap-3 rounded-full bg-white/70 ps-4 pe-2 py-1.5 text-sm md:text-base text-[#13999C]"
                >
                  <span className="font-semibold">{course.title}</span>
                  <span className="text-[#EE7A52] text-xs md:text-sm">{fmt(c.creditsShort, { n: course.credits })}</span>
                  <button
                    type="button"
                    onClick={() => toggle(course.id)}
                    aria-label={fmt(c.remove, { title: course.title })}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#EE7A52] hover:bg-[#EE7A52]/10"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-auto pt-8 text-end text-xl md:text-[28px] font-bold text-[#13999C]">
            {fmt(c.totalCredits, { n: totalCredits })}
          </p>
        </div>
      </Panel>

      {/* ---------- Choose Your Courses ---------- */}
      <Panel bubbles="none">
        <div className="flex items-start justify-between gap-4">
          <PanelHeading title={c.chooseTitle} subtitle={c.chooseSubtitle} />
          <div className="flex shrink-0 items-center gap-2 pt-2 md:pt-3 md:me-8">
            <IconToggle label={c.filter} active={showFilter} onClick={() => setShowFilter((s) => !s)}>
              <path d="M4 5h16l-6 7.5V19l-4 1.5v-8z" strokeLinejoin="round" />
            </IconToggle>
            <IconToggle label={c.search} active={showSearch} onClick={() => setShowSearch((s) => !s)}>
              <circle cx="10.5" cy="10.5" r="6" />
              <path d="m15 15 5 5" strokeLinecap="round" />
            </IconToggle>
          </div>
        </div>

        {(showSearch || showFilter) && (
          <div className="mb-6 -mt-2 flex flex-col gap-3 md:flex-row md:items-center">
            {showSearch && (
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                aria-label={c.search}
                className="h-12 w-full md:max-w-sm rounded-full bg-white/70 px-5 text-[#13999C] placeholder:text-[#13999C]/60 outline-none focus:ring-2 focus:ring-[#EE7A52]/50"
              />
            )}
            {showFilter && (
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={c.filterByField}>
                {["all", ...courseFields].map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={field === f}
                    onClick={() => setField(f)}
                    className={
                      "rounded-full px-4 py-2 text-sm font-medium transition " +
                      (field === f ? "bg-[#EE7A52] text-white" : "bg-white/70 text-[#13999C] hover:bg-white")
                    }
                  >
                    {f === "all" ? c.allFields : c.fields[f]}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <ul
          className={
            "max-h-[640px] md:max-h-[960px] space-y-5 md:space-y-7 overflow-y-auto pe-3 md:pe-8 " +
            "[scrollbar-width:thin] [scrollbar-color:#F2A285_white] " +
            "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white " +
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#F2A285]"
          }
        >
          {visible.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              copy={c}
              readMore={t.common.readMore}
              showLess={t.common.showLess}
              added={data.courses.includes(course.id)}
              onToggle={() => toggle(course.id)}
            />
          ))}
          {visible.length === 0 && (
            <li className="py-10 text-center text-[#13999C]">{c.noMatch}</li>
          )}
        </ul>
      </Panel>

      {/* ---------- actions ---------- */}
      <div className="flex flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
        {onBack ? <BackButton onClick={onBack} /> : <span />}
        <div className="flex flex-col items-center sm:items-end gap-2">
          {errors.courses && (
            <p role="alert" className="text-sm text-[#E2582B]">
              {errors.courses}
            </p>
          )}
          <PrimaryButton disabled={submitting}>{submitting ? c.submitting : c.submit}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------- pieces ---------- */

function CourseCard({
  course,
  copy,
  readMore,
  showLess,
  added,
  onToggle,
}: {
  course: Course;
  copy: CourseCopy;
  readMore: string;
  showLess: string;
  added: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const short = course.description.length > 150 ? course.description.slice(0, 150).trimEnd() + "..." : course.description;

  return (
    <li
      className={
        "rounded-2xl md:rounded-[24px] bg-[#B7E1DE] px-5 py-6 md:px-12 md:py-9 " +
        "shadow-[0_6px_14px_rgba(19,153,156,0.12)] ring-1 ring-white/40 transition " +
        (added ? "ring-2 ring-[#EE7A52]" : "")
      }
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h3 className="text-lg md:text-2xl font-bold text-[#13999C]">{course.title}</h3>
          <p className="mt-1 text-xs md:text-sm font-bold text-[#EE7A52]">
            {fmt(copy.programLine, { field: copy.fields[course.field], months: course.durationMonths })}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={added}
          className="self-start shrink-0 text-base md:text-2xl text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]"
        >
          {added ? copy.removeCourse : copy.addCourse}
        </button>
      </div>

      <p className="mt-4 md:mt-5 max-w-3xl text-sm md:text-lg leading-snug text-[#13999C]">
        {expanded ? course.description : short}{" "}
        {course.description.length > 150 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-[#EE7A52] underline underline-offset-2 hover:text-[#E5683D]"
          >
            {expanded ? showLess : readMore}
          </button>
        )}
      </p>
    </li>
  );
}

function IconToggle({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={
        "flex h-10 w-10 items-center justify-center rounded-full text-[#EE7A52] transition " +
        (active ? "bg-white/70" : "hover:bg-white/50")
      }
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        {children}
      </svg>
    </button>
  );
}
