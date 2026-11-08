import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { TraineeEmpty, TraineeHeading, traineeLinkClass } from "@/components/trainee/TraineeParts";
import { requireTrainee } from "@/lib/auth";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import type { Localized } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("teachers")), robots: { index: false, follow: false } };
}

const copy: Localized<{ intro: string; emptyTitle: string; emptyText: string; back: string }> = {
  en: {
    intro: "The instructors who teach your classes.",
    emptyTitle: "No teachers to show yet",
    emptyText: "Your instructors will appear here once your classes have been added to your account.",
    back: "Back to Dashboard",
  },
  ar: {
    intro: "المدربون الذين يقدّمون فصولك.",
    emptyTitle: "لا يوجد مدربون لعرضهم بعد",
    emptyText: "سيظهر مدربوك هنا بمجرد إضافة فصولك إلى حسابك.",
    back: "العودة إلى لوحة التحكم",
  },
};

/**
 * Teachers (/users/dashboard/teachers) — signed-in trainees only (layout.tsx checks the session).
 * Drupal has no teachers data for trainees yet: connect it here when it does.
 */
export default async function Teachers() {
  const { locale, t } = await getI18n();
  if (!(await requireTrainee(locale, "/users/dashboard/teachers"))) return null; // Drupal unreachable — notice in layout
  const c = copy[locale];

  return (
    <div>
      <TraineeHeading title={t.pages.teachers.title} intro={c.intro} />
      <TraineeEmpty icon={<svg viewBox="0 0 24 24" className="h-10 w-10 md:h-12 md:w-12" fill="currentColor"><circle cx="8.5" cy="7.5" r="3.5" /><circle cx="16.5" cy="7" r="3" /><path d="M1.5 19.5c0-3.6 3.1-6 7-6s7 2.4 7 6v.5h-14v-.5Z" /><path d="M16.5 12.5c3.4 0 6 2.1 6 5.4V20h-5.5v-.5c0-2.6-1-4.7-2.7-6.2.7-.5 1.4-.8 2.2-.8Z" /></svg>} title={c.emptyTitle} text={c.emptyText}>
        <Link href="/users/dashboard" className={traineeLinkClass}>
          {c.back}
        </Link>
      </TraineeEmpty>
    </div>
  );
}
