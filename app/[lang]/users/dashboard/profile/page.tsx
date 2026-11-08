import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { TraineeCard, TraineeHeading, traineeLinkClass } from "@/components/trainee/TraineeParts";
import { requireTrainee } from "@/lib/auth";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { formatDate, type Localized } from "@/lib/i18n/config";
import { getOptions } from "@/lib/registration";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("myProfile")), robots: { index: false, follow: false } };
}

const copy: Localized<{
  intro: string;
  account: string;
  name: string;
  username: string;
  email: string;
  roles: string;
  memberSince: string;
  lastSignIn: string;
  personal: string;
  academic: string;
  employment: string;
  programs: string;
  noPrograms: string;
  notProvided: string;
  security: string;
  securityText: string;
  changePassword: string;
  signOut: string;
}> = {
  en: {
    intro: "Your account details at EWA.",
    account: "Account details",
    name: "Name",
    username: "Username",
    email: "E-mail",
    roles: "Account type",
    memberSince: "Member since",
    lastSignIn: "Last sign-in",
    personal: "Personal information",
    academic: "Academic information",
    employment: "Employment & eligibility",
    programs: "Selected programs",
    noPrograms: "No programs selected yet.",
    notProvided: "Not provided",
    security: "Password & security",
    securityText: "To change your password we'll e-mail you a secure link to choose a new one.",
    changePassword: "Change password",
    signOut: "Sign out",
  },
  ar: {
    intro: "بيانات حسابك في الأكاديمية.",
    account: "بيانات الحساب",
    name: "الاسم",
    username: "اسم المستخدم",
    email: "البريد الإلكتروني",
    roles: "نوع الحساب",
    memberSince: "عضو منذ",
    lastSignIn: "آخر تسجيل دخول",
    personal: "المعلومات الشخصية",
    academic: "المعلومات الأكاديمية",
    employment: "العمل والأهلية",
    programs: "البرامج المختارة",
    noPrograms: "لم يتم اختيار برامج بعد.",
    notProvided: "غير مُدخل",
    security: "كلمة المرور والأمان",
    securityText: "لتغيير كلمة المرور، سنرسل إلى بريدك الإلكتروني رابطًا آمنًا لاختيار كلمة مرور جديدة.",
    changePassword: "تغيير كلمة المرور",
    signOut: "تسجيل الخروج",
  },
};

/** My Profile (/users/dashboard/profile) — the signed-in Drupal account. */
export default async function MyProfile() {
  const { locale, t } = await getI18n();
  const user = await requireTrainee(locale, "/users/dashboard/profile");
  if (!user) return null; // Drupal unreachable — notice in layout
  const c = copy[locale];
  const name = user.display_name || user.name;

  const p = user.profile ?? {};
  const f = t.registration.fields;
  const o = getOptions(t.registration);
  const opt = (list: { value: string; label: string }[], v?: string | null) => (v ? list.find((x) => x.value === v)?.label ?? v : null);
  const yesNo = (v?: "yes" | "no" | null) => (v ? opt(o.yesNo, v) : null);
  const phone = (v?: string | null) => (v ? `+966 ${v}` : null);
  const fullName = [p.firstName, p.fatherName, p.grandfatherName, p.lastName].filter(Boolean).join(" ");
  const initials = (p.firstName && p.lastName ? `${p.firstName[0]}${p.lastName[0]}` : name.slice(0, 2)).toUpperCase();

  // registration values, grouped like the registration steps — always shown; empty values say "Not provided"
  type Row = [string, string | null | undefined];
  const allGroups: { title: string; rows: Row[] }[] = [
    {
      title: c.personal,
      rows: [
        [f.nationalId, p.nationalId],
        [c.name, fullName || null],
        [f.gender, opt(o.gender, p.gender)],
        [f.dob, p.dob ? formatDate(p.dob, locale) : null],
        [f.height, p.height != null ? String(p.height) : null],
        [f.weight, p.weight != null ? String(p.weight) : null],
        [f.mobile, phone(p.mobile)],
        [f.altMobile, phone(p.altMobile)],
        [f.relation, p.relation],
      ],
    },
    {
      title: c.academic,
      rows: [
        [f.qualification, opt(o.qualification, p.qualification)],
        [f.major, opt(o.major, p.major)],
        [f.graduationYear, p.graduationYear != null ? String(p.graduationYear) : null],
        [f.englishLevel, opt(o.english, p.englishLevel)],
        [f.stepGrade, p.stepGrade != null ? String(p.stepGrade) : null],
        [f.gpa, p.gpa != null ? String(p.gpa) : null],
        [f.university, p.university],
      ],
    },
    {
      title: c.employment,
      rows: [
        [f.employed, yesNo(p.employed)],
        [f.socialInsurance, yesNo(p.socialInsurance)],
        [f.qiwa, yesNo(p.qiwa)],
        [f.commercialReg, yesNo(p.commercialReg)],
        [f.hrdf, yesNo(p.hrdf)],
        [f.referral, opt(o.referral, p.referral)],
      ],
    },
  ];
  const groups = allGroups;

  const rows: [string, string | null | undefined][] = [
    [c.name, fullName || name],
    [c.username, user.name],
    [c.email, user.mail],
    [c.roles, user.roles.map((r) => r.replace(/_/g, " ")).join(", ") || null],
    [c.memberSince, user.created ? formatDate(user.created, locale) : null],
    [c.lastSignIn, user.login ? formatDate(user.login, locale) : null],
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <TraineeHeading title={t.pages.myProfile.title} intro={c.intro} />

      <TraineeCard>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <span
            aria-hidden
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#14989A] text-3xl font-bold text-white md:h-24 md:w-24 md:text-4xl"
          >
            {initials || "•"}
          </span>
          <div className="min-w-0">
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-[#14989A] break-words">{fullName || name}</h3>
            {user.mail && <p className="mt-1 text-base md:text-lg text-[#14989A] break-words">{user.mail}</p>}
          </div>
        </div>

        <h3 className="mt-8 text-xl md:text-2xl font-bold text-[#14989A]">{c.account}</h3>
        <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {rows
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-2xl bg-white/70 px-5 py-4">
                <dt className="text-sm text-[#14989A] opacity-80">{label}</dt>
                <dd className="mt-0.5 text-base md:text-lg font-semibold text-[#14989A] break-words">{value}</dd>
              </div>
            ))}
        </dl>
      </TraineeCard>

      {groups.map((g) => (
        <TraineeCard key={g.title}>
          <h3 className="text-xl md:text-2xl font-bold text-[#14989A]">{g.title}</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {g.rows.map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-2xl bg-white/70 px-5 py-4">
                <dt className="text-sm text-[#14989A] opacity-80">{label}</dt>
                <dd className={`mt-0.5 text-base md:text-lg break-words ${value ? "font-semibold text-[#14989A]" : "italic text-[#14989A]/60"}`}>
                  {/* phone numbers stay left-to-right in Arabic */}
                  {value ? <bdi>{value}</bdi> : c.notProvided}
                </dd>
              </div>
            ))}
          </dl>
        </TraineeCard>
      ))}

      {(
        <TraineeCard>
          <h3 className="text-xl md:text-2xl font-bold text-[#14989A]">{c.programs}</h3>
          {p.programs?.length ? (
            <ul className="mt-4 flex flex-wrap gap-3">
              {p.programs.map((pr) => (
                <li key={pr.tid} className="rounded-full bg-[#14989A] px-4 py-2 text-base font-semibold text-white">
                  {pr.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-base md:text-lg text-[#14989A]">{c.noPrograms}</p>
          )}
        </TraineeCard>
      )}

      <TraineeCard>
        <h3 className="text-xl md:text-2xl font-bold text-[#14989A]">{c.security}</h3>
        <p className="mt-2 text-base md:text-lg text-[#14989A]">{c.securityText}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href="/forgot-password" className={traineeLinkClass}>
            {c.changePassword}
          </Link>
          <form action="/api/auth/logout" method="post">
            <input type="hidden" name="lang" value={locale} />
            <button type="submit" className="text-base font-bold text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D] cursor-pointer">
              {c.signOut}
            </button>
          </form>
        </div>
      </TraineeCard>
    </div>
  );
}
