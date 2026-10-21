"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Stepper from "./Stepper";
import { Panel } from "./ui";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import AcademicInfoStep from "./steps/AcademicInfoStep";
import EligibilityStep from "./steps/EligibilityStep";
import CourseSelectionStep from "./steps/CourseSelectionStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import {
  initialData,
  validateAcademic,
  validateCourses,
  validateEmployment,
  validatePersonal,
  type Errors,
  type RegistrationData,
} from "@/lib/registration";

/* The visual stepper has 3 phases; "Register" is split into 3 sub-steps. */
const STEPS = ["personal", "academic", "eligibility", "courses", "done"] as const;
type StepKey = (typeof STEPS)[number];

const PHASE: Record<StepKey, number> = {
  personal: 0,
  academic: 0,
  eligibility: 0,
  courses: 1,
  done: 2,
};

const VALIDATORS: Partial<Record<StepKey, (d: RegistrationData) => Errors>> = {
  personal: validatePersonal,
  academic: validateAcademic,
  eligibility: validateEmployment,
  courses: validateCourses,
};

export type StepProps = {
  data: RegistrationData;
  errors: Errors;
  update: <K extends keyof RegistrationData>(key: K, value: RegistrationData[K]) => void;
  onBack?: () => void;
  submitting?: boolean;
  signInHref?: string;
};

const STORAGE_KEY = "ewa-registration-draft";

export default function RegistrationForm({ signInHref = "/login", homeHref = "/" }: { signInHref?: string; homeHref?: string }) {
  const [step, setStep] = useState<StepKey>("personal");
  const [data, setData] = useState<RegistrationData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  /* restore / persist a draft so a refresh doesn't wipe the form */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...initialData, ...JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  /* scroll to the top of the form when the step changes */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const update: StepProps["update"] = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const goBack = () => {
    const i = STEPS.indexOf(step);
    if (i > 0) {
      setErrors({});
      setStep(STEPS[i - 1]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validate = VALIDATORS[step];
    const found = validate ? validate(data) : {};
    if (Object.keys(found).length) {
      setErrors(found);
      // focus the first invalid field
      requestAnimationFrame(() => {
        topRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
      return;
    }
    setErrors({});

    if (step === "courses") {
      setSubmitting(true);
      try {
        await submitApplication(data);
        sessionStorage.removeItem(STORAGE_KEY);
        setStep("done");
      } catch {
        setErrors({ courses: "Something went wrong submitting your application. Please try again." });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setStep(STEPS[STEPS.indexOf(step) + 1]);
  };

  const stepProps: StepProps = {
    data,
    errors,
    update,
    onBack: step === "personal" ? undefined : goBack,
    submitting,
    signInHref,
  };

  return (
    <div ref={topRef} className="scroll-mt-28 mx-auto w-full max-w-[1070px]">
      <Stepper current={PHASE[step]} className="mb-10 md:mb-14" />

      {step === "done" ? (
        <ConfirmationStep homeHref={homeHref} />
      ) : (
        <form noValidate onSubmit={handleSubmit}>
          {step === "courses" ? (
            <CourseSelectionStep {...stepProps} />
          ) : (
            <Panel bubbles="bottom">
              {step === "personal" && <PersonalInfoStep {...stepProps} />}
              {step === "academic" && <AcademicInfoStep {...stepProps} />}
              {step === "eligibility" && <EligibilityStep {...stepProps} />}
            </Panel>
          )}
        </form>
      )}
    </div>
  );
}

/* Replace with your real API call (route handler, server action, external API…) */
async function submitApplication(data: RegistrationData) {
  // const res = await fetch("/api/register", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Request failed");
  await new Promise((r) => setTimeout(r, 800));
  console.info("Registration submitted", data);
}
