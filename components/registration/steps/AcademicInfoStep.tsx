"use client";

import type { StepProps } from "../RegistrationForm";
import { getOptions } from "@/lib/registration";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";
import { BackButton, NextButton, PanelHeading, SelectInput, TextInput } from "../ui";

export default function AcademicInfoStep({ data, errors, update, onBack }: StepProps) {
  const { t } = useI18n();
  const r = t.registration;
  const f = r.fields;
  const { qualification: qualificationOptions, major: majorOptions, english: englishOptions } = getOptions(r);
  return (
    <>
      <PanelHeading title={r.heading} subtitle={r.subheading} />

      <div className="grid gap-4 md:gap-5">
        <SelectInput
          label={f.qualification}
          value={data.qualification}
          onChange={(v) => update("qualification", v)}
          options={qualificationOptions}
          error={errors.qualification}
        />
        <SelectInput
          label={f.major}
          value={data.major}
          onChange={(v) => update("major", v)}
          options={majorOptions}
          error={errors.major}
        />
        <TextInput
          label={f.graduationYear}
          inputMode="numeric"
          maxLength={4}
          value={data.graduationYear}
          onChange={(e) => update("graduationYear", e.target.value.replace(/\D/g, ""))}
          error={errors.graduationYear}
        />
        <SelectInput
          label={f.englishLevel}
          value={data.englishLevel}
          onChange={(v) => update("englishLevel", v)}
          options={englishOptions}
          error={errors.englishLevel}
        />
        <TextInput
          label={f.stepGrade}
          inputMode="numeric"
          maxLength={3}
          value={data.stepGrade}
          onChange={(e) => update("stepGrade", e.target.value.replace(/\D/g, ""))}
          error={errors.stepGrade}
        />
        <TextInput
          label={f.gpa}
          inputMode="decimal"
          maxLength={4}
          value={data.gpa}
          onChange={(e) => update("gpa", e.target.value.replace(/[^\d.]/g, ""))}
          error={errors.gpa}
        />
        <TextInput
          label={f.university}
          autoComplete="organization"
          value={data.university}
          onChange={(e) => update("university", e.target.value)}
          error={errors.university}
        />
      </div>

      <div className="mt-8 md:mt-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          {onBack && <BackButton onClick={onBack} />}
          <span className="hidden sm:inline text-sm md:text-base text-[#13999C]/80">{fmt(r.stepOf, { n: 2, total: 3 })}</span>
        </div>
        <NextButton />
      </div>
    </>
  );
}
