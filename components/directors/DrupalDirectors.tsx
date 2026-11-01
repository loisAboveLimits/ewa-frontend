import DirectorsCarousel, { type Director } from "@/components/directors/Directors";
import { absoluteUrl, fetchView } from "@/lib/drupal";
import { getLocale } from "@/lib/i18n/server";

/** One row of the "EWA Teams API's" view (GET /api/teams/{nid|all}/{lang}). */
type TeamRow = {
  nid: string;
  field_media_image?: string; // photo URL
  title?: string;             // name — after adding "Title" to the view
  position?: string;          // after adding "Position" (alias "position") to the view
  field_position?: string;
};

/**
 * Board carousel (#directors) filled from Drupal "Team" content, in the visitor's language.
 * Falls back to the built-in photos when Drupal has none or can't be reached.
 *
 *   <DrupalDirectors />
 */
export default async function DrupalDirectors() {
  const locale = await getLocale();

  let rows: TeamRow[] = [];
  try {
    // team members saved as "Not applicable"/"Not specified" language are picked up too
    for (const lang of [locale, "zxx", "und"]) {
      rows = await fetchView<TeamRow>({ path: "teams", args: ["all"], lang });
      if (rows.length) break;
    }
  } catch (error) {
    console.error("Drupal teams view could not be loaded", error);
  }

  const directors: Director[] = rows
    .filter((row) => row.field_media_image)
    .map((row) => ({
      src: absoluteUrl(row.field_media_image!.trim()),
      name: row.title?.trim() || undefined,
      position: (row.position ?? row.field_position)?.trim() || undefined,
    }));

  return <DirectorsCarousel directors={directors} />;
}
