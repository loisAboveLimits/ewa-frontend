"use client";
import Link from "@/components/i18n/Link";
import Image from "next/image";
import { useLocalePathname } from "@/components/i18n/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

const navHrefs = [
  { key: "about", href: "/about" },
  { key: "why", href: "/why" },
  { key: "community", href: "/community" },
  { key: "users", href: "/users" },
  { key: "join", href: "/join" },
  { key: "contact", href: "/contact" },
] as const;

/** One header link. Comes from the Drupal "front" menu (see app/layout.tsx). */
export type NavItem = { key: string; label: string; href: string; external?: boolean };

export default function Header({ menu = [] }: { menu?: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useLocalePathname();
  const { t } = useI18n();

  // Drupal menu first; the built-in list is only a fallback if Drupal is unreachable / the menu is empty.
  const navItems: NavItem[] = menu.length
    ? menu
    : navHrefs.map((item) => ({ key: item.key, href: item.href, label: t.header.nav[item.key] }));
  const onLogin = isActiveLogin(pathname);

  /* "Welcome, Sign in" tab that hangs under the logo bar (start side: left in EN, right in AR) */
  const loginTab = (
    <Link href="/login" className="login-tab" aria-current={onLogin ? "page" : undefined} onClick={() => setMenuOpen(false)}>
      <UserIcon />
      <span>{t.header.welcome}</span>
      <span className="login-tab-link">{t.header.signIn}</span>
    </Link>
  );
  const isActive = (href: string) =>
    href.startsWith("/") && (pathname === href || (href !== "/" && pathname.startsWith(href + "/")));
  const close = () => setMenuOpen(false);

  // Lock page scroll while the mobile menu is open; close on Escape or when
  // the viewport grows to the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setMenuOpen(false);

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <header className="header">

      <div id="main-navigation" className="w-full" >

        {/* Desktop (≥1024px) */}
        <div className="hidden lg:block nav-desktop">

          {/* language tab — inline-end side (right in English, left in Arabic) */}
          <div className="lang-switcher">
            <LanguageSwitcher />
          </div>

          <div className="flex w-full">
            <div className="flex flex-col item-center justify-center md:w-1/4 bar-logo">

                <Link href="/" className="logo" onClick={close}>
                  <Image
                    className="mx-auto h-auto ewa-logo"
                    src="/imgs/logos/logo.svg"
                    alt="EWA"
                    width={1200}
                    height={800}
                    priority
                  />
                </Link>

            </div>

            <div className="flex flex-col justify-center md:w-3/4 bar-nav">

                <nav className="flex w-full items-center justify-between desktop-nav" aria-label={t.header.mainNav}>
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={isActive(item.href) ? "active" : undefined}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

            </div>
          </div>

          <div className="login-tab-wrap desktop-view">{loginTab}</div>
        </div>

        {/* Mobile & tablet (<1024px) */}
        <div className={`lg:hidden nav-mobile mobile-view ${menuOpen ? "open" : ""}`}>

          <div className="nav-mobile-bar">
            <Link href="/" className="nav-mobile-logo" onClick={close}>
              <Image
                src="/imgs/logos/logo.svg"
                alt="EWA"
                width={1200}
                height={800}
                priority
                className="h-auto w-full"
              />
            </Link>

            <div className="flex items-center gap-2">
              {/* quick language toggle, always visible on phones */}
              <LanguageSwitcher className="mobile-lang-quick" />

              <button
                type="button"
                className={`menu-toggle ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <div id="mobile-menu" className="mobile-nav" aria-hidden={!menuOpen} inert={!menuOpen}>
            <nav aria-label={t.header.mobileNav}>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={close}
                  className={isActive(item.href) ? "active" : undefined}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mobile-lang">
                <LanguageSwitcher variant="long" onSwitch={close} />
              </div>
            </nav>
          </div>
        </div>

        {/* same tab under the phone / tablet bar — hidden while the menu is open */}
        <div className={`lg:hidden login-tab-wrap login-tab-wrap--mobile mobile-view ${menuOpen ? "hidden" : ""}`}>{loginTab}</div>

      </div>

      {/* Tap outside the menu to close it */}
      <div
        className={`nav-backdrop lg:hidden ${menuOpen ? "show" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

    </header>
  );
}

const isActiveLogin = (pathname: string) => pathname === "/login" || pathname.startsWith("/login/");

function UserIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c.9-3.9 3.9-6 7.5-6s6.6 2.1 7.5 6" />
    </svg>
  );
}
