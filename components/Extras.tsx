"use client";

import { useCart } from "@/components/Cart";
import { extras, allItems } from "@/data/products";

export default function Extras() {
  const { add, openSheet } = useCart();
  const find = (id: string) => allItems.find((i) => i.id === id)!;

  return (
    <ul className="extras">
      {extras.map((e) => (
        <li key={e.id} data-reveal>
          <div className="extra-main">
            <h4>{e.name}</h4>
            <p>{e.detail}</p>
          </div>
          <strong className="extra-price">{e.priceLabel}</strong>
          {e.variants ? (
            <div className="chips" role="group" aria-label={`Sabores de ${e.name}`}>
              {e.variants.map((v) => (
                <button key={v.id} type="button" className="chip" onClick={(ev) => add(find(v.id), ev.currentTarget)} aria-label={`Agregar ${v.name} al pedido`}>
                  {v.label} <i aria-hidden="true">+</i>
                </button>
              ))}
            </div>
          ) : (
            <button type="button" className="add" onClick={(ev) => add(find(e.id), ev.currentTarget)} aria-label={`Agregar ${e.name} al pedido`}>
              <span>Agregar</span><i aria-hidden="true">+</i>
            </button>
          )}
        </li>
      ))}
      <li data-reveal>
        <div className="extra-main">
          <h4>Mesa de dulces</h4>
          <p>Para eventos: se cotiza por WhatsApp según tu celebración.</p>
        </div>
        <strong className="extra-price">Cotizar</strong>
        <button type="button" className="add add-wine" onClick={() => openSheet("quote")}>
          <span>Cotizar</span><i aria-hidden="true">↗</i>
        </button>
      </li>
    </ul>
  );
}
