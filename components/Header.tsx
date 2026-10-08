"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/Cart";
import { site } from "@/data/site";

const links = [
  { href: "#carta", label: "La carta" },
  { href: "#eventos", label: "Eventos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#pedir", label: "Cómo pedir" },
];

export default function Header() {
  const { count, open, openSheet } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const d = y - last.current;
      if (Math.abs(d) > 6) {
        setHidden(y > 300 && d > 0);
        last.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("menu-open"); };
  }, [menu]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${hidden && !menu ? "is-hidden" : ""} ${menu ? "menu-on" : ""}`}>
        <a href="#inicio" className="brand" aria-label="Dulce Pecado, volver al inicio" onClick={() => setMenu(false)}>
          <span className="brand-logo"><Image src="/images/logo-original.png" alt="" width={96} height={96} priority /></span>
          <span className="brand-name">Dulce Pecado</span>
        </a>
        <nav className="nav" aria-label="Navegación principal">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="cart-pill" type="button" onClick={open} data-cart-target aria-label={`Abrir mi pedido, ${count} productos`}>
            <span>Mi pedido</span>
            <b className={count ? "has-items" : ""}>{count}</b>
          </button>
          <button className={`burger ${menu ? "is-open" : ""}`} type="button" aria-label={menu ? "Cerrar menú" : "Abrir menú"} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`menu-overlay ${menu ? "is-open" : ""}`} inert={!menu}>
        <nav aria-label="Menú">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setMenu(false)}>
              <span>0{i + 1}</span>{l.label}
            </a>
          ))}
        </nav>
        <div className="menu-foot" style={{ "--i": links.length } as React.CSSProperties}>
          <button type="button" className="btn btn-pink" onClick={() => { setMenu(false); openSheet("contact"); }}>
            Pedir por WhatsApp <span aria-hidden="true">↗</span>
          </button>
          <div>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={site.tiktokUrl} target="_blank" rel="noreferrer">TikTok ↗</a>
          </div>
        </div>
      </div>
    </>
  );
}
