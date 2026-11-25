import type { Metadata } from "next";
import ApplyCourses from "@/components/trainee/ApplyCourses";
import { TraineeHeading } from "@/components/trainee/TraineeParts";
import { requireTrainee } from "@/lib/auth";
import { courseMatchesProgram, getCourses } from "@/lib/courses";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import type { Localized } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("applyCourse")), robots: { index: false, follow: false } };
}

const intro: Localized<string> = {
  en: "Choose the programs you would like to join and send your application. You are already registered, so there is nothing else to fill in.",
  ar: "اختر البرامج التي ترغب في الالتحاق بها وأرسل طلبك. أنت مسجّل مسبقًا، فلا حاجة لتعبئة أي بيانات أخرى.",
};

/**
 * Apply for a course (/users/dashboard/apply) — signed-in trainees only (layout.tsx checks the
 * session). Visitors who are signed in and open /join/registration are sent here (proxy.ts).
 */
export default async function ApplyCourse() {
  const { locale, t } = await getI18n();
  const user = await requireTrainee(locale, "/users/dashboard/apply");
  if (!user) return null; // Drupal unreachable — notice in layout

  // programs already on the account → their course ids (shown as "Applied")
  const programs = user.profile?.programs ?? [];
  const applied = getCourses(locale)
    .filter((course) => programs.some((p) => courseMatchesProgram(course.id, p.slug)))
    .map((course) => course.id);

  return (
    <div>
      <TraineeHeading title={t.pages.applyCourse.title} intro={intro[locale]} />
      <ApplyCourses applied={applied} />
    </div>
  );
}
