"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Localized } from "@/lib/i18n/config";

/*
 * Shared logic of the contact forms (home page and Contact page): Sponsorship options and
 * submission through /api/contact → Drupal webform "ewa_contact_us".
 */

export type ContactValues = { sponsorship: string; fname: string; lname: string; email: string; phone: string; message: string };
type Field = keyof ContactValues;

const empty: ContactValues = { sponsorship: "", fname: "", lname: "", email: "", phone: "", message: "" };

const copy: Localized<{ sending: string; sent: string; invalid: string; closed: string; tooMany: string; unavailable: string }> = {
  en: {
    sending: "Sending…",
    sent: "Thank you! Your message has been sent. We'll get back to you soon.",
    invalid: "Please check the highlighted fields.",
    closed: "This form is not accepting messages right now. Please contact us by phone or e-mail.",
    tooMany: "You've sent several messages already. Please wait a while and try again.",
    unavailable: "We couldn't send your message right now. Please try again later.",
  },
  ar: {
    sending: "جارٍ الإرسال…",
    sent: "شكرًا لك! تم إرسال رسالتك وسنتواصل معك قريبًا.",
    invalid: "يرجى مراجعة الحقول المحددة.",
    closed: "لا يستقبل هذا النموذج الرسائل حاليًا. يرجى التواصل معنا عبر الهاتف أو البريد الإلكتروني.",
    tooMany: "لقد أرسلت عدة رسائل بالفعل. يرجى الانتظار قليلًا ثم المحاولة مرة أخرى.",
    unavailable: "تعذّر إرسال رسالتك حاليًا. يرجى المحاولة لاحقًا.",
  },
};

export type ContactStatus = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

export function useContactForm() {
  const { locale, t } = useI18n();
  const c = copy[locale];
  const pathname = usePathname();

  // Sponsorship options from the webform; the dictionary labels are only a fallback
  const fallback = t.contact.form.sponsorshipOptions.map((label, i) => ({ value: String(i + 1), label }));
  const [sponsorships, setSponsorships] = useState<{ value: string; label: string }[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(`/api/contact?lang=${locale}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const list = d?.options?.sponsorship;
        if (alive && Array.isArray(list) && list.length) setSponsorships(list);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [locale]);

  const [values, setValues] = useState<ContactValues>(empty);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<ContactStatus>({ kind: "idle" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status.kind === "sent" || status.kind === "error") setStatus({ kind: "idle" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending", message: c.sending });
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang: locale, page: pathname, website: honeypot }),
      });
      const result: { error?: string; fields?: Partial<Record<Field, string>> } = await res.json().catch(() => ({}));
      if (res.ok) {
        setValues(empty);
        setStatus({ kind: "sent", message: c.sent });
        return;
      }
      if (result.error === "invalid" && result.fields) {
        setErrors(result.fields);
        setStatus({ kind: "error", message: c.invalid });
        return;
      }
      setStatus({
        kind: "error",
        message: res.status === 429 ? c.tooMany : res.status === 403 ? c.closed : c.unavailable,
      });
    } catch {
      setStatus({ kind: "error", message: c.unavailable });
    }
  };

  return {
    values,
    errors,
    status,
    sending: status.kind === "sending",
    sponsorshipOptions: sponsorships ?? fallback,
    handleChange,
    handleSubmit,
    /** props for the hidden spam-trap field */
    honeypotProps: {
      name: "website",
      value: honeypot,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value),
      tabIndex: -1,
      autoComplete: "off",
      "aria-hidden": true,
    } as const,
  };
}
