"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useContactForm } from "@/components/contact/useContactForm";

export default function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;

  const { values: formData, errors, status, sending, sponsorshipOptions, handleChange, handleSubmit, honeypotProps } = useContactForm();
  const err = (name: keyof typeof errors) =>
    errors[name] ? <p id={`hc-${name}-err`} role="alert" className="mt-1 px-1 text-sm text-[#E2582B]">{errors[name]}</p> : null;
  const invalid = (name: keyof typeof errors) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `hc-${name}-err` } : {};

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* spam trap — hidden from people, bots fill it in */}
      <div className="absolute -start-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>Website<input type="text" {...honeypotProps} /></label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Sponsorship */}
        <div className="md:col-span-2">
          <select
            name="sponsorship"
            {...invalid("sponsorship")}
            value={formData.sponsorship}
            onChange={handleChange}
            aria-label={f.sponsorship}
            className="w-full px-4 py-3 border  rounded-lg"
            required
          >
            <option value="" disabled>
              {f.sponsorship}
            </option>
            {sponsorshipOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {err("sponsorship")}
        </div>

        {/* First Name */}
        <div>
          <input
            type="text"
            name="fname"
            {...invalid("fname")}
            value={formData.fname}
            onChange={handleChange}
            placeholder={f.firstName}
            aria-label={f.firstName}
            autoComplete="given-name"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
          {err("fname")}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            name="lname"
            {...invalid("lname")}
            value={formData.lname}
            onChange={handleChange}
            placeholder={f.lastName}
            aria-label={f.lastName}
            autoComplete="family-name"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
          {err("lname")}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            {...invalid("email")}
            value={formData.email}
            onChange={handleChange}
            placeholder={f.email}
            aria-label={f.email}
            autoComplete="email"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
          {err("email")}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            {...invalid("phone")}
            value={formData.phone}
            onChange={handleChange}
            placeholder={f.phoneAlt}
            aria-label={f.phoneAlt}
            autoComplete="tel"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
          {err("phone")}
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <textarea
            name="message"
            {...invalid("message")}
            value={formData.message}
            onChange={handleChange}
            placeholder={f.comments}
            aria-label={f.comments}
            rows={5}
            className="w-full px-4 py-3 border  rounded-lg resize-none"
            required
          />
          {err("message")}
        </div>

        {/* result of sending */}
        <p
          role={status.kind === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`md:col-span-2 rounded-lg px-4 py-3 text-[15px]! ${status.kind === "idle" || status.kind === "sending" ? "sr-only" : ""} ${status.kind === "error" ? "bg-[#fdeee8] text-[#E2582B]" : "bg-[#e6f5f5] text-[#139a9d] font-semibold"}`}
        >
          {status.kind === "sent" || status.kind === "error" ? status.message : ""}
        </p>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={sending}
            className="btn btn-transparent fnt-orange remPad font-bold disabled:opacity-60"
          >
            {sending ? status.message : t.common.submit}
            <Image src="/imgs/icons/icon-send-orange.png" alt="" width={30} height={30} className="mar-left-5 rtl-flip"/>
          </button>
        </div>

      </div>
    </form>
  );
}
