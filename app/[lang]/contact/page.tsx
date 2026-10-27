import ContactForm, { NewsletterForm } from "@/components/contact/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import styles from "@/components/contact/Contact.module.css";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("contact");

const icons = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2Z" />
      <path d="M15 2.5a6.5 6.5 0 0 1 6.5 6.5M15 6a3 3 0 0 1 3 3" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.2" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
      <path d="m3 9.5 9 6.5 9-6.5M3 21l7-6M21 21l-7-6" />
    </svg>
  ),
};

export default async function Contact() {
  const { locale, t } = await getI18n();
  const c = t.contact;

  const contactItems = [
    { key: "phone", label: c.telephone, value: "+966 12 422 2322", href: "tel:+966124222322", icon: icons.phone },
    { key: "whatsapp", label: c.whatsapp, value: "+966 12 422 2322", href: "https://wa.me/966124222322", icon: icons.whatsapp },
    { key: "email", label: c.email, value: "info@ewa.edu.sa", href: "mailto:info@ewa.edu.sa", icon: icons.email },
  ];

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-contact.png" title={c.pageTitle} subtitle={t.pages.contact.desc} />

      {/*<!--breadcrumbs + title + help card-->*/}
      <section className="relative">
        <div className="container mx-auto px-4 relative">

          <Breadcrumbs />

          <div className="spacer-20"></div>

          <SectionTitle className="lg:max-w-[60%]">
            {c.titleA}<br /><span className="fnt-orange">{c.titleHighlight}</span>
          </SectionTitle>

          <div className="spacer-40"></div>

          {/* Help card — floats over the banner on desktop, stacks on mobile */}
          <aside className={styles.helpCard} aria-label={c.helpAria}>
            <h3 className={styles.helpTitle}>{c.helpTitle}</h3>
            <div className={styles.helpList}>
              {contactItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={styles.helpItem}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className={styles.helpIcon}>{item.icon}</span>
                  <span>
                    <span className={styles.helpLabel}>{item.label}</span>
                    <span className={`${styles.helpValue} ltr-text`}>{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </aside>

          <div className="h-10 lg:hidden" aria-hidden="true"></div>

          {/* Send us a message */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <h3 className={styles.panelTitle}>{c.messageTitle}</h3>
              <p className={styles.panelLead}>{c.messageLead}</p>
            </div>

            <ContactForm narrowSelect />
          </div>

          <div className="spacer-40"></div>

          {/* Newsletter */}
          <div className="lg:mx-[5%]">
            <h3 className={styles.newsletterTitle}>{c.newsletterTitle}</h3>
            <NewsletterForm />
          </div>

        </div>

        <div className="spacer-60"></div>
      </section>

      {/*<!--map-->*/}
      <section className={styles.map} aria-label={c.mapLabel}>
        <iframe
          title={c.mapTitle}
          src={`https://maps.google.com/maps?q=Energy%20and%20Water%20Academy%20Rabigh&z=14&output=embed&hl=${locale}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

    </div>
  );
}
