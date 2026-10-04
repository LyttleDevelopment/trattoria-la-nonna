"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Our Story" },
  { href: "/menu", label: "Menu" },
  { href: "/takeaway", label: "Takeaway Order" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="La Nonna Cucina home" onClick={() => setMenuOpen(false)}>
          <Image className="brand-logo" src="/logo.svg" alt="" width={78} height={78} priority />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className={`menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a className="nav-reserve" href="tel:+32499410375">
            Reserve a table
          </a>
        </nav>
      </div>
    </header>
  );
}
