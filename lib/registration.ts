// Types, options, initial state and per-step validation for the Join EWA registration flow.

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

export const yesNoOptions: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const genderOptions: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const qualificationOptions: Option[] = [
  { value: "high-school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "other", label: "Other" },
];

export const majorOptions: Option[] = [
  { value: "science", label: "Natural Sciences" },
  { value: "engineering", label: "Engineering" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business / Administration" },
  { value: "humanities", label: "Humanities" },
  { value: "other", label: "Other" },
];

export const englishOptions: Option[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "fluent", label: "Fluent" },
];

export const referralOptions: Option[] = [
  { value: "social-media", label: "Social Media" },
  { value: "website", label: "EWA Website" },
  { value: "friend", label: "Friend or Family" },
  { value: "employer", label: "Employer" },
  { value: "event", label: "Event / Exhibition" },
  { value: "other", label: "Other" },
];

/* ---------------- validation ---------------- */

const required = (v: string) => v.trim().length > 0;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isSaudiMobile = (v: string) => /^5\d{8}$/.test(v.replace(/\s/g, ""));
const inRange = (v: string, min: number, max: number) => {
  const n = Number(v);
  return v.trim() !== "" && !Number.isNaN(n) && n >= min && n <= max;
};

export function validatePersonal(d: RegistrationData): Errors {
  const e: Errors = {};
  if (!/^[12]\d{9}$/.test(d.nationalId)) e.nationalId = "Enter a valid 10-digit National ID / Iqama.";
  if (!required(d.firstName)) e.firstName = "First name is required.";
  if (!required(d.fatherName)) e.fatherName = "Father's name is required.";
  if (!required(d.grandfatherName)) e.grandfatherName = "Grandfather's name is required.";
  if (!required(d.lastName)) e.lastName = "Last name is required.";
  if (!d.gender) e.gender = "Please select your gender.";
  if (!d.dob) e.dob = "Date of birth is required.";
  if (!inRange(d.height, 100, 250)) e.height = "Enter height in cm (100–250).";
  if (!inRange(d.weight, 30, 250)) e.weight = "Enter weight in kg (30–250).";
  if (!isSaudiMobile(d.mobile)) e.mobile = "Enter a 9-digit mobile number starting with 5.";
  if (d.altMobile && !isSaudiMobile(d.altMobile)) e.altMobile = "Enter a 9-digit number starting with 5.";
  if (d.altMobile && !required(d.relation)) e.relation = "Tell us how this contact is related to you.";
  if (!isEmail(d.email)) e.email = "Enter a valid e-mail address.";
  if (!d.healthDeclaration) e.healthDeclaration = "You must accept the health declaration to continue.";
  return e;
}

export function validateAcademic(d: RegistrationData): Errors {
  const e: Errors = {};
  const thisYear = new Date().getFullYear();
  if (!d.qualification) e.qualification = "Please select your qualification.";
  if (!d.major) e.major = "Please select your major.";
  if (!inRange(d.graduationYear, 1970, thisYear + 1) || d.graduationYear.length !== 4)
    e.graduationYear = `Enter a year between 1970 and ${thisYear + 1}.`;
  if (!d.englishLevel) e.englishLevel = "Please select your English level.";
  if (d.stepGrade && !inRange(d.stepGrade, 0, 100)) e.stepGrade = "STEP grade must be between 0 and 100.";
  if (!inRange(d.gpa, 0, 5)) e.gpa = "Enter your GPA (0–5).";
  if (!required(d.university)) e.university = "University / college name is required.";
  return e;
}

export function validateEmployment(d: RegistrationData): Errors {
  const e: Errors = {};
  const pick = "Please choose an answer.";
  if (!d.employed) e.employed = pick;
  if (!d.socialInsurance) e.socialInsurance = pick;
  if (!d.qiwa) e.qiwa = pick;
  if (!d.commercialReg) e.commercialReg = pick;
  if (!d.hrdf) e.hrdf = pick;
  if (!d.referral) e.referral = pick;
  if (!d.dataConfirm) e.dataConfirm = "Please confirm your data is correct.";
  return e;
}

export function validateCourses(d: RegistrationData): Errors {
  return d.courses.length === 0 ? { courses: "Add at least one course to continue." } : {};
}
