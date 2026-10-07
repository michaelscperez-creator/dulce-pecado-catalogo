"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#inicio" className="brand" aria-label="Dulce Pecado, volver al inicio">
        <span className="brand-logo" aria-hidden="true">
          <Image src="/images/logo-original.png" alt="" width={3375} height={3375} priority />
        </span>
        <span className="brand-wordmark">Dulce Pecado</span>
      </a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
        <span /><span />
      </button>
      <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
        <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
        <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
        <a href="#pedir" onClick={() => setMenuOpen(false)}>Pedir</a>
      </nav>
      <a className="header-order magnetic" href="#catalogo">Elegir mi pecado <span aria-hidden="true">↘</span></a>
    </header>
  );
}
