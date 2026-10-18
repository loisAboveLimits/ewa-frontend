import type { Metadata } from "next";
import Image from "next/image";
import ContactForm, { NewsletterForm } from "@/components/contact/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pages } from "@/lib/pages";
import styles from "@/components/contact/Contact.module.css";

export const metadata: Metadata = {
  title: pages.contact.title,
  description: "",
};

const contactItems = [
  {
    label: "Telephone:",
    value: "+966 12 422 2322",
    href: "tel:+966124222322",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2Z" />
        <path d="M15 2.5a6.5 6.5 0 0 1 6.5 6.5M15 6a3 3 0 0 1 3 3" />
      </svg>
    ),
  },
  {
    label: "SMS / Whatsapp",
    value: "+966 12 422 2322",
    href: "https://wa.me/966124222322",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5Z" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    label: "E-Mail:",
    value: "info@ewa.edu.sa",
    href: "mailto:info@ewa.edu.sa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
        <path d="m3 9.5 9 6.5 9-6.5M3 21l7-6M21 21l-7-6" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <section className="banner bg-[url(/imgs/banners/banner-contact.png)] bg-cover bg-center w-full vh-100">
        <div className="banner-caption top-[20%] -translate-y-1/2 absolute inset-0 vh-100">
          <div className="container mx-auto h-full px-4">
            <h1 className="flex h-full items-end banner-title">Contact EWA</h1>
            <div className="spacer-10"></div>
            <p className="banner-subtitle">Always Stay Connected</p>
          </div>
        </div>
      </section>

      {/*<!--breadcrumbs + title + help card-->*/}
      <section className="relative">
        <div className="container mx-auto px-4 relative">

          <Breadcrumbs />

          <div className="spacer-20"></div>

          <div className="flex flex-row items-center gap-3 lg:max-w-[60%]">
            <div className="w-[30px] shrink-0 text-center">
              <Image src="/imgs/icons/title.svg" alt="" width={150} height={150} className="h-auto w-auto" />
            </div>
            <h2 className="font-bold title fnt-green">
              Contact Us<br /><span className="fnt-orange">Stay Connected</span>
            </h2>
          </div>

          <div className="spacer-40"></div>

          {/* Help card — floats over the banner on desktop, stacks on mobile */}
          <aside className={styles.helpCard} aria-label="Contact details">
            <h3 className={styles.helpTitle}>Hi! We are always here to help you</h3>
            <div className={styles.helpList}>
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.helpItem}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className={styles.helpIcon}>{item.icon}</span>
                  <span>
                    <span className={styles.helpLabel}>{item.label}</span>
                    <span className={styles.helpValue}>{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </aside>

          <div className="h-10 lg:hidden" aria-hidden="true"></div>

          {/* Send us a message */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <h3 className={styles.panelTitle}>Send us a message</h3>
              <p className={styles.panelLead}>
                Do you have a question? a concern? Feel free to contact us and we will get back to you as soon as possible.
              </p>
            </div>

            <ContactForm narrowSelect />
          </div>

          <div className="spacer-40"></div>

          {/* Newsletter */}
          <div className="lg:mx-[5%]">
            <h3 className={styles.newsletterTitle}>Subscribe to Our Newsletter</h3>
            <NewsletterForm />
          </div>

        </div>

        <div className="spacer-60"></div>
      </section>

      {/*<!--map-->*/}
      <section className={styles.map} aria-label="EWA location map">
        <iframe
          title="Energy & Water Academy location"
          src="https://maps.google.com/maps?q=Energy%20and%20Water%20Academy%20Rabigh&z=14&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

    </div>
  );
}
