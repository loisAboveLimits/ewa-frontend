// Server-only helpers: the language comes from the URL (set as a request header by proxy.ts).
import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, isLocale, LOCALE_HEADER, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : defaultLocale;
}

/** Locale + its dictionary in one call, for Server Components. */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}

/** `export const generateMetadata = () => pageMetadata("about")` */
export async function pageMetadata(key: keyof ReturnType<typeof getDictionary>["pages"]): Promise<Metadata> {
  const { t } = await getI18n();
  const page = t.pages[key];
  return { title: page.title, description: page.desc || undefined };
}
