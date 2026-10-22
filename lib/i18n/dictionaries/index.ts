import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { ar } from "./ar";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
