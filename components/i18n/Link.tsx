"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "@/lib/i18n/config";
import { useI18n } from "./I18nProvider";

/**
 * Drop-in replacement for next/link that keeps the visitor in their language:
 * <Link href="/about"> → "/about" in the default language, "/ar/about" in Arabic.
 * Use it everywhere instead of next/link.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { locale } = useI18n();
  const localized =
    typeof href === "string"
      ? localizeHref(href, locale)
      : { ...href, pathname: href.pathname ? localizeHref(href.pathname, locale) : href.pathname };
  return <NextLink href={localized} {...props} />;
}
