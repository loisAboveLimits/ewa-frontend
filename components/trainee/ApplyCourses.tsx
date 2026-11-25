"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/i18n/Link";
import CoursePicker from "@/components/trainee/CoursePicker";
import { TraineeCard, traineeLinkClass } from "@/components/trainee/TraineeParts";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Localized } from "@/lib/i18n/config";

const copy: Localized<{ pick: string; failed: string; signedOut: string; doneTitle: string; doneText: string; more: string; dashboard: string }> = {
  en: {
    pick: "Add at least one course to apply.",
    failed: "Something went wrong sending your application. Please try again.",
    signedOut: "Your session has ended. Please sign in again.",
    doneTitle: "Your application has been sent!",
    doneText: "The courses are now on your account. We will review your application and contact you shortly.",
    more: "Apply for another course",
    dashboard: "Back to Dashboard",
  },
  ar: {
    pick: "أضف برنامجًا واحدًا على الأقل للتقديم.",
    failed: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.",
    signedOut: "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.",
    doneTitle: "تم إرسال طلبك!",
    doneText: "أُضيفت البرامج إلى حسابك. سنراجع طلبك ونتواصل معك قريبًا.",
    more: "التقديم على برنامج آخر",
    dashboard: "العودة إلى لوحة التحكم",
  },
};

/**
 * Apply for a course — signed-in trainees only (registration is for new trainees).
 * `applied`: course ids already on the account (Drupal field_programs).
 * Sends the new ones to /api/auth/programs (→ Drupal POST /api/auth/programs).
 */
export default function ApplyCourses({ applied }: { applied: string[] }) {
  const { locale } = useI18n();
  const c = copy[locale];
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const toggle = (id: string) => {
    setError(undefined);
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected.length) return setError(c.pick);
    setSubmitting(true);
    setError(undefined);
    try {
      const res = await fetch("/api/auth/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courses: selected, lang: locale }),
      });
      if (res.ok) {
        setSent(true);
        setSelected([]);
        router.refresh(); // the dashboard / applied list read the programs again
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setError(res.status === 401 ? c.signedOut : c.failed);
    } catch {
      setError(c.failed);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <TraineeCard>
        <div role="status" aria-live="polite">
          <h3 className="text-2xl md:text-3xl font-bold text-[#14989A]">{c.doneTitle}</h3>
          <p className="mt-2 text-base md:text-lg leading-relaxed text-[#14989A]">{c.doneText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setSent(false)} className={traineeLinkClass + " cursor-pointer"}>
              {c.more}
            </button>
            <Link href="/users/dashboard" className={traineeLinkClass}>
              {c.dashboard}
            </Link>
          </div>
        </div>
      </TraineeCard>
    );
  }

  return (
    <form noValidate onSubmit={submit}>
      <CoursePicker selected={selected} onToggle={toggle} applied={applied} error={error} submitting={submitting} />
    </form>
  );
}
