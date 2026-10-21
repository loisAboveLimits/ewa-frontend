"use client";

import type { StepProps } from "../RegistrationForm";
import { englishOptions, majorOptions, qualificationOptions } from "@/lib/registration";
import { BackButton, NextButton, PanelHeading, SelectInput, TextInput } from "../ui";

export default function AcademicInfoStep({ data, errors, update, onBack }: StepProps) {
  return (
    <>
      <PanelHeading
        title="Create your account"
        subtitle="Create your free account in seconds to further your application."
      />

      <div className="grid gap-4 md:gap-5">
        <SelectInput
          label="Select Academic Qualification"
          value={data.qualification}
          onChange={(v) => update("qualification", v)}
          options={qualificationOptions}
          error={errors.qualification}
        />
        <SelectInput
          label="Select Major"
          value={data.major}
          onChange={(v) => update("major", v)}
          options={majorOptions}
          error={errors.major}
        />
        <TextInput
          label="Graduation Year"
          inputMode="numeric"
          maxLength={4}
          value={data.graduationYear}
          onChange={(e) => update("graduationYear", e.target.value.replace(/\D/g, ""))}
          error={errors.graduationYear}
        />
        <SelectInput
          label="English Language Proficiency"
          value={data.englishLevel}
          onChange={(v) => update("englishLevel", v)}
          options={englishOptions}
          error={errors.englishLevel}
        />
        <TextInput
          label="STEP Grade"
          inputMode="numeric"
          maxLength={3}
          value={data.stepGrade}
          onChange={(e) => update("stepGrade", e.target.value.replace(/\D/g, ""))}
          error={errors.stepGrade}
        />
        <TextInput
          label="Cumulative GPA"
          inputMode="decimal"
          maxLength={4}
          value={data.gpa}
          onChange={(e) => update("gpa", e.target.value.replace(/[^\d.]/g, ""))}
          error={errors.gpa}
        />
        <TextInput
          label="University/College Name"
          autoComplete="organization"
          value={data.university}
          onChange={(e) => update("university", e.target.value)}
          error={errors.university}
        />
      </div>

      <div className="mt-8 md:mt-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          {onBack && <BackButton onClick={onBack} />}
          <span className="hidden sm:inline text-sm md:text-base text-[#13999C]/80">Step 2 of 3</span>
        </div>
        <NextButton />
      </div>
    </>
  );
}
