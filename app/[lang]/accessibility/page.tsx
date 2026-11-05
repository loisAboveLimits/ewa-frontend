import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import DrupalContent from "@/components/drupal/DrupalContent";
import PolicyDocument from "@/components/policy/PolicyDocument";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { getAccessibilityStatement } from "@/lib/accessibility";
import { pagePaths } from "@/lib/pages";

export const generateMetadata = () => pageMetadata("accessibility");

/**
 * Drupal page node with the Accessibility statement in its Content field (shown via
 * DrupalContent, like Rules & Regulations). Leave null until the node exists — the built-in
 * statement from lib/accessibility.ts is shown meanwhile, and whenever Drupal has no content.
 */
const ACCESSIBILITY_NID: number | null = null;

export default async function AccessibilityPage() {
  const { locale, t } = await getI18n();
  const statement = getAccessibilityStatement(locale);
  // "Feedback and help" links to the Contact page
  const withLinks = {
    ...statement,
    sections: statement.sections.map((s) => (s.id === "feedback" ? { ...s, link: { href: pagePaths.contact, label: t.pages.contact.title } } : s)),
  };
  const builtIn = <PolicyDocument id="accessibility" policy={withLinks} locale={locale} />;

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="accessibility" image="/imgs/banners/rules.jpg" title={t.pages.accessibility.title} subtitle={t.pages.accessibility.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--accessibility-->*/}
      {ACCESSIBILITY_NID ? <DrupalContent nid={ACCESSIBILITY_NID} id="accessibility" fallback={builtIn} /> : builtIn}

    </div>
  );
}
