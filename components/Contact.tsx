"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ContactForm() {
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(formData);

    // Send to API here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Sponsorship */}
        <div className="md:col-span-2">
          <select
            name="sponsorship"
            value={formData.sponsorship}
            onChange={handleChange}
            aria-label={f.sponsorship}
            className="w-full px-4 py-3 border  rounded-lg"
            required
          >
            <option value="" disabled>
              {f.sponsorship}
            </option>
            {f.sponsorshipOptions.map((label, i) => (
              <option key={i} value={`option${i + 1}`}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* First Name */}
        <div>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder={f.firstName}
            aria-label={f.firstName}
            autoComplete="given-name"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder={f.lastName}
            aria-label={f.lastName}
            autoComplete="family-name"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={f.email}
            aria-label={f.email}
            autoComplete="email"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={f.phoneAlt}
            aria-label={f.phoneAlt}
            autoComplete="tel"
            className="w-full px-4 py-3 border  rounded-lg"
            required
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={f.comments}
            aria-label={f.comments}
            rows={5}
            className="w-full px-4 py-3 border  rounded-lg resize-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="btn btn-transparent fnt-orange remPad font-bold"
          >
            {t.common.submit}
            <Image src="/imgs/icons/icon-send-orange.png" alt="" width={30} height={30} className="mar-left-5 rtl-flip"/>
          </button>
        </div>

      </div>
    </form>
  );
}
