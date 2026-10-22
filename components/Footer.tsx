import Link from "next/link";
import Image from "next/image";
import { getI18n } from "@/lib/i18n/server";

/* Link targets per footer item — "#" = page not built yet */
const hrefs = {
  about: {
    aboutUs: "/about",
    vision: "/about#about",
    chairman: "/about#chairman",
    board: "/about#directors",
    partners: "/about#sponsors",
  },
  why: {
    accreditation: "/why#accreditation",
    campus: "/why/campus-facilities",
    stories: "/media-center/success-stories",
    news: "/media-center/news-articles",
    faq: "#",
  },
  programs: {
    diploma: "/why/programs",
    short: "/why/programs",
    summer: "/why/programs",
    qualification: "/why/programs",
  },
  support: {
    rules: "/rules-regulations",
    privacy: "#",
    terms: "#",
    accessibility: "#",
    contact: "/contact",
  },
} as const;

type ColumnKey = keyof typeof hrefs;

export default async function Footer() {
  const { t } = await getI18n();
  const f = t.footer;
  const columns = Object.keys(hrefs) as ColumnKey[];

  return (
    <footer
      className="text-white bg-right-bottom bg-no-repeat"
      style={{ backgroundImage: "url('/imgs/assets/footer-bg.png')" }}
    >
      <div className="spacer-80"></div>

      <div className="container mx-auto px-6 lg:px-4">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">

          {/* Brand + contact */}
          <div className="lg:p-8">
            <Image src="/imgs/logos/logo.svg" alt="EWA" width={150} height={60} className="h-auto w-[150px]" />

            <div className="spacer-20"></div>

            <div className="contact">
              <ul className="list-none">
                <li>
                  <a className="flex items-center icons-contact hover:text-gray-300" href="tel:+966124222322">
                    <Image src="/imgs/icons/phone.svg" alt="" width={30} height={30} />
                    <span className="ltr-text">{f.phone}</span>
                  </a>
                </li>
                <li>
                  <a className="flex items-center icons-contact hover:text-gray-300" href={`mailto:${f.email}`}>
                    <Image src="/imgs/icons/mail.svg" alt="" width={30} height={30} />
                    <span className="ltr-text">{f.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center icons-contact hover:text-gray-300"
                    href="https://maps.google.com/?q=Energy%20and%20Water%20Academy%20Rabigh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src="/imgs/icons/droppin.svg" alt="" width={30} height={30} />
                    <span>{f.address}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="spacer-20"></div>

            <div className="flex flex-nowrap social-media" aria-label={f.social}>
              <a className="hover:text-gray-300" href="#" aria-label="X"><i className="fa-brands fa-x-twitter"></i></a>
              <a className="hover:text-gray-300" href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a className="hover:text-gray-300" href="#" aria-label="LinkedIn"><i className="fa-brands fa-square-linkedin"></i></a>
            </div>
          </div>

          {/* Link columns: 2 per row on phones, 4 from tablets up */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-3 lg:p-8">
            {columns.map((col) => {
              const copy = f.columns[col];
              const links = hrefs[col] as Record<string, string>;
              const labels = copy.links as Record<string, string>;
              return (
                <div key={col} className="footer-column">
                  <h3 className="mb-5 text-lg font-semibold">{copy.title}</h3>
                  <ul className="space-y-3">
                    {Object.keys(links).map((key) => (
                      <li key={key} className={col === "support" && key === "contact" ? "pt-5" : undefined}>
                        <Link href={links[key]} className="transition hover:text-gray-300">
                          {labels[key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>

        <p className="mt-10 border-t border-white/25 pt-6 text-center text-sm! text-white/85">
          © {new Date().getFullYear()} {t.meta.siteName}. {f.rights}
        </p>
      </div>

      <div className="spacer-40"></div>
    </footer>
  );
}
