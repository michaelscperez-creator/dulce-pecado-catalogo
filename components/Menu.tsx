"use client";

import Image from "next/image";
import { useCart } from "@/components/Cart";
import { products } from "@/data/products";

export default function Menu() {
  const { add } = useCart();

  return (
    <ul className="pgrid">
      {products.map((p, i) => (
        <li key={p.id} className="pcard" data-reveal style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
          <div className="pphoto">
            <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 959px) 46vw, 380px" />
            <span className="pnum" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <button type="button" className="padd" onClick={(e) => add(p, e.currentTarget)} aria-label={`Agregar ${p.name} al pedido`}>
              <span aria-hidden="true">+</span>
            </button>
          </div>
          <div className="pbody">
            <span className="menu-cat">{p.category}</span>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="pprice">
              <strong>{p.priceLabel}</strong>
              <small>{p.unit}</small>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
