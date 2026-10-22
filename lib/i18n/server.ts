// Server-only helpers: read the visitor's language from the cookie.
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
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
