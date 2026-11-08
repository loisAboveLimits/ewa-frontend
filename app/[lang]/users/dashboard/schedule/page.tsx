import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { TraineeEmpty, TraineeHeading, traineeLinkClass } from "@/components/trainee/TraineeParts";
import { requireTrainee } from "@/lib/auth";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import type { Localized } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("schedule")), robots: { index: false, follow: false } };
}

const copy: Localized<{ intro: string; emptyTitle: string; emptyText: string; back: string }> = {
  en: {
    intro: "Your timetable of classes, exams and activities.",
    emptyTitle: "No schedule to show yet",
    emptyText: "Your timetable will appear here once your classes have been scheduled.",
    back: "Back to Dashboard",
  },
  ar: {
    intro: "جدول فصولك واختباراتك وأنشطتك.",
    emptyTitle: "لا يوجد جدول لعرضه بعد",
    emptyText: "سيظهر جدولك هنا بمجرد جدولة فصولك.",
    back: "العودة إلى لوحة التحكم",
  },
};

/**
 * Schedule (/users/dashboard/schedule) — signed-in trainees only (layout.tsx checks the session).
 * Drupal has no schedule data for trainees yet: connect it here when it does.
 */
export default async function Schedule() {
  const { locale, t } = await getI18n();
  if (!(await requireTrainee(locale, "/users/dashboard/schedule"))) return null; // Drupal unreachable — notice in layout
  const c = copy[locale];

  return (
    <div>
      <TraineeHeading title={t.pages.schedule.title} intro={c.intro} />
      <TraineeEmpty icon={<svg viewBox="0 0 24 24" className="h-10 w-10 md:h-12 md:w-12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>} title={c.emptyTitle} text={c.emptyText}>
        <Link href="/users/dashboard" className={traineeLinkClass}>
          {c.back}
        </Link>
      </TraineeEmpty>
    </div>
  );
}
