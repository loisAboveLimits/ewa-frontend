import ProgramsRoulette, { type RouletteProgram } from "@/components/roulette/ProgramsRoulette";
import { absoluteUrl, fetchView } from "@/lib/drupal";
import { getLocale } from "@/lib/i18n/server";

/** One row of the "EWA Program Taxonomy API's" view (GET /api/program/taxonomy/{lang}). */
type ProgramTermRow = {
  tid: string;
  name: string;
  field_url?: string;
  image?: string; // /ewa/sites/default/files/…
};

/**
 * The home "courses" drum, filled from the Drupal "Programs" taxonomy:
 * term name → row title, term image → background, field_url → link of the centred row.
 * Falls back to the built-in programs when Drupal has nothing or can't be reached.
 *
 *   <DrupalProgramsRoulette />
 *   <DrupalProgramsRoulette path="program/taxonomy" tint={false} />
 */
export default async function DrupalProgramsRoulette({
  path = "program/taxonomy",
  tint = true,
}: {
  /** View path (default "program/taxonomy" → api/program/taxonomy/%). */
  path?: string;
  /** Teal overlay on the Drupal images (default true, keeps the white text readable). */
  tint?: boolean;
}) {
  const locale = await getLocale();

  let rows: ProgramTermRow[] = [];
  try {
    // terms saved as "Not applicable"/"Not specified" language are picked up too
    for (const lang of [locale, "zxx", "und"]) {
      rows = await fetchView<ProgramTermRow>({ path, lang });
      if (rows.length) break;
    }
  } catch (error) {
    console.error(`Drupal view "${path}" could not be loaded`, error);
  }

  const programs: RouletteProgram[] = rows
    .filter((row) => row.name && row.image)
    .map((row) => ({
      id: row.tid,
      title: row.name.trim(),
      image: absoluteUrl(row.image!.trim()),
      tint,
      href: row.field_url?.trim() || undefined,
    }));

  return <ProgramsRoulette programs={programs} />;
}
