"use client";

import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";
import { useI18n } from "./I18nProvider";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Toggles between English and Arabic.
 * The choice is stored in a cookie that app/layout.tsx reads, then the page reloads so
 * every slider, font and layout initialises in the new direction (LTR ⇄ RTL).
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
  const target: Locale = locale === "ar" ? "en" : "ar";

  const switchLocale = () => {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
    onSwitch?.();
    window.location.reload();
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
