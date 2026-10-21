"use client";

import Link from "next/link";
import type { StepProps } from "../RegistrationForm";
import { referralOptions, yesNoOptions, type YesNo } from "@/lib/registration";
import { BackButton, Checkbox, PanelHeading, PrimaryButton, SelectInput } from "../ui";

export default function EligibilityStep({ data, errors, update, onBack, signInHref = "/login" }: StepProps) {
  return (
    <>
      <PanelHeading
        title="Create your account"
        subtitle="Create your free account in seconds to further your application."
      />

      <div className="grid gap-4 md:gap-5">
        <SelectInput
          label="Are you Employed?"
          value={data.employed}
          onChange={(v) => update("employed", v as YesNo)}
          options={yesNoOptions}
          error={errors.employed}
        />
        <SelectInput
          label="Are you registered in Social Insurance?"
          value={data.socialInsurance}
          onChange={(v) => update("socialInsurance", v as YesNo)}
          options={yesNoOptions}
          error={errors.socialInsurance}
        />
        <SelectInput
          label="Do you have an active contract on Qiwa?"
          value={data.qiwa}
          onChange={(v) => update("qiwa", v as YesNo)}
          options={yesNoOptions}
          error={errors.qiwa}
        />
        <SelectInput
          label="Do you have a commercial registration?"
          value={data.commercialReg}
          onChange={(v) => update("commercialReg", v as YesNo)}
          options={yesNoOptions}
          error={errors.commercialReg}
        />
        <SelectInput
          label="Have you ever received support from the Human Resources Development Funds?"
          value={data.hrdf}
          onChange={(v) => update("hrdf", v as YesNo)}
          options={yesNoOptions}
          error={errors.hrdf}
        />
        <SelectInput
          label="How did you hear about the Energy and Water Academy?"
          value={data.referral}
          onChange={(v) => update("referral", v)}
          options={referralOptions}
          error={errors.referral}
        />
      </div>

      <div className="mt-6 md:mt-8">
        <Checkbox checked={data.dataConfirm} onChange={(v) => update("dataConfirm", v)} error={errors.dataConfirm}>
          I confirm that the data entered above is correct
        </Checkbox>
      </div>

      <div className="mt-10 md:mt-14 flex flex-col items-center gap-5 md:gap-6">
        <PrimaryButton>Confirm Application</PrimaryButton>
        <p className="text-base md:text-2xl text-[#13999C] text-center">
          Already registered?{" "}
          <Link href={signInHref} className="text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]">
            Sign in.
          </Link>
        </p>
        {onBack && (
          <div className="self-start">
            <BackButton onClick={onBack} />
          </div>
        )}
      </div>
    </>
  );
}
