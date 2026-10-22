import type { OrbitAction, OrbitMember } from "./OrbitShowcase";
import type { Locale, Localized } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Dynamic content — replace with data from your CMS / API.
 * `angle` is optional: leave it out and members are spaced evenly on their ring.
 * Angles: 0 = right, 90 = bottom, 180 = left, -90 = top.
 */
type MemberBase = Omit<OrbitMember, "name" | "role" | "description">;
type MemberCopy = Pick<OrbitMember, "name" | "role" | "description">;

const members: MemberBase[] = [
  { id: "tariq", image: "/team/tariq.jpg", ring: "outer", angle: -60 },
  { id: "member-1", image: "/team/member-1.jpg", ring: "outer", angle: -130 },
  { id: "member-2", image: "/team/member-2.jpg", ring: "outer", angle: 175 },
  { id: "member-5", image: "/team/member-5.jpg", ring: "outer", angle: 30 },
  { id: "member-3", image: "/team/member-3.jpg", ring: "inner", angle: -5 },
  { id: "member-4", image: "/team/member-4.jpg", ring: "inner", angle: 125 },
];

const placeholder: Localized<MemberCopy> = {
  en: { name: "Team Member", role: "Role", description: "Short quote or description goes here." },
  ar: { name: "عضو الفريق", role: "المسمى الوظيفي", description: "نص قصير أو اقتباس يُكتب هنا." },
};

const copy: Localized<Record<string, MemberCopy>> = {
  en: {
    tariq: {
      name: "Tariq AlShamrani",
      role: "CEO",
      description: "EWA is the ideal place to showcase your abilities for hard work and creativity.",
    },
  },
  ar: {
    tariq: {
      name: "طارق الشمراني",
      role: "الرئيس التنفيذي",
      description: "الأكاديمية هي المكان المثالي لإبراز قدراتك على العمل الجاد والإبداع.",
    },
  },
};

export const getTeam = (locale: Locale): OrbitMember[] =>
  members.map((m) => ({ ...m, ...(copy[locale][m.id] ?? placeholder[locale]) }));

export const getOrbitActions = (t: Dictionary): OrbitAction[] => [
  { id: "join-inner", ring: "inner", angle: -90, label: t.orbit.joinTeam, href: "/careers" },
  { id: "join-outer", ring: "outer", angle: 90, label: t.orbit.seeAll, href: "/team" },
];
