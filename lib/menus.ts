// Drupal menus prepared for the Next.js header / footer (server-only: uses lib/drupal.ts).
import { getMenu, type DrupalMenuItem } from "@/lib/drupal";
import type { Locale } from "@/lib/i18n/config";

/** Machine names of the Drupal menus (Structure → Menus). */
export const MENUS = {
  header: "front",
  footer: "frontend-footer",
} as const;

/** One link, ready for the localized <Link>. */
export type NavItem = {
  key: string;
  label: string;
  href: string;
  external?: boolean;
  children: NavItem[];
};

/**
 * A Drupal menu as a tree of NavItems.
 * Titles come from the visitor's language; link targets always come from the English menu,
 * because the Next.js routes are the English slugs (/about, /why…) and the localized <Link>
 * adds /ar itself. Returns [] if Drupal can't be reached, so callers can fall back to a built-in list.
 */
export async function getNavMenu(menu: string, locale: Locale): Promise<NavItem[]> {
  try {
    const [local, english] = await Promise.all([
      getMenu(menu, locale),
      locale === "en" ? Promise.resolve<DrupalMenuItem[] | null>(null) : getMenu(menu, "en"),
    ]);

    const enById = new Map<string, DrupalMenuItem>();
    const index = (items: DrupalMenuItem[]) =>
      items.forEach((item) => {
        enById.set(item.id, item);
        index(item.children);
      });
    index(english ?? local);

    const convert = (items: DrupalMenuItem[]): NavItem[] =>
      items.map((item) => {
        const target = enById.get(item.id) ?? item;
        return {
          key: item.id,
          label: item.title,
          href: target.external ? target.url : target.path || "#",
          external: target.external,
          children: convert(item.children),
        };
      });

    return convert(local);
  } catch (error) {
    console.error(`Drupal menu "${menu}" could not be loaded`, error);
    return [];
  }
}
