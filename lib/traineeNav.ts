import type { Localized } from "@/lib/i18n/config";

/* Trainee area (signed-in only — see PROTECTED_PATHS in lib/authCookies.ts) */

export type TraineeNavKey = "dashboard" | "classes" | "teachers" | "schedule" | "profile";

export const traineeNav: { key: TraineeNavKey; href: string }[] = [
  { key: "dashboard", href: "/users/dashboard" },
  { key: "classes", href: "/users/dashboard/classes" },
  { key: "teachers", href: "/users/dashboard/teachers" },
  { key: "schedule", href: "/users/dashboard/schedule" },
  { key: "profile", href: "/users/dashboard/profile" },
];

export const traineeCopy: Localized<{
  welcome: (name: string) => string;
  menu: string;
  signOut: string;
  nav: Record<TraineeNavKey, string>;
}> = {
  en: {
    welcome: (name) => `Welcome, ${name}!`,
    menu: "Trainee menu",
    signOut: "Sign out",
    nav: { dashboard: "Dashboard", classes: "My classes", teachers: "Teachers", schedule: "Schedule", profile: "My Profile" },
  },
  ar: {
    welcome: (name) => `مرحبًا، ${name}!`,
    menu: "قائمة المتدرب",
    signOut: "تسجيل الخروج",
    nav: { dashboard: "لوحة التحكم", classes: "فصولي", teachers: "المدربون", schedule: "الجدول", profile: "ملفي الشخصي" },
  },
};
