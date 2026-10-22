"use client";

import { createContext, useContext, type ReactNode } from "react";
import { dirOf, type Direction, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type I18nValue = { locale: Locale; dir: Direction; t: Dictionary };

const I18nContext = createContext<I18nValue | null>(null);

/** Wraps the app in app/layout.tsx — the dictionary comes from the server. */
export function I18nProvider({ locale, dictionary, children }: { locale: Locale; dictionary: Dictionary; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, dir: dirOf(locale), t: dictionary }}>{children}</I18nContext.Provider>;
}

/** Locale, direction and dictionary for Client Components. */
export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
