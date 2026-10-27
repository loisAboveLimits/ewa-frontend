// Locale settings shared by server, client and proxy code.

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/**
 * The main language — served WITHOUT a prefix ("/about"); every other language gets one ("/ar/about").
 * Change it in .env.local (NEXT_PUBLIC_DEFAULT_LOCALE=ar) and restart / rebuild. Nothing else to edit.
 */
const envDefault = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
export const defaultLocale: Locale = isLocale(envDefault) ? envDefault : "en";

/** Request header the proxy sets so Server Components know the language (read in lib/i18n/server.ts). */
export const LOCALE_HEADER = "x-locale";

/** "/ar/about" → { locale: "ar", path: "/about" };  "/about" → { locale: null, path: "/about" } */
export function splitLocale(pathname: string): { locale: Locale | null; path: string } {
  const first = pathname.split("/")[1];
  if (isLocale(first)) return { locale: first, path: pathname.slice(first.length + 1) || "/" };
  return { locale: null, path: pathname };
}

/**
 * Prefix an internal href with a language: localizeHref("/about", "ar") → "/ar/about".
 * The default language has no prefix. External links, "#", "mailto:", "tel:" are returned untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const cut = href.search(/[?#]/);
  const pathname = cut === -1 ? href : href.slice(0, cut);
  const suffix = cut === -1 ? "" : href.slice(cut);
  const { path } = splitLocale(pathname);
  if (locale === defaultLocale) return path + suffix;
  return `/${locale}${path === "/" ? "" : path}${suffix}`;
}

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
