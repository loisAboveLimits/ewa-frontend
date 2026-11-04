"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Locale, Localized } from "@/lib/i18n/config";
import { Checkbox, Panel, PanelHeading, PhoneInput, PrimaryButton, SelectInput, TextInput } from "@/components/registration/ui";

/* Same field look as the login / registration forms (components/registration/ui.tsx) */
const fieldBase =
  "w-full rounded-2xl md:rounded-[20px] bg-[#94D3D1] px-6 md:px-12 " +
  "text-base md:text-xl text-white placeholder:text-white/90 outline-none " +
  "shadow-[0_4px_12px_rgba(19,153,156,0.08)] transition " +
  "focus:bg-[#8ACECC] focus:ring-2 focus:ring-[#EE7A52]/50";
const errorRing = "ring-2 ring-[#EE7A52]";

const MAX_CV_MB = 5;
const CV_TYPES = ".pdf,.doc,.docx";

type ApplicationData = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  cv: File | null;
  message: string;
  consent: boolean;
};
type Field = keyof ApplicationData;
type Errors = Partial<Record<Field | "form", string>>;

const copy: Localized<{
  heading: string;
  subheading: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  experienceOptions: { value: string; label: string }[];
  cv: string;
  cvHint: string;
  cvChoose: string;
  message: string;
  consent: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successText: string;
  errors: Record<Field | "failed" | "cvSize" | "cvType", string>;
}> = {
  en: {
    heading: "Apply for this position",
    subheading: "Fill in your details and attach your CV",
    name: "Full name",
    email: "Email address",
    phone: "Mobile number",
    experience: "Years of experience",
    experienceOptions: [
      { value: "0-1", label: "Less than 1 year" },
      { value: "1-3", label: "1 – 3 years" },
      { value: "3-5", label: "3 – 5 years" },
      { value: "5-10", label: "5 – 10 years" },
      { value: "10+", label: "More than 10 years" },
    ],
    cv: "CV / Resume",
    cvHint: `PDF or Word, up to ${MAX_CV_MB} MB`,
    cvChoose: "Choose file",
    message: "Cover letter (optional)",
    consent: "I confirm that the information I have provided is correct.",
    submit: "Submit Application",
    submitting: "Submitting…",
    successTitle: "Thank you for applying!",
    successText: "We have received your application and will contact you if your profile matches the position.",
    errors: {
      name: "Please enter your full name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid mobile number (5XXXXXXXX).",
      experience: "Please choose your years of experience.",
      cv: "Please attach your CV.",
      cvSize: `The file must be ${MAX_CV_MB} MB or smaller.`,
      cvType: "Please attach a PDF or Word file.",
      message: "",
      consent: "Please confirm that your information is correct.",
      failed: "Your application could not be sent. Please try again.",
    },
  },
  ar: {
    heading: "قدّم على هذه الوظيفة",
    subheading: "أدخل بياناتك وأرفق سيرتك الذاتية",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    experience: "سنوات الخبرة",
    experienceOptions: [
      { value: "0-1", label: "أقل من سنة" },
      { value: "1-3", label: "1 – 3 سنوات" },
      { value: "3-5", label: "3 – 5 سنوات" },
      { value: "5-10", label: "5 – 10 سنوات" },
      { value: "10+", label: "أكثر من 10 سنوات" },
    ],
    cv: "السيرة الذاتية",
    cvHint: `ملف PDF أو Word، حتى ${MAX_CV_MB} ميجابايت`,
    cvChoose: "اختر ملفًا",
    message: "خطاب التقديم (اختياري)",
    consent: "أؤكد أن المعلومات التي قدمتها صحيحة.",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    successTitle: "شكرًا لتقديمك!",
    successText: "تم استلام طلبك، وسنتواصل معك إذا كان ملفك مناسبًا للوظيفة.",
    errors: {
      name: "يرجى إدخال الاسم الكامل.",
      email: "يرجى إدخال بريد إلكتروني صحيح.",
      phone: "يرجى إدخال رقم جوال صحيح (5XXXXXXXX).",
      experience: "يرجى اختيار سنوات الخبرة.",
      cv: "يرجى إرفاق السيرة الذاتية.",
      cvSize: `يجب ألا يتجاوز حجم الملف ${MAX_CV_MB} ميجابايت.`,
      cvType: "يرجى إرفاق ملف PDF أو Word.",
      message: "",
      consent: "يرجى تأكيد صحة المعلومات.",
      failed: "تعذّر إرسال طلبك. يرجى المحاولة مرة أخرى.",
    },
  },
};

/**
 * Job application form on /career/[slug] — same panel, fields and buttons as the
 * login and registration forms. Connect `submitApplication` to the real backend.
 */
export default function CareerApplicationForm({ careerId, careerTitle }: { careerId: string; careerTitle: string }) {
  const { locale } = useI18n();
  const c = copy[locale as Locale];
  const [data, setData] = useState<ApplicationData>({ name: "", email: "", phone: "", experience: "", cv: null, message: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends Field>(key: K, value: ApplicationData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  };

  const validate = (): Errors => {
    const found: Errors = {};
    if (!data.name.trim()) found.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) found.email = c.errors.email;
    if (!/^5\d{8}$/.test(data.phone)) found.phone = c.errors.phone;
    if (!data.experience) found.experience = c.errors.experience;
    if (!data.cv) found.cv = c.errors.cv;
    else if (!/\.(pdf|docx?)$/i.test(data.cv.name)) found.cv = c.errors.cvType;
    else if (data.cv.size > MAX_CV_MB * 1024 * 1024) found.cv = c.errors.cvSize;
    if (!data.consent) found.consent = c.errors.consent;
    return found;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setSubmitting(true);
    try {
      await submitApplication({ ...data, careerId, careerTitle });
      setSent(true);
    } catch {
      setErrors({ form: c.errors.failed });
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-[860px]">
        <Panel bubbles="bottom">
          <div role="status" className="py-6 md:py-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight text-[#13999C]">{c.successTitle}</h2>
            <p className="mt-3 text-base sm:text-lg md:text-2xl text-[#13999C]">{c.successText}</p>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[860px]">
      <form ref={formRef} noValidate onSubmit={handleSubmit}>
        <Panel bubbles="bottom">
          <PanelHeading title={c.heading} subtitle={c.subheading} />

          <div className="grid gap-4 md:gap-5">
            <TextInput label={c.name} autoComplete="name" value={data.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
            <TextInput label={c.email} type="email" autoComplete="email" inputMode="email" value={data.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
            <PhoneInput label={c.phone} value={data.phone} onChange={(v) => update("phone", v)} error={errors.phone} />
            <SelectInput label={c.experience} value={data.experience} onChange={(v) => update("experience", v)} options={c.experienceOptions} error={errors.experience} />
            <FileInput label={c.cv} hint={c.cvHint} choose={c.cvChoose} file={data.cv} onChange={(f) => update("cv", f)} error={errors.cv} />
            <TextArea label={c.message} value={data.message} onChange={(v) => update("message", v)} />
          </div>

          <div className="mt-5 md:mt-6">
            <Checkbox checked={data.consent} onChange={(v) => update("consent", v)} error={errors.consent}>
              {c.consent}
            </Checkbox>
          </div>

          {errors.form && (
            <p role="alert" className="mt-6 rounded-xl bg-white/60 px-4 py-3 text-sm md:text-base text-[#E2582B]">
              {errors.form}
            </p>
          )}

          <div className="mt-10 md:mt-12 flex justify-center">
            <PrimaryButton disabled={submitting}>{submitting ? c.submitting : c.submit}</PrimaryButton>
          </div>
        </Panel>
      </form>
    </div>
  );
}

/* ---------- CV upload: looks like the other fields ---------- */
function FileInput({
  label,
  hint,
  choose,
  file,
  onChange,
  error,
}: {
  label: string;
  hint: string;
  choose: string;
  file: File | null;
  onChange: (f: File | null) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className={
          `${fieldBase} ${error ? errorRing : ""} flex h-14 md:h-[68px] cursor-pointer items-center justify-between gap-4 ` +
          "focus-within:ring-2 focus-within:ring-[#EE7A52]/50"
        }
      >
        <span className="min-w-0 truncate">
          {file ? file.name : label}
          {!file && <span className="ms-2 hidden sm:inline text-sm md:text-base text-white/75">— {hint}</span>}
        </span>
        <span className="shrink-0 rounded-full bg-white/25 px-4 py-1.5 text-sm md:text-base font-semibold">{choose}</span>
        <input
          id={id}
          type="file"
          accept={CV_TYPES}
          className="sr-only"
          aria-invalid={!!error}
          aria-describedby={`${id}-hint${error ? ` ${id}-err` : ""}`}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
      <p id={`${id}-hint`} className="mt-1.5 px-2 text-sm text-[#13999C] sm:hidden">{hint}</p>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 px-2 text-sm text-[#E2582B]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- multi-line text: looks like the other fields ---------- */
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        rows={5}
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldBase} block min-h-36 resize-y py-4 md:py-5`}
      />
    </div>
  );
}

/* Replace with your real API call (route handler, server action, Drupal webform…) */
async function submitApplication(data: ApplicationData & { careerId: string; careerTitle: string }) {
  // const body = new FormData(); — e.g. POST to /api/careers/apply
  // body.append("career", data.careerId); body.append("cv", data.cv!); …
  // const res = await fetch("/api/careers/apply", { method: "POST", body });
  // if (!res.ok) throw new Error("Application failed");
  await new Promise((r) => setTimeout(r, 800));
  console.info("Career application submitted", { career: data.careerId, title: data.careerTitle, name: data.name, email: data.email });
}
