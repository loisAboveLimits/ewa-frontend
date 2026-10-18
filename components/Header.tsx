"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About EWA", href: "/about" },
  { label: "Why EWA", href: "/why" },
  { label: "EWA Community", href: "/community" },
  { label: "EWA Users", href: "/users" },
  { label: "EWA Join", href: "/join" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
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

          <div className="lang-switcher">
            <a href="">ENG</a>
          </div>

          <div className="clear-both"></div>

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

                <nav className="flex w-full items-center justify-between desktop-nav" aria-label="Main navigation">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={isActive(item.href) ? "active" : undefined}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

            </div>
          </div>
        </div>

        {/* Mobile & tablet (<1024px) */}
        <div className={`lg:hidden nav-mobile ${menuOpen ? "open" : ""}`}>

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

            <button
              type="button"
              className={`menu-toggle ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div id="mobile-menu" className="mobile-nav" aria-hidden={!menuOpen} inert={!menuOpen}>
            <nav aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={isActive(item.href) ? "active" : undefined}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mobile-lang">
                <a href="">ENG</a>
              </div>
            </nav>
          </div>
        </div>

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
