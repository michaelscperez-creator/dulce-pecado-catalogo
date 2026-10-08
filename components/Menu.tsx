"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/Cart";
import { products } from "@/data/products";

export default function Menu() {
  const { add } = useCart();
  const [active, setActive] = useState(products[0].id);
  const current = products.find((p) => p.id === active) ?? products[0];

  return (
    <div className="menu">
      <ol className="menu-list">
        {products.map((p, i) => (
          <li key={p.id} className={active === p.id ? "is-active" : ""} onMouseEnter={() => setActive(p.id)} onFocus={() => setActive(p.id)}>
            <figure className="menu-photo-mobile" data-reveal="clip">
              <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 959px) 100vw, 0px" />
              <span className="photo-tag" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </figure>
            <div className="menu-row" data-reveal>
              <span className="menu-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="menu-main">
                <span className="menu-cat">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>
              <div className="menu-side">
                <div className="menu-price">
                  <strong>{p.priceLabel}</strong>
                  <small>{p.unit}</small>
                </div>
                <button type="button" className="add" onClick={(e) => add(p, e.currentTarget)} aria-label={`Agregar ${p.name} al pedido`}>
                  <span>Agregar</span><i aria-hidden="true">+</i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <aside className="menu-preview" aria-hidden="true">
        <div className="menu-frame">
          {products.map((p) => (
            <Image key={p.id} src={p.image} alt="" fill sizes="(max-width: 959px) 0px, 40vw" className={p.id === active ? "on" : ""} />
          ))}
          <span className="menu-caption">{current.caption}</span>
        </div>
      </aside>
    </div>
  );
}
