"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "About EWA", href: "/about" },
    { label: "Why EWA", href: "/why" },
    { label: "EWA Community", href: "/community" },
    { label: "EWA Users", href: "/users" },
    { label: "EWA Join", href: "/join" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="header">

      <div id="main-navigation" className="w-full" >
        
        <div className="hidden lg:block nav-desktop">

          <div className="lang-switcher">
            <a href="">ENG</a>
          </div>

          <div className="clear-both"></div>

          <div className="flex w-full">
            <div className="flex flex-col item-center justify-center md:w-1/4 bar-logo">

                <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
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
              
                <nav className="flex w-full items-center justify-between desktop-nav">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </nav>                
             
            </div>
          </div>
        </div>

        <div className="flex lg:hidden nav-mobile">
          
        </div>

      </div>      

      {/* Desktop Navigation */}
      {/*
      <div className="header-container">

        <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
          <Image
            src="/imgs/logos/logo.svg"
            alt="EWA"
            width={140}
            height={50}
            priority
          />
        </Link>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>


        <div className="header-actions">
          <Link href="/contact" className="contact-btn">
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      */}

      {/* Mobile Navigation */}
       {/*
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="mobile-contact-btn"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      </div>
      */}

    </header>
  );
}