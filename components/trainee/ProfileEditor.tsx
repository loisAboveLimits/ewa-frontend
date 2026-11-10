"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";
import { DateInput, PhoneInput, SelectInput, TextInput } from "@/components/registration/ui";
import { TraineeCard } from "@/components/trainee/TraineeParts";
import type { TraineeProfile } from "@/lib/auth";
import { formatDate, type Localized } from "@/lib/i18n/config";
import {
  getOptions,
  initialData,
  validateAcademic,
  validateEmployment,
  validatePersonal,
  type Errors,
  type Option,
  type RegistrationData,
} from "@/lib/registration";

/*
 * My Profile — the registration details, one card per registration step. Each card has an
 * Edit button that turns it into a form; Save sends the card's fields to /api/auth/profile
 * (Drupal) and reloads the page data. National ID / Iqama (the username), e-mail and the
 * selected programs can't be changed here.
 */

const SECTIONS = {
  personal: ["firstName", "fatherName", "grandfatherName", "lastName", "gender", "dob", "height", "weight", "mobile", "altMobile", "relation"],
  academic: ["qualification", "major", "graduationYear", "englishLevel", "stepGrade", "gpa", "university"],
  employment: ["employed", "socialInsurance", "qiwa", "commercialReg", "hrdf", "referral"],
} as const satisfies Record<string, readonly (keyof RegistrationData)[]>;

type Section = keyof typeof SECTIONS;
type Field = (typeof SECTIONS)[Section][number];
type Values = Record<Field, string>;

const copy: Localized<{
  personal: string;
  academic: string;
  employment: string;
  name: string;
  notProvided: string;
  edit: string;
  editLabel: string;
  save: string;
  saving: string;
  cancel: string;
  saved: string;
  failed: string;
  checkFields: string;
  locked: string;
}> = {
  en: {
    personal: "Personal information",
    academic: "Academic information",
    employment: "Employment & eligibility",
    name: "Name",
    notProvided: "Not provided",
    edit: "Edit",
    editLabel: "Edit {section}",
    save: "Save changes",
    saving: "Saving…",
    cancel: "Cancel",
    saved: "Your changes have been saved.",
    failed: "We couldn't save your changes right now. Please try again later.",
    checkFields: "Please check the highlighted fields.",
    locked: "Your National ID / Iqama is your username and can't be changed here. Contact EWA if it is wrong.",
  },
  ar: {
    personal: "المعلومات الشخصية",
    academic: "المعلومات الأكاديمية",
    employment: "العمل والأهلية",
    name: "الاسم",
    notProvided: "غير مُدخل",
    edit: "تعديل",
    editLabel: "تعديل {section}",
    save: "حفظ التغييرات",
    saving: "جارٍ الحفظ…",
    cancel: "إلغاء",
    saved: "تم حفظ التغييرات.",
    failed: "تعذّر حفظ التغييرات حاليًا. يرجى المحاولة لاحقًا.",
    checkFields: "يرجى مراجعة الحقول المحددة.",
    locked: "رقم الهوية الوطنية / الإقامة هو اسم المستخدم ولا يمكن تغييره من هنا. تواصل مع الأكاديمية إذا كان غير صحيح.",
  },
};

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));

function valuesFrom(p: TraineeProfile): Values {
  const all = Object.values(SECTIONS).flat() as Field[];
  return Object.fromEntries(all.map((k) => [k, str(p[k])])) as Values;
}

/**
 * The registration validators check whole steps, including fields that aren't edited here
 * (National ID, e-mail, password, declarations). Those get valid stand-ins, and only the
 * errors of the card being saved are kept — so the rules stay exactly the registration ones.
 */
const standIns: Partial<RegistrationData> = {
  nationalId: "1000000000",
  email: "trainee@example.com",
  password: "stand-in-pass",
  passwordConfirm: "stand-in-pass",
  healthDeclaration: true,
  dataConfirm: true,
};
const validators = { personal: validatePersonal, academic: validateAcademic, employment: validateEmployment };

const sectionBtn =
  "inline-flex items-center gap-2 rounded-full border-2 border-[#EE7A52] px-4 py-1.5 text-sm md:text-base font-bold text-[#EE7A52] transition " +
  "hover:bg-[#EE7A52] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2 cursor-pointer";

function PencilIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

/** Visible label above each input (the inputs' own labels are for screen readers). */
function Labelled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <span aria-hidden className="mb-1.5 block px-2 text-sm md:text-base font-semibold text-[#14989A]">
        {label}
      </span>
      {children}
    </div>
  );
}

export default function ProfileEditor({ profile }: { profile: TraineeProfile }) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const c = copy[locale];
  const f = t.registration.fields;
  const m = t.registration.errors;
  const o = getOptions(t.registration);

  const [editing, setEditing] = useState<Section | null>(null);
  const [values, setValues] = useState<Values>(() => valuesFrom(profile));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ section: Section; kind: "saved" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: Field) => (v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };
  const text = (k: Field, extra: { inputMode?: "numeric" | "decimal"; maxLength?: number } = {}) => (
    <Labelled label={f[k]}>
      <TextInput label={f[k]} value={values[k]} onChange={(e) => set(k)(e.target.value)} error={errors[k]} {...extra} />
    </Labelled>
  );
  const select = (k: Field, options: Option[]) => (
    <Labelled label={f[k]}>
      <SelectInput label={f[k]} value={values[k]} onChange={set(k)} options={options} error={errors[k]} />
    </Labelled>
  );
  const phone = (k: Field) => (
    <Labelled label={f[k]}>
      <PhoneInput label={f[k]} value={values[k]} onChange={set(k)} error={errors[k]} />
    </Labelled>
  );

  const startEdit = (section: Section) => {
    setValues(valuesFrom(profile)); // start from what is saved
    setErrors({});
    setStatus(null);
    setEditing(section);
  };
  const cancel = () => {
    setValues(valuesFrom(profile));
    setErrors({});
    setEditing(null);
  };
  const focusFirstError = () =>
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const keys = SECTIONS[editing] as readonly Field[];
    const all = validators[editing]({ ...initialData, ...standIns, ...values } as RegistrationData, m);
    const found: Errors = Object.fromEntries(keys.filter((k) => all[k]).map((k) => [k, all[k]]));
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus({ section: editing, kind: "error", text: c.checkFields });
      return focusFirstError();
    }

    setSaving(true);
    setStatus(null);
    try {
      const body = Object.fromEntries(keys.map((k) => [k, values[k].trim()]));
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus({ section: editing, kind: "saved", text: c.saved });
        setEditing(null);
        router.refresh(); // reload the saved values from Drupal
        return;
      }
      const result: { error?: string; fields?: Record<string, string> } = await res.json().catch(() => ({}));
      if (res.status === 401) {
        window.location.assign(`/api/auth/logout?lang=${locale}&next=${encodeURIComponent("/users/dashboard/profile")}`);
        return;
      }
      if (result.error === "invalid" && result.fields) {
        const fromServer: Errors = {};
        for (const k of Object.keys(result.fields) as Field[]) {
          if (keys.includes(k)) fromServer[k] = (m as Record<string, string>)[k] ?? result.fields[k];
        }
        setErrors(fromServer);
        setStatus({ section: editing, kind: "error", text: c.checkFields });
        return focusFirstError();
      }
      setStatus({ section: editing, kind: "error", text: c.failed });
    } catch {
      setStatus({ section: editing, kind: "error", text: c.failed });
    } finally {
      setSaving(false);
    }
  };

  /* ---------- read-only view ---------- */
  const p = profile;
  const opt = (list: Option[], v?: string | null) => (v ? list.find((x) => x.value === v)?.label ?? v : null);
  const tel = (v?: string | null) => (v ? `+966 ${v}` : null);
  const num = (v?: number | null) => (v != null ? String(v) : null);
  const fullName = [p.firstName, p.fatherName, p.grandfatherName, p.lastName].filter(Boolean).join(" ");

  type Row = [string, string | null | undefined];
  const view: Record<Section, Row[]> = {
    personal: [
      [f.nationalId, p.nationalId],
      [c.name, fullName || null],
      [f.gender, opt(o.gender, p.gender)],
      [f.dob, p.dob ? formatDate(p.dob, locale) : null],
      [f.height, num(p.height)],
      [f.weight, num(p.weight)],
      [f.mobile, tel(p.mobile)],
      [f.altMobile, tel(p.altMobile)],
      [f.relation, p.relation],
    ],
    academic: [
      [f.qualification, opt(o.qualification, p.qualification)],
      [f.major, opt(o.major, p.major)],
      [f.graduationYear, num(p.graduationYear)],
      [f.englishLevel, opt(o.english, p.englishLevel)],
      [f.stepGrade, num(p.stepGrade)],
      [f.gpa, num(p.gpa)],
      [f.university, p.university],
    ],
    employment: [
      [f.employed, opt(o.yesNo, p.employed)],
      [f.socialInsurance, opt(o.yesNo, p.socialInsurance)],
      [f.qiwa, opt(o.yesNo, p.qiwa)],
      [f.commercialReg, opt(o.yesNo, p.commercialReg)],
      [f.hrdf, opt(o.yesNo, p.hrdf)],
      [f.referral, opt(o.referral, p.referral)],
    ],
  };

  /* ---------- edit forms ---------- */
  const today = new Date().toISOString().slice(0, 10);
  const forms: Record<Section, ReactNode> = {
    personal: (
      <>
        <p className="md:col-span-2 rounded-2xl bg-white/70 px-5 py-3 text-sm md:text-base text-[#14989A]">
          <span className="font-semibold">{f.nationalId}:</span> <bdi>{p.nationalId || c.notProvided}</bdi>
          <span className="mt-1 block opacity-80">{c.locked}</span>
        </p>
        {text("firstName")}
        {text("fatherName")}
        {text("grandfatherName")}
        {text("lastName")}
        {select("gender", o.gender)}
        <Labelled label={f.dob}>
          <DateInput label={f.dob} value={values.dob} onChange={set("dob")} error={errors.dob} max={today} />
        </Labelled>
        {text("height", { inputMode: "numeric", maxLength: 3 })}
        {text("weight", { inputMode: "numeric", maxLength: 3 })}
        {phone("mobile")}
        {phone("altMobile")}
        {text("relation")}
      </>
    ),
    academic: (
      <>
        {select("qualification", o.qualification)}
        {select("major", o.major)}
        {text("graduationYear", { inputMode: "numeric", maxLength: 4 })}
        {select("englishLevel", o.english)}
        {text("stepGrade", { inputMode: "numeric", maxLength: 3 })}
        {text("gpa", { inputMode: "decimal", maxLength: 4 })}
        <div className="md:col-span-2 min-w-0">{text("university")}</div>
      </>
    ),
    employment: (
      <>
        {select("employed", o.yesNo)}
        {select("socialInsurance", o.yesNo)}
        {select("qiwa", o.yesNo)}
        {select("commercialReg", o.yesNo)}
        {select("hrdf", o.yesNo)}
        {select("referral", o.referral)}
      </>
    ),
  };

  return (
    <>
      {(Object.keys(SECTIONS) as Section[]).map((section) => {
        const title = c[section];
        const isEditing = editing === section;
        const note = status?.section === section ? status : null;
        return (
          <TraineeCard key={section}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl md:text-2xl font-bold text-[#14989A]">{title}</h3>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => startEdit(section)}
                  disabled={saving}
                  aria-label={c.editLabel.replace("{section}", title)}
                  className={sectionBtn}
                >
                  <PencilIcon />
                  {c.edit}
                </button>
              )}
            </div>

            {isEditing ? (
              <form ref={formRef} noValidate onSubmit={save} className="mt-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 [&>*]:min-w-0">{forms[section]}</div>
                {note && (
                  <p role="alert" className="mt-5 rounded-xl bg-white/70 px-4 py-3 text-sm md:text-base text-[#E2582B]">
                    {note.text}
                  </p>
                )}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={cancel}
                    disabled={saving}
                    className="w-full sm:w-auto rounded-full border-2 border-[#14989A] px-6 py-2.5 text-base font-bold text-[#14989A] transition hover:bg-[#14989A] hover:text-white disabled:opacity-60 cursor-pointer"
                  >
                    {c.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto rounded-full bg-[#EE7A52] px-8 py-2.5 text-base font-bold text-white transition hover:bg-[#E5683D] disabled:opacity-60 cursor-pointer"
                  >
                    {saving ? c.saving : c.save}
                  </button>
                </div>
              </form>
            ) : (
              <>
                {note && (
                  <p
                    role={note.kind === "saved" ? "status" : "alert"}
                    className={`mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm md:text-base font-semibold ${note.kind === "saved" ? "text-[#14989A]" : "text-[#E2582B]"}`}
                  >
                    {note.text}
                  </p>
                )}
                <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {view[section].map(([label, value]) => (
                    <div key={label} className="min-w-0 rounded-2xl bg-white/70 px-5 py-4">
                      <dt className="text-sm text-[#14989A] opacity-80">{label}</dt>
                      <dd className={`mt-0.5 text-base md:text-lg break-words ${value ? "font-semibold text-[#14989A]" : "italic text-[#14989A]/60"}`}>
                        {/* phone numbers stay left-to-right in Arabic */}
                        {value ? <bdi>{value}</bdi> : c.notProvided}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </TraineeCard>
        );
      })}
    </>
  );
}
