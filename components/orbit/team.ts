import type { OrbitAction, OrbitMember } from "./OrbitShowcase";

/**
 * Dynamic content — replace with data from your CMS / API.
 * `angle` is optional: leave it out and members are spaced evenly on their ring.
 * Angles: 0 = right, 90 = bottom, 180 = left, -90 = top.
 */
export const team: OrbitMember[] = [
  {
    id: "tariq",
    name: "Tariq AlShamrani",
    role: "CEO",
    description: "EWA is the ideal place to showcase your abilities for hard work and creativity.",
    image: "/team/tariq.jpg",
    ring: "outer",
    angle: -60,
  },
  {
    id: "member-1",
    name: "Team Member",
    role: "Role",
    description: "Short quote or description goes here.",
    image: "/team/member-1.jpg",
    ring: "outer",
    angle: -130,
  },
  {
    id: "member-2",
    name: "Team Member",
    role: "Role",
    description: "Short quote or description goes here.",
    image: "/team/member-2.jpg",
    ring: "outer",
    angle: 175,
  },
  {
    id: "member-5",
    name: "Team Member",
    role: "Role",
    description: "Short quote or description goes here.",
    image: "/team/member-5.jpg",
    ring: "outer",
    angle: 30,
  },
  {
    id: "member-3",
    name: "Team Member",
    role: "Role",
    description: "Short quote or description goes here.",
    image: "/team/member-3.jpg",
    ring: "inner",
    angle: -5,
  },
  {
    id: "member-4",
    name: "Team Member",
    role: "Role",
    description: "Short quote or description goes here.",
    image: "/team/member-4.jpg",
    ring: "inner",
    angle: 125,
  },
];

export const orbitActions: OrbitAction[] = [
  { id: "join-inner", ring: "inner", angle: -90, label: "Join the team", href: "/careers" },
  { id: "join-outer", ring: "outer", angle: 90, label: "See all members", href: "/team" },
];
