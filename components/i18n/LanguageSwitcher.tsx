"use client";

import { localizeHref, type Locale } from "@/lib/i18n/config";
import { useI18n } from "./I18nProvider";
import { useLocalePathname } from "./navigation";

/**
 * Toggles between English and Arabic by going to the same page in the other language
 * ("/about" ⇄ "/ar/about"). A full page load so every slider, font and layout
 * initialises in the new direction (LTR ⇄ RTL).
 */
export default function LanguageSwitcher({
  className = "",
  variant = "short",
  onSwitch,
}: {
  className?: string;
  /** "short" = AR / EN, "long" = العربية / English */
  variant?: "short" | "long";
  onSwitch?: () => void;
}) {
  const { locale, t } = useI18n();
  const pathname = useLocalePathname();
  const target: Locale = locale === "ar" ? "en" : "ar";

  const switchLocale = () => {
    onSwitch?.();
    window.location.assign(localizeHref(pathname, target) + window.location.search);
  };

  return (
    <button
      type="button"
      onClick={switchLocale}
      lang={target}
      aria-label={t.header.switchLabel}
      className={className}
    >
      {variant === "short" ? t.header.switchShort : t.header.switchLong}
    </button>
  );
}
