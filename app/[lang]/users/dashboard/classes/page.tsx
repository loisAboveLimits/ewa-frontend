import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { TraineeEmpty, TraineeHeading, traineeLinkClass } from "@/components/trainee/TraineeParts";
import { requireTrainee } from "@/lib/auth";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import type { Localized } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("myClasses")), robots: { index: false, follow: false } };
}

const copy: Localized<{ intro: string; emptyTitle: string; emptyText: string; back: string }> = {
  en: {
    intro: "The courses you are enrolled in this term.",
    emptyTitle: "No classes to show yet",
    emptyText: "Your classes will appear here once they have been added to your account.",
    back: "Back to Dashboard",
  },
  ar: {
    intro: "الدورات المسجّل بها هذا الفصل.",
    emptyTitle: "لا توجد فصول لعرضها بعد",
    emptyText: "ستظهر فصولك هنا بمجرد إضافتها إلى حسابك.",
    back: "العودة إلى لوحة التحكم",
  },
};

/**
 * My classes (/users/dashboard/classes) — signed-in trainees only (layout.tsx checks the session).
 * Drupal has no my classes data for trainees yet: connect it here when it does.
 */
export default async function MyClasses() {
  const { locale, t } = await getI18n();
  if (!(await requireTrainee(locale, "/users/dashboard/classes"))) return null; // Drupal unreachable — notice in layout
  const c = copy[locale];

  return (
    <div>
      <TraineeHeading title={t.pages.myClasses.title} intro={c.intro} />
      <TraineeEmpty icon={<svg viewBox="0 0 24 24" className="h-10 w-10 md:h-12 md:w-12" fill="currentColor"><path d="M1.5 9 12 4l10.5 5L12 14 1.5 9Z" /><path d="M6 11.5v4c0 1.7 2.7 3.5 6 3.5s6-1.8 6-3.5v-4L12 14l-6-2.5Z" /></svg>} title={c.emptyTitle} text={c.emptyText}>
        <Link href="/users/dashboard" className={traineeLinkClass}>
          {c.back}
        </Link>
      </TraineeEmpty>
    </div>
  );
}
