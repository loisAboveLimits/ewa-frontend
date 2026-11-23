import Link from "@/components/i18n/Link";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import type { Locale, Localized } from "@/lib/i18n/config";
import { pagePaths } from "@/lib/pages";

const copy: Localized<{ title: string; tagline: string; text: string; button: string }> = {
  en: {
    title: "Contact Us",
    tagline: "stay connected",
    text: "Whether you\u2019re a student, sponsor, partner or alumnus, our team is here to help.",
    button: "Get in Touch",
  },
  ar: {
    title: "تواصل معنا",
    tagline: "ابقَ على اتصال",
    text: "سواء كنت طالبًا أو جهة راعية أو شريكًا أو من خريجينا، فريقنا هنا لمساعدتك.",
    button: "تواصل الآن",
  },
};

/**
 * Home page "Contact Us — stay connected" banner (after the contact form).
 * Teal rounded box with soft bubbles; the button opens the Contact page.
 */
export default function ContactBanner({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <div className="relative isolate overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#5AB7B6] px-5 py-10 sm:px-10 md:py-14 text-center text-white">
      {/* decorative bubbles (public/imgs/assets/contact-banner-bg.png, transparent PNG);
          mirrored in Arabic */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-center bg-no-repeat rtl:-scale-x-100"
        // full width (at least 720px, so phones keep the whole bubble band size), centred
        style={{ backgroundImage: "url(/imgs/assets/contact-banner-bg.png)", backgroundSize: "max(100%, 720px) auto" }}
      />
      <h2 className="text-[30px]! sm:text-[36px]! md:text-[42px]! font-bold leading-tight!">{c.title}</h2>
      <p className="mt-1 text-[24px]! sm:text-[28px]! md:text-[32px]! font-bold italic leading-tight!">{c.tagline}</p>
      <p className="mx-auto mt-4 max-w-[26rem] text-[15px]! md:text-[17px]! leading-snug! text-white/95">{c.text}</p>

      <div className="mt-6 flex justify-center">
        <Link
          href={pagePaths.contact}
          className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-[17px]! md:text-[19px]! font-bold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {c.button}
          <ArrowIcon size={28} />
        </Link>
      </div>
    </div>
  );
}
