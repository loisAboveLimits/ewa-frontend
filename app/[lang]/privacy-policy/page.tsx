import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import DrupalContent from "@/components/drupal/DrupalContent";
import PolicyDocument from "@/components/policy/PolicyDocument";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { getPrivacyPolicy } from "@/lib/privacy";
import { pagePaths } from "@/lib/pages";

export const generateMetadata = () => pageMetadata("privacy");

/**
 * Drupal page node with the Privacy Policy in its Content field (shown via DrupalContent,
 * like Rules & Regulations). Leave null until the node exists — the built-in policy
 * from lib/privacy.ts is shown meanwhile, and whenever Drupal has no content.
 */
const PRIVACY_NID: number | null = null;

export default async function PrivacyPolicyPage() {
  const { locale, t } = await getI18n();
  const policy = getPrivacyPolicy(locale);
  // the "Contact us" section links to the Contact page
  const withLinks = {
    ...policy,
    sections: policy.sections.map((s) => (s.id === "contact" ? { ...s, link: { href: pagePaths.contact, label: t.pages.contact.title } } : s)),
  };
  const builtIn = <PolicyDocument id="privacy-policy" policy={withLinks} locale={locale} />;

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="privacy" image="/imgs/banners/rules.jpg" title={t.pages.privacy.title} subtitle={t.pages.privacy.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--privacy policy-->*/}
      {PRIVACY_NID ? <DrupalContent nid={PRIVACY_NID} id="privacy-policy" fallback={builtIn} /> : builtIn}

    </div>
  );
}
