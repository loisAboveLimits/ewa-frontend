"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "@/components/i18n/Link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { localizeHref } from "@/lib/i18n/config";
import { Checkbox, Panel, PanelHeading, PasswordInput, PrimaryButton, TextInput } from "@/components/registration/ui";

type LoginData = { identifier: string; password: string; remember: boolean };
type LoginErrors = Partial<Record<"identifier" | "password" | "form", string>>;

/**
 * Sign-in form — same panel, fields and buttons as the registration flow.
 * Connect `submitLogin` to the real backend (e.g. Drupal: POST /user/login?_format=json).
 */
export default function LoginForm({
  registerHref = "/join/registration",
  forgotHref = "#",
  redirectTo = "/",
}: {
  registerHref?: string;
  forgotHref?: string;
  /** where to go after a successful sign-in */
  redirectTo?: string;
}) {
  const { locale, t } = useI18n();
  const l = t.login;
  const [data, setData] = useState<LoginData>({ identifier: "", password: "", remember: false });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends keyof LoginData>(key: K, value: LoginData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const found: LoginErrors = {};
    if (!data.identifier.trim()) found.identifier = l.errors.identifier;
    if (!data.password) found.password = l.errors.password;
    if (Object.keys(found).length) {
      setErrors(found);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    setSubmitting(true);
    try {
      await submitLogin(data);
      window.location.assign(localizeHref(redirectTo, locale));
    } catch {
      setErrors({ form: l.errors.failed });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[860px]">
      <form ref={formRef} noValidate onSubmit={handleSubmit}>
        <Panel bubbles="bottom">
          <PanelHeading title={l.heading} subtitle={l.subheading} />

          <div className="grid gap-4 md:gap-5">
            <TextInput
              label={l.identifier}
              autoComplete="username"
              value={data.identifier}
              onChange={(e) => update("identifier", e.target.value)}
              error={errors.identifier}
            />
            <PasswordInput
              label={l.password}
              value={data.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
              showLabel={l.showPassword}
              hideLabel={l.hidePassword}
            />
          </div>

          <div className="mt-5 md:mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Checkbox checked={data.remember} onChange={(v) => update("remember", v)}>
              {l.remember}
            </Checkbox>
            <Link
              href={forgotHref}
              className="text-sm md:text-base text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]"
            >
              {l.forgot}
            </Link>
          </div>

          {errors.form && (
            <p role="alert" className="mt-6 rounded-xl bg-white/60 px-4 py-3 text-sm md:text-base text-[#E2582B]">
              {errors.form}
            </p>
          )}

          <div className="mt-10 md:mt-12 flex flex-col items-center gap-5 md:gap-6">
            <PrimaryButton disabled={submitting}>{submitting ? l.submitting : l.submit}</PrimaryButton>
            <p className="text-base md:text-2xl text-[#13999C] text-center">
              {l.noAccount}{" "}
              <Link href={registerHref} className="text-[#EE7A52] underline underline-offset-4 hover:text-[#E5683D]">
                {l.register}
              </Link>
            </p>
          </div>
        </Panel>
      </form>
    </div>
  );
}

/* Replace with your real API call (route handler, server action, Drupal…) */
async function submitLogin(data: LoginData) {
  // const res = await fetch("/api/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ name: data.identifier, pass: data.password }),
  // });
  // if (!res.ok) throw new Error("Login failed");
  await new Promise((r) => setTimeout(r, 800));
  console.info("Login submitted", { identifier: data.identifier, remember: data.remember });
}
