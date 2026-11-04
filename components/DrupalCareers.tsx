import CareersCarousel from "@/components/Careers";
import { getCareers } from "@/lib/careers";
import { getLocale } from "@/lib/i18n/server";

/**
 * Careers carousel filled from the Drupal content type "careers" (ewa_content_api →
 * /api/careers/{lang}), newest first. Falls back to the built-in jobs when Drupal has none.
 *
 *   <DrupalCareers />
 */
export default async function DrupalCareers() {
  const jobs = await getCareers(await getLocale());
  return <CareersCarousel jobs={jobs ?? undefined} />;
}
