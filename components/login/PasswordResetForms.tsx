"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "@/components/i18n/Link";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Localized } from "@/lib/i18n/config";
import { Panel, PanelHeading, PasswordInput, PrimaryButton, TextInput } from "@/components/registration/ui";

const MIN_LENGTH = 8;

const copy: Localized<{
  forgot: { heading: string; subheading: string; submit: string; sending: string; sentTitle: string; sentText: string; back: string };
  reset: {
    heading: string;
    subheading: string;
    password: string;
    confirm: string;
    hint: string;
    submit: string;
    saving: string;
    doneTitle: string;
    doneText: string;
    signIn: string;
    invalidTitle: string;
    invalidText: string;
    requestNew: string;
  };
  errors: { identifier: string; weak: string; mismatch: string; invalid: string; tooMany: string; unavailable: string };
}> = {
  en: {
    forgot: {
      heading: "Forgot your password?",
      subheading: "Enter your username or e-mail and we'll send you a link to choose a new password.",
      submit: "Send Reset Link",
      sending: "Sending…",
      sentTitle: "Check your e-mail",
      sentText:
        "If an account matches the details you entered, we've sent an e-mail with a link to reset your password. The link works once and expires after 24 hours. Remember to check your spam folder.",
      back: "Back to sign in",
    },
    reset: {
      heading: "Choose a new password",
      subheading: "Enter your new password twice to confirm it.",
      password: "New password",
      confirm: "Confirm new password",
      hint: `At least ${MIN_LENGTH} characters.`,
      submit: "Save Password",
      saving: "Saving…",
      doneTitle: "Your password has been changed",
      doneText: "You can now sign in with your new password.",
      signIn: "Sign in",
      invalidTitle: "This link can't be used",
      invalidText: "The reset link is invalid, has expired or has already been used. Please request a new one.",
      requestNew: "Request a new link",
    },
    errors: {
      identifier: "Enter your username or e-mail.",
      weak: `Your password must be at least ${MIN_LENGTH} characters long.`,
      mismatch: "The passwords don't match.",
      invalid: "This reset link is invalid, has expired or has already been used.",
      tooMany: "Too many requests. Please wait a while and try again.",
      unavailable: "This service is not available right now. Please try again later.",
    },
  },
  ar: {
    forgot: {
      heading: "نسيت كلمة المرور؟",
      subheading: "أدخل اسم المستخدم أو البريد الإلكتروني وسنرسل إليك رابطًا لاختيار كلمة مرور جديدة.",
      submit: "إرسال رابط إعادة التعيين",
      sending: "جارٍ الإرسال…",
      sentTitle: "تحقّق من بريدك الإلكتروني",
      sentText:
        "إذا كانت البيانات التي أدخلتها تطابق حسابًا لدينا، فقد أرسلنا رسالة تتضمن رابطًا لإعادة تعيين كلمة المرور. يعمل الرابط مرة واحدة وتنتهي صلاحيته بعد 24 ساعة. لا تنسَ التحقق من مجلد الرسائل غير المرغوب فيها.",
      back: "العودة إلى تسجيل الدخول",
    },
    reset: {
      heading: "اختر كلمة مرور جديدة",
      subheading: "أدخل كلمة المرور الجديدة مرتين للتأكيد.",
      password: "كلمة المرور الجديدة",
      confirm: "تأكيد كلمة المرور الجديدة",
      hint: `${MIN_LENGTH} أحرف على الأقل.`,
      submit: "حفظ كلمة المرور",
      saving: "جارٍ الحفظ…",
      doneTitle: "تم تغيير كلمة المرور",
      doneText: "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.",
      signIn: "تسجيل الدخول",
      invalidTitle: "لا يمكن استخدام هذا الرابط",
      invalidText: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية أو تم استخدامه من قبل. يرجى طلب رابط جديد.",
      requestNew: "طلب رابط جديد",
    },
    errors: {
      identifier: "أدخل اسم المستخدم أو البريد الإلكتروني.",
      weak: `يجب ألا تقل كلمة المرور عن ${MIN_LENGTH} أحرف.`,
      mismatch: "كلمتا المرور غير متطابقتين.",
      invalid: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية أو تم استخدامه من قبل.",
      tooMany: "طلبات كثيرة. يرجى الانتظار قليلًا ثم المحاولة مرة أخرى.",
      unavailable: "هذه الخدمة غير متاحة حاليًا. يرجى المحاولة لاحقًا.",
    },
  },
};

const linkClass = "text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]";

function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-6 rounded-xl bg-white/60 px-4 py-3 text-sm md:text-base text-[#E2582B]">
      {message}
    </p>
  );
}

function Done({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[860px]">
      <Panel bubbles="bottom">
        <div role="status" className="py-4 md:py-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight text-[#13999C]">{title}</h2>
          <p className="mx-auto mt-3 max-w-[40rem] text-base sm:text-lg md:text-2xl text-[#13999C]">{text}</p>
          <div className="mt-8 text-base md:text-2xl">{children}</div>
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- /forgot-password ---------------- */
export function ForgotPasswordForm() {
  const { locale, t } = useI18n();
  const c = copy[locale];
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<{ field?: string; form?: string }>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError({ field: c.errors.identifier });
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/auth/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), lang: locale }),
      });
      if (res.ok) return setSent(true);
      setError({ form: res.status === 429 ? c.errors.tooMany : c.errors.unavailable });
    } catch {
      setError({ form: c.errors.unavailable });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <Done title={c.forgot.sentTitle} text={c.forgot.sentText}>
        <Link href="/login" className={linkClass}>
          {c.forgot.back}
        </Link>
      </Done>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[860px]">
      <form ref={formRef} noValidate onSubmit={submit}>
        <Panel bubbles="bottom">
          <PanelHeading title={c.forgot.heading} subtitle={c.forgot.subheading} />
          <TextInput
            label={t.login.identifier}
            autoComplete="username"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setError({});
            }}
            error={error.field}
          />
          <FormError message={error.form} />
          <div className="mt-10 md:mt-12 flex flex-col items-center gap-5 md:gap-6">
            <PrimaryButton disabled={sending}>{sending ? c.forgot.sending : c.forgot.submit}</PrimaryButton>
            <Link href="/login" className={`text-base md:text-2xl ${linkClass}`}>
              {c.forgot.back}
            </Link>
          </div>
        </Panel>
      </form>
    </div>
  );
}

/* ---------------- /reset-password?uid=…&ts=…&hash=… ---------------- */
export function ResetPasswordForm({ uid, ts, hash }: { uid?: string; ts?: string; hash?: string }) {
  const { locale, t } = useI18n();
  const c = copy[locale];
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string; form?: string }>({});
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<"form" | "done" | "invalid">(uid && ts && hash ? "form" : "invalid");
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found: typeof errors = {};
    if (password.length < MIN_LENGTH) found.password = c.errors.weak;
    else if (password !== confirm) found.confirm = c.errors.mismatch;
    if (Object.keys(found).length) {
      setErrors(found);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, ts, hash, password }),
      });
      if (res.ok) return setState("done");
      const { error } = await res.json().catch(() => ({ error: "unavailable" }));
      if (error === "invalid") return setState("invalid");
      setErrors({ form: error === "weak" ? c.errors.weak : c.errors.unavailable });
    } catch {
      setErrors({ form: c.errors.unavailable });
    } finally {
      setSaving(false);
    }
  };

  if (state === "done") {
    return (
      <Done title={c.reset.doneTitle} text={c.reset.doneText}>
        <Link href="/login" className={linkClass}>
          {c.reset.signIn}
        </Link>
      </Done>
    );
  }
  if (state === "invalid") {
    return (
      <Done title={c.reset.invalidTitle} text={c.reset.invalidText}>
        <Link href="/forgot-password" className={linkClass}>
          {c.reset.requestNew}
        </Link>
      </Done>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[860px]">
      <form ref={formRef} noValidate onSubmit={submit}>
        <Panel bubbles="bottom">
          <PanelHeading title={c.reset.heading} subtitle={c.reset.subheading} />
          <div className="grid grid-cols-1 gap-4 md:gap-5 [&>*]:min-w-0">
            <PasswordInput
              label={c.reset.password}
              autoComplete="new-password"
              value={password}
              onChange={(v) => {
                setPassword(v);
                setErrors({});
              }}
              error={errors.password}
              showLabel={t.login.showPassword}
              hideLabel={t.login.hidePassword}
            />
            <PasswordInput
              label={c.reset.confirm}
              autoComplete="new-password"
              value={confirm}
              onChange={(v) => {
                setConfirm(v);
                setErrors({});
              }}
              error={errors.confirm}
              showLabel={t.login.showPassword}
              hideLabel={t.login.hidePassword}
            />
          </div>
          <p className="mt-3 px-2 text-sm md:text-base text-[#13999C]">{c.reset.hint}</p>
          <FormError message={errors.form} />
          <div className="mt-10 md:mt-12 flex justify-center">
            <PrimaryButton disabled={saving}>{saving ? c.reset.saving : c.reset.submit}</PrimaryButton>
          </div>
        </Panel>
      </form>
    </div>
  );
}
