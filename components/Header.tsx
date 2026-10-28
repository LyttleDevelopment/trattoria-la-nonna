"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LIGHTSPEED_RESERVATION_URL } from "@/data/site-config";

const links = [
  { href: "/", label: "Ons verhaal" },
  { href: "/menu", label: "Menukaart" },
  { href: "/takeaway", label: "Afhalen" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="La Nonna Cucina startpagina" onClick={() => setMenuOpen(false)}>
          <Image className="brand-logo" src="/logo.svg" alt="" width={78} height={78} priority />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Menu sluiten" : "Menu openen"}</span>
          <span className={`menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Hoofdnavigatie"
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
          {LIGHTSPEED_RESERVATION_URL ? (
            <a className="nav-reserve" href={LIGHTSPEED_RESERVATION_URL} target="_blank" rel="noreferrer">
              Reserveer via Lightspeed
            </a>
          ) : (
            <span className="nav-reserve" aria-disabled="true">Reserveren binnenkort</span>
          )}
        </nav>
      </div>
    </header>
  );
}
