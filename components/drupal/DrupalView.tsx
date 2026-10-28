import type { ReactNode } from "react";
import { fetchView, type ViewRequest } from "@/lib/drupal";
import { getLocale } from "@/lib/i18n/server";

type Props<T> = Omit<ViewRequest, "lang"> & {
  /** Language argument. Default: the visitor's language (en / ar). `false` = view has no language argument. */
  lang?: string | false;
  /** If this language has no rows, try English instead (default false). */
  englishFallback?: boolean;
  /** Shown when the view returns nothing or Drupal can't be reached. */
  fallback?: ReactNode;
  /** Render the rows however the page needs. */
  children: (rows: T[]) => ReactNode;
};

/**
 * Fetches any Drupal Views REST export and hands the rows to `children`.
 * Server component — use it directly in pages.
 *
 *   <DrupalView<SectionRow> path="section" args={[12]}>
 *     {([row]) => <h2>{row.title}</h2>}
 *   </DrupalView>
 *
 * → GET {DRUPAL_BASE_URL}/api/section/12/{en|ar}?_format=json
 */
export default async function DrupalView<T = Record<string, string>>({
  lang,
  englishFallback = false,
  fallback = null,
  children,
  ...request
}: Props<T>) {
  const language = lang === undefined ? await getLocale() : lang;

  let rows: T[] = [];
  try {
    rows = await fetchView<T>({ ...request, lang: language });
    if (!rows.length && englishFallback && language && language !== "en") {
      rows = await fetchView<T>({ ...request, lang: "en" });
    }
  } catch (error) {
    console.error(`Drupal view "${request.path}" could not be loaded`, error);
  }

  return rows.length ? <>{children(rows)}</> : <>{fallback}</>;
}
