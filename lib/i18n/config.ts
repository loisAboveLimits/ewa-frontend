// Locale settings shared by server and client code.

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

export const defaultLocale: Locale = "en";

/** Cookie that remembers the visitor's language (read in app/layout.tsx). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale): Direction => (locale === "ar" ? "rtl" : "ltr");

/** BCP-47 tag for Intl formatting. Arabic keeps the Gregorian calendar and Western digits. */
export const intlLocale = (locale: Locale) => (locale === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-US");

/** Any value that has one version per language. */
export type Localized<T> = Record<Locale, T>;

/** Long date, e.g. "September 8, 2023" / "8 سبتمبر 2023". */
export const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(intlLocale(locale), {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

/** Replace {name} placeholders: fmt("Step {n} of {total}", { n: 1, total: 3 }) */
export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
