"use client";

import { useId, useRef, type ReactNode, type InputHTMLAttributes, type ButtonHTMLAttributes } from "react";
import type { Option } from "@/lib/registration";
import { useI18n } from "@/components/i18n/I18nProvider";

/* ---------- design tokens (from the Figma) ---------- */
// teal text  #13999C | panel #C8EAE8 | field #94D3D1 | bubble #CDF3F3
// stepper    #7AC4C4 | orange #EE7A52 | soft orange #F2A285

const fieldBase =
  "peer w-full h-14 md:h-[68px] rounded-2xl md:rounded-[20px] bg-[#94D3D1] px-6 md:px-12 " +
  "text-base md:text-xl text-white placeholder:text-white/90 outline-none " +
  "shadow-[0_4px_12px_rgba(19,153,156,0.08)] transition " +
  "focus:bg-[#8ACECC] focus:ring-2 focus:ring-[#EE7A52]/50";

const errorRing = "ring-2 ring-[#EE7A52]";

/* ---------- Panel: rounded card with decorative bubbles ---------- */
export function Panel({
  children,
  bubbles = "bottom",
  className = "",
}: {
  children: ReactNode;
  bubbles?: "top" | "bottom" | "none";
  className?: string;
}) {
  return (
    <div
      className={
        "relative overflow-hidden bg-[#C8EAE8] rounded-se-[40px] rounded-es-[40px] md:rounded-se-[70px] md:rounded-es-[70px] " +
        "px-5 py-8 sm:px-8 md:px-12 md:py-12 " +
        className
      }
    >
      {bubbles === "bottom" && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -bottom-24 end-24 h-56 w-80 rounded-full bg-[#CDF3F3]" />
          <span className="absolute bottom-24 -end-16 h-40 w-40 rounded-full bg-[#CDF3F3]" />
          <span className="absolute -bottom-10 -end-10 h-24 w-32 rounded-full bg-[#CDF3F3]" />
        </div>
      )}
      {bubbles === "top" && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -top-28 end-24 h-64 w-80 rounded-full bg-[#CDF3F3]" />
          <span className="absolute top-16 -end-20 h-48 w-48 rounded-full bg-[#CDF3F3]" />
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export function PanelHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 md:mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight text-[#13999C]">{title}</h2>
      {subtitle && <p className="mt-1 text-base sm:text-lg md:text-2xl text-[#13999C]">{subtitle}</p>}
    </div>
  );
}

/* ---------- error text ---------- */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 px-2 text-sm text-[#E2582B]">
      {message}
    </p>
  );
}

/* ---------- text input ---------- */
type TextInputProps = {
  label: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder">;

export function TextInput({ label, error, className = "", ...rest }: TextInputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${fieldBase} ${error ? errorRing : ""} ${className}`}
        {...rest}
      />
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

/* ---------- select ---------- */
export function SelectInput({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={
            `${fieldBase} ${error ? errorRing : ""} appearance-none cursor-pointer pe-14 truncate ` +
            `${value ? "text-white" : "text-white/90"} [&>option]:text-[#13999C] [&>option]:bg-white`
          }
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute end-5 md:end-10 top-1/2 h-6 w-6 -translate-y-1/2 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

/* ---------- date input with calendar icon ---------- */
export function DateInput({
  label,
  value,
  onChange,
  error,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  max?: string;
}) {
  const { t } = useI18n();
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const openPicker = () => {
    const el = ref.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      el.focus();
    }
  };
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type="date"
          value={value}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={
            `${fieldBase} ${error ? errorRing : ""} pe-14 [color-scheme:light] ` +
            `[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:hidden ` +
            `${value ? "text-white" : "text-transparent"}`
          }
        />
        {!value && (
          <span className="pointer-events-none absolute start-6 md:start-12 top-1/2 -translate-y-1/2 text-base md:text-xl text-white/90">
            {label}
          </span>
        )}
        <button
          type="button"
          onClick={openPicker}
          aria-label={t.registration.openCalendar}
          className="absolute end-4 md:end-9 top-1/2 -translate-y-1/2 p-1 text-white"
        >
          <CalendarIcon />
        </button>
      </div>
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

/* ---------- Saudi phone input with +966 prefix ---------- */
export function PhoneInput({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        className={
          "flex items-center h-14 md:h-[68px] rounded-2xl md:rounded-[20px] bg-[#94D3D1] px-6 md:px-12 gap-3 md:gap-6 " +
          "shadow-[0_4px_12px_rgba(19,153,156,0.08)] focus-within:ring-2 focus-within:ring-[#EE7A52]/50 " +
          (error ? errorRing : "")
        }
      >
        <span className="shrink-0 text-base md:text-xl text-white/90 hidden sm:inline">{label}</span>
        {/* the number itself always reads left-to-right: +966 5XXXXXXXX */}
        <span dir="ltr" className="flex min-w-0 flex-1 items-center gap-3 md:gap-6">
        <span className="shrink-0 text-base md:text-xl font-bold text-white">+966</span>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={9}
          value={value}
          placeholder="5XXXXXXXX"
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          aria-invalid={!!error}
          className="min-w-0 flex-1 bg-transparent text-base md:text-xl text-white placeholder:text-white/60 outline-none"
        />
        </span>
      </div>
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

/* ---------- checkbox ---------- */
export function Checkbox({
  checked,
  onChange,
  children,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm md:text-base text-[#13999C] leading-snug">
        <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={!!error}
            className={
              "peer h-5 w-5 cursor-pointer appearance-none rounded border-2 bg-transparent transition " +
              "checked:bg-[#13999C] checked:border-[#13999C] outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52]/50 " +
              (error ? "border-[#EE7A52]" : "border-[#13999C]")
            }
          />
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="pointer-events-none absolute inset-0 m-auto hidden h-3.5 w-3.5 text-white peer-checked:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>{children}</span>
      </label>
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

/* ---------- buttons ---------- */
export function NextButton({ children, ...rest }: { children?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { t } = useI18n();
  return (
    <button
      type="submit"
      {...rest}
      className={
        "inline-flex h-12 md:h-[54px] items-center justify-center gap-6 md:gap-10 rounded-full bg-[#EE7A52] ps-8 pe-5 md:ps-14 md:pe-6 " +
        "text-lg md:text-2xl font-bold text-white shadow-md transition hover:bg-[#E5683D] active:scale-[0.98] " +
        "disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EE7A52]/30"
      }
    >
      <span>{children ?? t.registration.next}</span>
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 rtl-flip" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function PrimaryButton({ children, ...rest }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      {...rest}
      className={
        "inline-flex h-14 md:h-[78px] items-center justify-center rounded-full bg-[#EE7A52] px-8 md:px-12 " +
        "text-lg md:text-2xl font-bold text-white shadow-md transition hover:bg-[#E5683D] active:scale-[0.98] " +
        "disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EE7A52]/30"
      }
    >
      {children}
    </button>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-base md:text-lg font-medium text-[#13999C] hover:underline"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 rtl-flip" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {t.registration.back}
    </button>
  );
}

/* ---------- icons ---------- */
export function CalendarIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
      <circle cx="8" cy="13.5" r=".9" fill="currentColor" />
      <circle cx="12" cy="13.5" r=".9" fill="currentColor" />
      <circle cx="16" cy="13.5" r=".9" fill="currentColor" />
      <circle cx="8" cy="17" r=".9" fill="currentColor" />
      <circle cx="12" cy="17" r=".9" fill="currentColor" />
    </svg>
  );
}
