import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Route of every page. Titles / descriptions come from the dictionaries (`pages` key). */
export const pagePaths = {
  home: "/",
  about: "/about",
  why: "/why",
  programs: "/why/programs",
  community: "/community",
  users: "/users",
  join: "/join",
  contact: "/contact",
  rules: "/rules-regulations",
  awards: "/awards",
  campus: "/why/campus-facilities",
  registration: "/join/registration",
  login: "/login",
  media: "/media-center",
  events: "/media-center/events",
  news: "/media-center/news-articles",
  stories: "/media-center/success-stories",
  graduate: "/media-center/graduate-projects",
  gallery: "/media-center/gallery",
} as const;

export type PageKey = keyof typeof pagePaths;
export type PageInfo = { title: string; desc: string; path: string };

/** Combine routes with the translated titles: `buildPages(t.pages)` */
export function buildPages(copy: Dictionary["pages"]): Record<PageKey, PageInfo> {
  return Object.fromEntries(
    (Object.keys(pagePaths) as PageKey[]).map((key) => [key, { ...copy[key], path: pagePaths[key] }])
  ) as Record<PageKey, PageInfo>;
}
