import Link from "@/components/i18n/Link";
import { formatDate, type Locale } from "@/lib/i18n/config";

export type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  /** adds a link after the last paragraph (e.g. to the Contact Us page) */
  link?: { href: string; label: string };
};

export type PolicyText = {
  updatedLabel: string;
  /** ISO date of the last update */
  updated: string;
  tocTitle: string;
  intro: string[];
  sections: PolicySection[];
};

/**
 * A legal text page body (Privacy Policy, Terms & Conditions…): a section list that stays
 * beside the text on large screens (pills on phones) and the text in the same teal card
 * as the Media Center post page.
 */
export default function PolicyDocument({ id, policy, locale }: { id: string; policy: PolicyText; locale: Locale }) {
  return (
    <section id={id}>
      <div className="spacer-40"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">

          <nav aria-label={policy.tocTitle} className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <p className="mb-3 text-lg font-semibold text-[#14989A]">{policy.tocTitle}</p>
            <ol className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {policy.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-full bg-[#C8ECEA] px-4 py-1.5 text-sm text-[#14989A] transition hover:bg-[#14989A] hover:text-white lg:rounded-lg lg:bg-transparent lg:px-3 lg:py-2 lg:text-base"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 overflow-hidden rounded-se-[50px] md:rounded-se-[80px] bg-[#C8ECEA] px-5 py-8 sm:px-8 md:px-10 md:py-14 lg:pe-24">
            <p className="text-base md:text-lg text-[#14989A]">
              {policy.updatedLabel}: <time dateTime={policy.updated}>{formatDate(policy.updated, locale)}</time>
            </p>

            <div className="mt-5 space-y-4 text-base md:text-lg leading-relaxed text-[#1E1E1E]">
              {policy.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {policy.sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-10 scroll-mt-32 md:mt-12">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight text-[#14989A]">{s.title}</h2>
                <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed text-[#1E1E1E]">
                  {s.paragraphs?.map((p, i) => (
                    <p key={i}>
                      {p}
                      {s.link && i === (s.paragraphs?.length ?? 0) - 1 && (
                        <>
                          {" "}
                          <Link href={s.link.href} className="font-semibold text-[#EE7A52] underline underline-offset-4">
                            {s.link.label}
                          </Link>
                        </>
                      )}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="list-disc space-y-2 ps-6 marker:text-[#14989A]">
                      {s.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>

      <div className="spacer-80"></div>
    </section>
  );
}
