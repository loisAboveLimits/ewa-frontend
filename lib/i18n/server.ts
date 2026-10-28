// Server-only helpers: the language comes from the URL (set as a request header by proxy.ts).
import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, isLocale, LOCALE_HEADER, type Locale } from "./config";
import { getDictionary } from "./dictionaries";
import { getPageMeta } from "@/lib/banners";
import { pagePaths, type PageKey } from "@/lib/pages";

export async function getLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : defaultLocale;
}

/** Locale + its dictionary in one call, for Server Components. */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}

/**
 * `export const generateMetadata = () => pageMetadata("about")`
 * Title = Drupal main title, description = Drupal sub title (node mapped in lib/banners.ts);
 * falls back to the dictionary text (`pages` key) when Drupal has nothing.
 */
export async function pageMetadata(key: keyof ReturnType<typeof getDictionary>["pages"]): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const page = t.pages[key];
  const drupal = key in pagePaths ? await getPageMeta(key as PageKey, locale) : {};
  return {
    title: drupal.title || page.title,
    description: drupal.description || page.desc || undefined,
  };
}
