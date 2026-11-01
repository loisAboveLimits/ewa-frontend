import type { ReactNode } from "react";
import Testimonials from "@/components/orbit/Testimonials";
import type { OrbitAction, OrbitMember } from "@/components/orbit/OrbitShowcase";
import { getTestimonies } from "@/lib/testimonies";
import { getLocale } from "@/lib/i18n/server";

/**
 * Testimonies section filled from Drupal ("EWA Testimonies API's" view), by language:
 * card slider on phones, rotating orbit from tablets up (same as <Testimonials>).
 * `fallback` members are shown when Drupal has none or can't be reached.
 *
 *   <DrupalTestimonials fallback={getTeam(locale)} actions={getOrbitActions(t)} label="…" center={…} />
 */
export default async function DrupalTestimonials({
  fallback = [],
  actions,
  center,
  label,
}: {
  fallback?: OrbitMember[];
  actions?: OrbitAction[];
  center?: ReactNode;
  label?: string;
}) {
  const drupal = await getTestimonies(await getLocale());
  const members = drupal.length ? drupal : fallback;
  if (!members.length) return null;

  return <Testimonials members={members} actions={actions} center={center} label={label} />;
}
