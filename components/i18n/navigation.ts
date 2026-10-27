"use client";

import { usePathname } from "next/navigation";
import { splitLocale } from "@/lib/i18n/config";

/** Current path WITHOUT the language prefix: "/ar/why/programs" → "/why/programs". */
export function useLocalePathname(): string {
  return splitLocale(usePathname() ?? "/").path;
}
