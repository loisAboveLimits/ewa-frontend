import { absoluteUrl, drupalHtml } from "@/lib/drupal";
import type { Locale } from "@/lib/i18n/config";

/** One item of GET /api/team/{langcode} and GET /api/team/{slug}/{langcode} (module "ewa_content_api"). */
type TeamJson = {
  nid: number;
  slug?: string;
  title: string;
  main_title?: string;
  position?: string;
  image?: { image: string; alt: string } | null;
  content?: string;
  fields?: Record<string, unknown>;
};

/** A team member's inner page (/team/[slug]). */
export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  position: string;
  image?: string;
  imageAlt: string;
  /** Content field (HTML), "" when empty */
  html: string;
  href: string;
};

/** Same rule as the Drupal module's Slug::make — used only if an older module sends no slug. */
const slugify = (text: string) =>
  text.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const teamPath = (slug: string) => `/team/${slug}`;

function toMember(m: TeamJson): TeamMember {
  const slug = m.slug || slugify(m.title) || `member-${m.nid}`;
  const name = m.main_title || m.title;
  const position = m.position || (typeof m.fields?.field_position === "string" ? (m.fields.field_position as string) : "");
  return {
    id: `team-${m.nid}`,
    slug,
    name,
    position: position.replace(/<[^>]+>/g, "").trim(),
    image: m.image?.image ? absoluteUrl(m.image.image) : undefined,
    imageAlt: m.image?.alt || name,
    html: m.content ? drupalHtml(m.content) : "",
    href: teamPath(slug),
  };
}

/** One team member by slug (made in Drupal from the English name), in the visitor's language. null → not found. */
export async function getTeamMember(slug: string, locale: Locale): Promise<TeamMember | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base || !/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const res = await fetch(`${base}/api/team/${slug}/${locale}?_format=json`, {
      next: { revalidate: 60, tags: [`team:${slug}`] },
    });
    if (!res.ok) return null;
    const m: TeamJson = await res.json();
    return m?.nid ? toMember(m) : null;
  } catch (error) {
    console.error(`Drupal team member "${slug}" could not be loaded`, error);
    return null;
  }
}

/** Every published team member (for links to /team/[slug]); null when Drupal can't be reached. */
export async function getTeamMembers(locale: Locale): Promise<TeamMember[] | null> {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/team/${locale}?_format=json`, { next: { revalidate: 60, tags: ["team"] } });
    if (!res.ok) return null;
    const rows: TeamJson[] = await res.json();
    return Array.isArray(rows) ? rows.map(toMember) : null;
  } catch (error) {
    console.error("Drupal team members could not be loaded", error);
    return null;
  }
}
