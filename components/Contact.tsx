"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactForm() {
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
            className="w-full px-4 py-3 border  rounded-lg"
            required
          >
            <option value="" disabled>
              Sponsorship
            </option>

            <option value="option1">
              Option 1
            </option>

            <option value="option2">
              Option 2
            </option>

            <option value="option3">
              Option 3
            </option>
          </select>
        </div>

        {/* First Name */}
        <div>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
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
            placeholder="Last Name"
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
            placeholder="Email"
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
            placeholder="Telephone / Mobile"
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
            placeholder="Comments"
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
            Submit
            <Image src="/imgs/icons/icon-send-orange.png" alt="EWA" width={30} height={30} className="mar-left-5"/>
          </button>
        </div>

      </div>
    </form>
  );
}