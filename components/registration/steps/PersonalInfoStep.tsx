"use client";

import type { StepProps } from "../RegistrationForm";
import { genderOptions } from "@/lib/registration";
import { Checkbox, DateInput, NextButton, PanelHeading, PhoneInput, SelectInput, TextInput } from "../ui";

export default function PersonalInfoStep({ data, errors, update }: StepProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <PanelHeading
        title="Create your account"
        subtitle="Create your free account in seconds to further your application."
      />

      <div className="grid gap-4 md:gap-5">
        <TextInput
          label="National ID"
          inputMode="numeric"
          maxLength={10}
          value={data.nationalId}
          onChange={(e) => update("nationalId", e.target.value.replace(/\D/g, ""))}
          error={errors.nationalId}
        />
        <TextInput
          label="First Name"
          autoComplete="given-name"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
        />
        <TextInput
          label="Father's Name"
          value={data.fatherName}
          onChange={(e) => update("fatherName", e.target.value)}
          error={errors.fatherName}
        />
        <TextInput
          label="Grandfather's Name"
          value={data.grandfatherName}
          onChange={(e) => update("grandfatherName", e.target.value)}
          error={errors.grandfatherName}
        />
        <TextInput
          label="Last Name"
          autoComplete="family-name"
          value={data.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          error={errors.lastName}
        />
        <SelectInput
          label="Gender"
          value={data.gender}
          onChange={(v) => update("gender", v)}
          options={genderOptions}
          error={errors.gender}
        />
        <DateInput
          label="Date of Birth"
          value={data.dob}
          max={today}
          onChange={(v) => update("dob", v)}
          error={errors.dob}
        />

        <TextInput
          label="Height (cm)"
          inputMode="numeric"
          maxLength={3}
          value={data.height}
          onChange={(e) => update("height", e.target.value.replace(/\D/g, ""))}
          error={errors.height}
        />
        <TextInput
          label="Weight (kg)"
          inputMode="numeric"
          maxLength={3}
          value={data.weight}
          onChange={(e) => update("weight", e.target.value.replace(/\D/g, ""))}
          error={errors.weight}
        />

        <PhoneInput
          label="Mobile Number"
          value={data.mobile}
          onChange={(v) => update("mobile", v)}
          error={errors.mobile}
        />
        <PhoneInput
          label="Additional Contact"
          value={data.altMobile}
          onChange={(v) => update("altMobile", v)}
          error={errors.altMobile}
        />
        <TextInput
          label="Relation to Contact"
          value={data.relation}
          onChange={(e) => update("relation", e.target.value)}
          error={errors.relation}
        />
        <TextInput
          label="E-mail"
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
          I, the undersigned, whose details are provided above, declare that my health is sound and that I have no
          illnesses or health problems that would prevent me from joining the training program. I also accept full
          responsibility if I fail to disclose any health condition that affects my participation or performance during
          the training.
        </Checkbox>
      </div>

      <div className="mt-8 md:mt-10 flex items-center justify-between gap-4">
        <span className="text-sm md:text-base text-[#13999C]/80">Step 1 of 3</span>
        <NextButton />
      </div>
    </>
  );
}
