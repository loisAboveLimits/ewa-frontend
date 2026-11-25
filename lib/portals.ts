// Portal cards for the Trainee Dashboard "Your Portals" section.
// Content: Drupal node 82 ("Users - Portal Box", api/section/82/{lang}) — the same cards as the
// Users page; the dictionaries (`users` in en.ts / ar.ts) are the fallback when Drupal is down.
import { fetchView } from "@/lib/drupal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale, Localized } from "@/lib/i18n/config";

export const PORTALS_NID = 82;

export type PortalKey = "admin" | "staff" | "sponsor" | "trainee" | "candidate" | "alumni" | "other";
export type Portal = { key: PortalKey; title: string; text: string; link: string };

/** Portals a signed-in trainee (or any authenticated user who isn't an administrator) sees. */
const TRAINEE_PORTALS: PortalKey[] = ["trainee", "alumni", "candidate"];
/** Drupal roles that see every portal. */
const ADMIN_ROLES = ["administrator"];

/** Which portal a card is, from its link (titles change with the language, links don't). */
export function portalKey(link: string): PortalKey {
  if (link.includes("/join/registration")) return "candidate";
  if (link.includes("trainee-portal")) return "trainee";
  if (link.includes("alumni")) return "alumni";
  if (link.includes("sponsor")) return "sponsor";
  if (link.includes("dashboard188")) return "admin";
  if (link.includes("/training/")) return "staff";
  return "other";
}

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

/** Cards in the node's HTML: <h2>title</h2> … <p>text</p> … <a href="link">. */
function parseCards(html: string): Portal[] {
  const cards: Portal[] = [];
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<a[^>]*href="([^"]+)"/g;
  for (const m of html.matchAll(re)) {
    const link = decode(m[3]);
    cards.push({ key: portalKey(link), title: decode(m[1]), text: decode(m[2]), link });
  }
  return cards;
}

/** Used when Drupal can't be reached (the dictionary list has no Candidate Gate). */
const candidate: Localized<Portal> = {
  en: { key: "candidate", title: "Candidate Gate", text: "Fill out the form to become a Trainee", link: "/join/registration" },
  ar: { key: "candidate", title: "بوابة المرشحين", text: "املأ النموذج لتصبح متدرباً", link: "/join/registration" },
};

export async function getPortals(locale: Locale): Promise<Portal[]> {
  try {
    const [row] = await fetchView<{ field_content?: string }>({ path: "section", args: [PORTALS_NID], lang: locale });
    const cards = parseCards(row?.field_content ?? "");
    if (cards.length) return cards;
  } catch (error) {
    console.error("Portals (node 82) could not be loaded", error);
  }
  const t = getDictionary(locale);
  return [
    ...t.users.map((p) => ({ key: portalKey(p.link), title: p.cardTitle, text: p.cardText, link: p.link })),
    candidate[locale],
  ];
}

/** Administrators see every portal; trainees / authenticated users only Trainee, Alumni and Candidate. */
export function portalsFor(portals: Portal[], roles: string[] = []): Portal[] {
  if (roles.some((r) => ADMIN_ROLES.includes(r))) return portals;
  return portals.filter((p) => TRAINEE_PORTALS.includes(p.key));
}
