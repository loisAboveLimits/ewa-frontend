"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Contact.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useContactForm } from "@/components/contact/useContactForm";

type ContactFormProps = {
  /** Keep the sponsorship select at ~60% width on desktop (Contact page layout) */
  narrowSelect?: boolean;
};

export default function ContactForm({ narrowSelect = false }: ContactFormProps) {
  const { t } = useI18n();
  const f = t.contact.form;

  const { values: formData, errors, status, sending, sponsorshipOptions, handleChange, handleSubmit, honeypotProps } = useContactForm();
  const err = (name: keyof typeof errors) =>
    errors[name] ? <p id={`cf-${name}-err`} role="alert" className="mt-1 px-1 text-sm text-[#E2582B]">{errors[name]}</p> : null;
  const invalid = (name: keyof typeof errors) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `cf-${name}-err` } : {};

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} relative`}>
      {/* spam trap — hidden from people, bots fill it in */}
      <div className="absolute -start-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>Website<input type="text" {...honeypotProps} /></label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">

        {/* Sponsorship */}
        <div className={`md:col-span-2 ${narrowSelect ? "lg:w-[62%]" : ""}`}>
          <label className="sr-only" htmlFor="cf-sponsorship">{f.sponsorship}</label>
          <div className={styles.selectWrap}>
            <select
              id="cf-sponsorship"
              name="sponsorship"
              value={formData.sponsorship}
              onChange={handleChange}
              {...invalid("sponsorship")}
              className={`${styles.field} ${styles.select} ${formData.sponsorship ? styles.selectFilled : ""}`}
              required
            >
              <option value="" disabled>{f.sponsorship}</option>
              {sponsorshipOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          {err("sponsorship")}
        </div>

        {/* Row 1: First Name | E-Mail */}
        <div>
          <label className="sr-only" htmlFor="cf-fname">{f.firstName}</label>
          <input id="cf-fname" type="text" name="fname" value={formData.fname} onChange={handleChange}
            placeholder={f.firstName} autoComplete="given-name" className={styles.field} required
            {...invalid("fname")} />
          {err("fname")}
        </div>

        <div>
          <label className="sr-only" htmlFor="cf-email">{f.email}</label>
          <input id="cf-email" type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder={f.email} autoComplete="email" className={styles.field} required
            {...invalid("email")} />
          {err("email")}
        </div>

        {/* Row 2: Last Name | Phone Number */}
        <div>
          <label className="sr-only" htmlFor="cf-lname">{f.lastName}</label>
          <input id="cf-lname" type="text" name="lname" value={formData.lname} onChange={handleChange}
            placeholder={f.lastName} autoComplete="family-name" className={styles.field} required
            {...invalid("lname")} />
          {err("lname")}
        </div>

        <div>
          <label className="sr-only" htmlFor="cf-phone">{f.phone}</label>
          <input id="cf-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
            placeholder={f.phone} autoComplete="tel" className={styles.field} required
            {...invalid("phone")} />
          {err("phone")}
        </div>

        {/* Comments */}
        <div className="md:col-span-2">
          <label className="sr-only" htmlFor="cf-message">{f.comments}</label>
          <textarea id="cf-message" name="message" value={formData.message} onChange={handleChange}
            placeholder={f.comments} rows={8} className={`${styles.field} ${styles.textarea}`} required
            {...invalid("message")} />
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
          <button type="submit" disabled={sending} className={`${styles.submit} disabled:opacity-60`}>
            {sending ? status.message : t.common.submit}
            <Image src="/imgs/icons/icon-send-orange.png" alt="" width={26} height={26} className="rtl-flip" />
          </button>
        </div>

      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */
export function NewsletterForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ newsletter: email });
    // Send to API here
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newsletter}>
      <label className="sr-only" htmlFor="nl-email">{t.contact.form.email}</label>
      <input
        id="nl-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.contact.form.email}
        autoComplete="email"
        className={styles.newsletterInput}
        required
      />
      <button type="submit" className={styles.subscribe}>
        <span>{t.contact.subscribe}</span>
        <span className={styles.subscribeIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
    </form>
  );
}
