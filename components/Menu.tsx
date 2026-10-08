"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/Cart";
import { products } from "@/data/products";

export default function Menu() {
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const total = products.length;

  // En móvil el carrusel se desliza: calcula la tarjeta centrada.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      if (window.matchMedia("(min-width: 960px)").matches) return;
      const kids = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, dist = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetLeft + k.offsetWidth / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const k = el?.children[i] as HTMLElement | undefined;
    if (el && k) el.scrollTo({ left: k.offsetLeft - (el.clientWidth - k.offsetWidth) / 2, behavior: "smooth" });
    setActive(i);
  };

  return (
    <div className="show">
      <ul className="show-track" ref={track}>
        {products.map((p, i) => (
          <li
            key={p.id}
            className={`slide ${active === i ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            data-reveal
            style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
          >
            <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 959px) 80vw, 50vw" priority={i < 2} />
            <div className="slide-shade" aria-hidden="true" />
            <span className="slide-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="slide-vert" aria-hidden="true">{p.name}</span>
            <div className="slide-body">
              <span className="slide-cat">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="slide-foot">
                <div className="slide-price">
                  <strong>{p.priceLabel}</strong>
                  <small>{p.unit}</small>
                </div>
                <button type="button" className="slide-add" onClick={(e) => add(p, e.currentTarget)} aria-label={`Agregar ${p.name} al pedido`}>
                  <span>Agregar</span><i aria-hidden="true">+</i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="show-nav" aria-hidden="true">
        <span className="show-count"><b>{String(active + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}</span>
        <span className="show-bar"><i style={{ width: `${((active + 1) / total) * 100}%` }} /></span>
        <span className="show-arrows">
          <button type="button" tabIndex={-1} onClick={() => go(Math.max(0, active - 1))}>←</button>
          <button type="button" tabIndex={-1} onClick={() => go(Math.min(total - 1, active + 1))}>→</button>
        </span>
      </div>
    </div>
  );
}
