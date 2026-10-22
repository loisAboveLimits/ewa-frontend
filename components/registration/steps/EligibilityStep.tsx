"use client";

import Link from "next/link";
import type { StepProps } from "../RegistrationForm";
import { getOptions, type YesNo } from "@/lib/registration";
import { useI18n } from "@/components/i18n/I18nProvider";
import { BackButton, Checkbox, PanelHeading, PrimaryButton, SelectInput } from "../ui";

export default function EligibilityStep({ data, errors, update, onBack, signInHref = "/login" }: StepProps) {
  const { t } = useI18n();
  const r = t.registration;
  const f = r.fields;
  const { yesNo: yesNoOptions, referral: referralOptions } = getOptions(r);
  return (
    <>
      <PanelHeading title={r.heading} subtitle={r.subheading} />

      <div className="grid gap-4 md:gap-5">
        <SelectInput
          label={f.employed}
          value={data.employed}
          onChange={(v) => update("employed", v as YesNo)}
          options={yesNoOptions}
          error={errors.employed}
        />
        <SelectInput
          label={f.socialInsurance}
          value={data.socialInsurance}
          onChange={(v) => update("socialInsurance", v as YesNo)}
          options={yesNoOptions}
          error={errors.socialInsurance}
        />
        <SelectInput
          label={f.qiwa}
          value={data.qiwa}
          onChange={(v) => update("qiwa", v as YesNo)}
          options={yesNoOptions}
          error={errors.qiwa}
        />
        <SelectInput
          label={f.commercialReg}
          value={data.commercialReg}
          onChange={(v) => update("commercialReg", v as YesNo)}
          options={yesNoOptions}
          error={errors.commercialReg}
        />
        <SelectInput
          label={f.hrdf}
          value={data.hrdf}
          onChange={(v) => update("hrdf", v as YesNo)}
          options={yesNoOptions}
          error={errors.hrdf}
        />
        <SelectInput
          label={f.referral}
          value={data.referral}
          onChange={(v) => update("referral", v)}
          options={referralOptions}
          error={errors.referral}
        />
      </div>

      <div className="mt-6 md:mt-8">
        <Checkbox checked={data.dataConfirm} onChange={(v) => update("dataConfirm", v)} error={errors.dataConfirm}>
          {r.dataConfirm}
        </Checkbox>
      </div>

      <div className="mt-10 md:mt-14 flex flex-col items-center gap-5 md:gap-6">
        <PrimaryButton>{r.confirmApplication}</PrimaryButton>
        <p className="text-base md:text-2xl text-[#13999C] text-center">
          {r.alreadyRegistered}{" "}
          <Link href={signInHref} className="text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]">
            {r.signIn}
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
