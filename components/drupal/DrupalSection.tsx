import type { ReactNode } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import DrupalView from "@/components/drupal/DrupalView";
import { drupalHtml, inlineHtml } from "@/lib/drupal";

/** One row of the "EWA Sections API's" view (api/section/{nid}/{lang}). */
export type SectionRow = {
  nid: string;
  title: string;
  field_main_title?: string; // HTML
  field_sub_title?: string;  // HTML
  field_content?: string;    // HTML (body)
};

type Props = {
  /** Node id of the "Sections" content. */
  nid: string | number;
  /** View path — default "section" (api/section/%/%). */
  path?: string;
  /** Language — default: the visitor's language. */
  lang?: string;
  /** Use the English text when the Arabic translation is missing (default false). */
  englishFallback?: boolean;
  /** HTML id of the <section>, e.g. "about". */
  id?: string;
  className?: string;
  /** Heading level of the title (default h2). */
  titleAs?: "h1" | "h2" | "h3";
  /** Show the main title (default true). */
  showTitle?: boolean;
  /** Show the sub title (default true). */
  showSubTitle?: boolean;
  /** Show the body text (default true). */
  showContent?: boolean;
  /** Your own main title instead of Drupal's (still shown with the leaf icon). */
  title?: ReactNode;
  /** Your own sub title instead of Drupal's. */
  subTitle?: ReactNode;
  /** Shown instead when Drupal has nothing (e.g. the current hard-coded section). */
  fallback?: ReactNode;
  /** Extra content under the Drupal text (buttons, sliders…). */
  children?: ReactNode;
};

/**
 * A page section filled from Drupal: leaf title, sub title and body text,
 * in the same layout as the other sections (container, spacers, green text).
 *
 *   <DrupalSection nid={12} id="about" />
 *   <DrupalSection nid={12} showSubTitle={false} />          // main title + content
 *   <DrupalSection nid={12} showContent={false} />           // titles only
 *   <DrupalSection nid={12} title="Our Values" subTitle="…" /> // own titles, Drupal content
 */
export default function DrupalSection({
  nid,
  path = "section",
  lang,
  englishFallback,
  id,
  className = "",
  titleAs = "h2",
  showTitle = true,
  showSubTitle = true,
  showContent = true,
  title: customTitle,
  subTitle: customSubTitle,
  fallback,
  children,
}: Props) {
  return (
    <DrupalView<SectionRow> path={path} args={[nid]} lang={lang} englishFallback={englishFallback} fallback={fallback}>
      {([row]) => {
        const title = showTitle ? inlineHtml(row.field_main_title) || inlineHtml(row.title) : "";
        const subTitle = showSubTitle ? inlineHtml(row.field_sub_title) : "";
        const content = showContent ? drupalHtml(row.field_content).trim() : "";
        const hasTitle = showTitle && (customTitle != null || !!title);
        const hasSubTitle = showSubTitle && (customSubTitle != null || !!subTitle);

        return (
          <section id={id} className={`relative ${className}`}>
            <div className="spacer-40"></div>

            <div className="container mx-auto px-4">
              {hasTitle && (
                <SectionTitle as={titleAs}>
                  {customTitle ?? <span dangerouslySetInnerHTML={{ __html: title }} />}
                </SectionTitle>
              )}

              {hasSubTitle && (
                <>
                  {hasTitle && <div className="spacer-10"></div>}
                  {customSubTitle != null ? (
                    <h3 className="font-bold sub-title fnt-orange">{customSubTitle}</h3>
                  ) : (
                    <h3 className="font-bold sub-title fnt-orange" dangerouslySetInnerHTML={{ __html: subTitle }} />
                  )}
                </>
              )}

              {content && (
                <>
                  {(hasTitle || hasSubTitle) && <div className="spacer-20"></div>}
                  <div className="drpl-view-section" dangerouslySetInnerHTML={{ __html: content }} />
                </>
              )}

              {children}
            </div>

            <div className="spacer-40"></div>
          </section>
        );
      }}
    </DrupalView>
  );
}
