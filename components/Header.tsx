"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="Dulce Pecado, volver al inicio">
        <span className="brand-logo" aria-hidden="true">
          <Image src="/images/logo-original.png" alt="" width={3375} height={3375} priority />
        </span>
        <span className="brand-wordmark">Dulce Pecado</span>
      </a>
      <nav className="nav-links" aria-label="Navegación principal">
        <a href="#catalogo">Catálogo</a>
        <a href="#historia">La marca</a>
        <a href="#pedido">Cómo pedir</a>
      </nav>
      <button
        className="header-order"
        type="button"
        onClick={() => window.dispatchEvent(new Event("open-dp-cart"))}
        aria-label="Abrir mi pedido"
      >
        <span>Mi pedido</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 6l6 6-6 6" /></svg>
      </button>
    </header>
  );
}
