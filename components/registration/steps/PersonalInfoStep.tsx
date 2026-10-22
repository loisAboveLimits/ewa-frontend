"use client";

import type { StepProps } from "../RegistrationForm";
import { getOptions } from "@/lib/registration";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";
import { Checkbox, DateInput, NextButton, PanelHeading, PhoneInput, SelectInput, TextInput } from "../ui";

export default function PersonalInfoStep({ data, errors, update }: StepProps) {
  const { t } = useI18n();
  const r = t.registration;
  const f = r.fields;
  const { gender: genderOptions } = getOptions(r);
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <PanelHeading title={r.heading} subtitle={r.subheading} />

      <div className="grid gap-4 md:gap-5">
        <TextInput
          label={f.nationalId}
          inputMode="numeric"
          maxLength={10}
          value={data.nationalId}
          onChange={(e) => update("nationalId", e.target.value.replace(/\D/g, ""))}
          error={errors.nationalId}
        />
        <TextInput
          label={f.firstName}
          autoComplete="given-name"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
        />
        <TextInput
          label={f.fatherName}
          value={data.fatherName}
          onChange={(e) => update("fatherName", e.target.value)}
          error={errors.fatherName}
        />
        <TextInput
          label={f.grandfatherName}
          value={data.grandfatherName}
          onChange={(e) => update("grandfatherName", e.target.value)}
          error={errors.grandfatherName}
        />
        <TextInput
          label={f.lastName}
          autoComplete="family-name"
          value={data.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          error={errors.lastName}
        />
        <SelectInput
          label={f.gender}
          value={data.gender}
          onChange={(v) => update("gender", v)}
          options={genderOptions}
          error={errors.gender}
        />
        <DateInput
          label={f.dob}
          value={data.dob}
          max={today}
          onChange={(v) => update("dob", v)}
          error={errors.dob}
        />

        <TextInput
          label={f.height}
          inputMode="numeric"
          maxLength={3}
          value={data.height}
          onChange={(e) => update("height", e.target.value.replace(/\D/g, ""))}
          error={errors.height}
        />
        <TextInput
          label={f.weight}
          inputMode="numeric"
          maxLength={3}
          value={data.weight}
          onChange={(e) => update("weight", e.target.value.replace(/\D/g, ""))}
          error={errors.weight}
        />

        <PhoneInput
          label={f.mobile}
          value={data.mobile}
          onChange={(v) => update("mobile", v)}
          error={errors.mobile}
        />
        <PhoneInput
          label={f.altMobile}
          value={data.altMobile}
          onChange={(v) => update("altMobile", v)}
          error={errors.altMobile}
        />
        <TextInput
          label={f.relation}
          value={data.relation}
          onChange={(e) => update("relation", e.target.value)}
          error={errors.relation}
        />
        <TextInput
          label={f.email}
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
      </div>

      <div className="mt-6 md:mt-8">
        <Checkbox
          checked={data.healthDeclaration}
          onChange={(v) => update("healthDeclaration", v)}
          error={errors.healthDeclaration}
        >
          {r.healthDeclaration}
        </Checkbox>
      </div>

      <div className="mt-8 md:mt-10 flex items-center justify-between gap-4">
        <span className="text-sm md:text-base text-[#13999C]/80">{fmt(r.stepOf, { n: 1, total: 3 })}</span>
        <NextButton />
      </div>
    </>
  );
}
