import Link from "@/components/i18n/Link";
import Image from "next/image";
import { getI18n } from "@/lib/i18n/server";
import { getNavMenu, MENUS, type NavItem } from "@/lib/menus";

/*
 * Footer link columns come from the Drupal menu "frontend-footer":
 *   top-level items = column headings, their child items = the links.
 * The list below is only the fallback used when Drupal can't be reached or the menu is empty.
 * Link targets per footer item — "#" = page not built yet.
 */
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

/** Built-in columns (fallback) in the same shape as the Drupal menu. */
function fallbackColumns(f: Awaited<ReturnType<typeof getI18n>>["t"]["footer"]): NavItem[] {
  return (Object.keys(hrefs) as ColumnKey[]).map((col) => {
    const links = hrefs[col] as Record<string, string>;
    const labels = f.columns[col].links as Record<string, string>;
    return {
      key: col,
      label: f.columns[col].title,
      href: "#",
      children: Object.keys(links).map((key) => ({ key: `${col}-${key}`, label: labels[key], href: links[key], children: [] })),
    };
  });
}

export default async function Footer() {
  const { locale, t } = await getI18n();
  const f = t.footer;
  const drupalColumns = await getNavMenu(MENUS.footer, locale);
  const columns = drupalColumns.length ? drupalColumns : fallbackColumns(f);

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
            {columns.map((col) => (
              <div key={col.key} className="footer-column">
                <h3 className="mb-5 text-lg font-semibold">
                  {/* a heading that points somewhere real becomes a link */}
                  {col.href && col.href !== "#" && col.children.length === 0 ? (
                    <FooterLink item={col} />
                  ) : (
                    col.label
                  )}
                </h3>
                {col.children.length > 0 && (
                  <ul className="space-y-3">
                    {col.children.map((link) => (
                      <li key={link.key}>
                        <FooterLink item={link} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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

function FooterLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="transition hover:text-gray-300"
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {item.label}
    </Link>
  );
}
