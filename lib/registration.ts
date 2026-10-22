// Types, options, initial state and per-step validation for the Join EWA registration flow.
import { fmt } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type YesNo = "" | "yes" | "no";

export type RegistrationData = {
  // Step 1 – personal info
  nationalId: string;
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  lastName: string;
  gender: string;
  dob: string;
  height: string;
  weight: string;
  mobile: string;
  altMobile: string;
  relation: string;
  email: string;
  healthDeclaration: boolean;

  // Step 2 – academic info
  qualification: string;
  major: string;
  graduationYear: string;
  englishLevel: string;
  stepGrade: string;
  gpa: string;
  university: string;

  // Step 3 – employment / eligibility
  employed: YesNo;
  socialInsurance: YesNo;
  qiwa: YesNo;
  commercialReg: YesNo;
  hrdf: YesNo;
  referral: string;
  dataConfirm: boolean;

  // Apply – selected course ids
  courses: string[];
};

export type Errors = Partial<Record<keyof RegistrationData, string>>;

export const initialData: RegistrationData = {
  nationalId: "",
  firstName: "",
  fatherName: "",
  grandfatherName: "",
  lastName: "",
  gender: "",
  dob: "",
  height: "",
  weight: "",
  mobile: "",
  altMobile: "",
  relation: "",
  email: "",
  healthDeclaration: false,
  qualification: "",
  major: "",
  graduationYear: "",
  englishLevel: "",
  stepGrade: "",
  gpa: "",
  university: "",
  employed: "",
  socialInsurance: "",
  qiwa: "",
  commercialReg: "",
  hrdf: "",
  referral: "",
  dataConfirm: false,
  courses: [],
};

export type Option = { value: string; label: string };

type RegistrationCopy = Dictionary["registration"];
type ErrorCopy = RegistrationCopy["errors"];

const toOptions = (labels: Record<string, string>): Option[] =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

/** Select options in the current language: `getOptions(t.registration)` */
export function getOptions(r: RegistrationCopy) {
  const o = r.options;
  return {
    yesNo: [
      { value: "yes", label: o.yes },
      { value: "no", label: o.no },
    ] as Option[],
    gender: [
      { value: "male", label: o.male },
      { value: "female", label: o.female },
    ] as Option[],
    qualification: toOptions(o.qualification),
    major: toOptions(o.major),
    english: toOptions(o.english),
    referral: toOptions(o.referral),
  };
}

/* ---------------- validation ---------------- */
/* Each validator receives the translated messages (t.registration.errors). */

const required = (v: string) => v.trim().length > 0;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isSaudiMobile = (v: string) => /^5\d{8}$/.test(v.replace(/\s/g, ""));
const inRange = (v: string, min: number, max: number) => {
  const n = Number(v);
  return v.trim() !== "" && !Number.isNaN(n) && n >= min && n <= max;
};

export function validatePersonal(d: RegistrationData, m: ErrorCopy): Errors {
  const e: Errors = {};
  if (!/^[12]\d{9}$/.test(d.nationalId)) e.nationalId = m.nationalId;
  if (!required(d.firstName)) e.firstName = m.firstName;
  if (!required(d.fatherName)) e.fatherName = m.fatherName;
  if (!required(d.grandfatherName)) e.grandfatherName = m.grandfatherName;
  if (!required(d.lastName)) e.lastName = m.lastName;
  if (!d.gender) e.gender = m.gender;
  if (!d.dob) e.dob = m.dob;
  if (!inRange(d.height, 100, 250)) e.height = m.height;
  if (!inRange(d.weight, 30, 250)) e.weight = m.weight;
  if (!isSaudiMobile(d.mobile)) e.mobile = m.mobile;
  if (d.altMobile && !isSaudiMobile(d.altMobile)) e.altMobile = m.altMobile;
  if (d.altMobile && !required(d.relation)) e.relation = m.relation;
  if (!isEmail(d.email)) e.email = m.email;
  if (!d.healthDeclaration) e.healthDeclaration = m.healthDeclaration;
  return e;
}

export function validateAcademic(d: RegistrationData, m: ErrorCopy): Errors {
  const e: Errors = {};
  const thisYear = new Date().getFullYear();
  if (!d.qualification) e.qualification = m.qualification;
  if (!d.major) e.major = m.major;
  if (!inRange(d.graduationYear, 1970, thisYear + 1) || d.graduationYear.length !== 4)
    e.graduationYear = fmt(m.graduationYear, { max: thisYear + 1 });
  if (!d.englishLevel) e.englishLevel = m.englishLevel;
  if (d.stepGrade && !inRange(d.stepGrade, 0, 100)) e.stepGrade = m.stepGrade;
  if (!inRange(d.gpa, 0, 5)) e.gpa = m.gpa;
  if (!required(d.university)) e.university = m.university;
  return e;
}

export function validateEmployment(d: RegistrationData, m: ErrorCopy): Errors {
  const e: Errors = {};
  if (!d.employed) e.employed = m.pick;
  if (!d.socialInsurance) e.socialInsurance = m.pick;
  if (!d.qiwa) e.qiwa = m.pick;
  if (!d.commercialReg) e.commercialReg = m.pick;
  if (!d.hrdf) e.hrdf = m.pick;
  if (!d.referral) e.referral = m.pick;
  if (!d.dataConfirm) e.dataConfirm = m.dataConfirm;
  return e;
}

export function validateCourses(d: RegistrationData, m: ErrorCopy): Errors {
  return d.courses.length === 0 ? { courses: m.courses } : {};
}
