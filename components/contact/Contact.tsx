"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Contact.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";

type ContactFormProps = {
  /** Keep the sponsorship select at ~60% width on desktop (Contact page layout) */
  narrowSelect?: boolean;
};

export default function ContactForm({ narrowSelect = false }: ContactFormProps) {
  const { t } = useI18n();
  const f = t.contact.form;

  const [formData, setFormData] = useState({
    sponsorship: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Send to API here
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
              className={`${styles.field} ${styles.select} ${formData.sponsorship ? styles.selectFilled : ""}`}
              required
            >
              <option value="" disabled>{f.sponsorship}</option>
              {f.sponsorshipOptions.map((label, i) => (
                <option key={i} value={`option${i + 1}`}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 1: First Name | E-Mail */}
        <div>
          <label className="sr-only" htmlFor="cf-fname">{f.firstName}</label>
          <input id="cf-fname" type="text" name="fname" value={formData.fname} onChange={handleChange}
            placeholder={f.firstName} autoComplete="given-name" className={styles.field} required />
        </div>

        <div>
          <label className="sr-only" htmlFor="cf-email">{f.email}</label>
          <input id="cf-email" type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder={f.email} autoComplete="email" className={styles.field} required />
        </div>

        {/* Row 2: Last Name | Phone Number */}
        <div>
          <label className="sr-only" htmlFor="cf-lname">{f.lastName}</label>
          <input id="cf-lname" type="text" name="lname" value={formData.lname} onChange={handleChange}
            placeholder={f.lastName} autoComplete="family-name" className={styles.field} required />
        </div>

        <div>
          <label className="sr-only" htmlFor="cf-phone">{f.phone}</label>
          <input id="cf-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
            placeholder={f.phone} autoComplete="tel" className={styles.field} required />
        </div>

        {/* Comments */}
        <div className="md:col-span-2">
          <label className="sr-only" htmlFor="cf-message">{f.comments}</label>
          <textarea id="cf-message" name="message" value={formData.message} onChange={handleChange}
            placeholder={f.comments} rows={8} className={`${styles.field} ${styles.textarea}`} required />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className={styles.submit}>
            {t.common.submit}
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
