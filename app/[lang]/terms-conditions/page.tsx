import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import DrupalContent from "@/components/drupal/DrupalContent";
import PolicyDocument from "@/components/policy/PolicyDocument";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { getTerms } from "@/lib/terms";
import { pagePaths } from "@/lib/pages";

export const generateMetadata = () => pageMetadata("terms");

/**
 * Drupal page node with the Terms & Conditions in its Content field (shown via DrupalContent,
 * like Rules & Regulations). Leave null until the node exists — the built-in terms
 * from lib/terms.ts is shown meanwhile, and whenever Drupal has no content.
 */
const TERMS_NID: number | null = null;

export default async function TermsConditionsPage() {
  const { locale, t } = await getI18n();
  const policy = getTerms(locale);
  // "Privacy" links to the Privacy Policy, "Contact us" to the Contact page
  const links: Record<string, { href: string; label: string }> = {
    privacy: { href: pagePaths.privacy, label: t.pages.privacy.title },
    contact: { href: pagePaths.contact, label: t.pages.contact.title },
  };
  const withLinks = {
    ...policy,
    sections: policy.sections.map((s) => (links[s.id] ? { ...s, link: links[s.id] } : s)),
  };
  const builtIn = <PolicyDocument id="terms-conditions" policy={withLinks} locale={locale} />;

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="terms" image="/imgs/banners/rules.jpg" title={t.pages.terms.title} subtitle={t.pages.terms.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--terms & conditions-->*/}
      {TERMS_NID ? <DrupalContent nid={TERMS_NID} id="terms-conditions" fallback={builtIn} /> : builtIn}

    </div>
  );
}
