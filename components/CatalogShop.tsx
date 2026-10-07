"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { products, type Product } from "@/data/products";
import { orderUrl } from "@/data/site";

function ProductVisual({ product, sizes }: { product: Product; sizes: string }) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.imageAlt ?? product.name}
        fill
        sizes={sizes}
        priority={product.id === "tres-leches"}
        className="product-photo"
      />
    );
  }

  return (
    <div className="cookie-editorial" role="img" aria-label="Composición editorial de galletas; fotografía real próximamente">
      <span className="cookie-ring ring-one" /><span className="cookie-ring ring-two" />
      <i>✦</i><strong>G</strong><b>recién horneadas</b>
      <small>Fotografía real próximamente</small>
    </div>
  );
}

export default function CatalogShop() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.classList.toggle("sheet-open", Boolean(selected));
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("sheet-open");
      window.removeEventListener("keydown", close);
    };
  }, [selected]);

  const choose = (product: Product) => {
    setQuantity(1);
    setSelected(product);
  };

  const whatsappUrl = selected
    ? orderUrl(`Hola, quiero pedir ${quantity} × ${selected.name} (${selected.priceLabel}). ¿Me confirman disponibilidad y entrega?`)
    : "#";

  return (
    <>
      <div className="product-stories">
        {products.map((product, index) => (
          <article className={`product-story product-story-${index + 1}`} key={product.id} data-reveal>
            <div className="product-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
            <div className="product-media" data-parallax>
              <ProductVisual product={product} sizes="(max-width: 760px) 100vw, 58vw" />
              <span className="media-caption">{product.caption}</span>
            </div>
            <div className="product-copy">
              <span className="eyebrow">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="product-price"><strong>{product.priceLabel}</strong><small>{product.unitLabel}</small></div>
              <p>{product.description}</p>
              <button className="product-cta magnetic" type="button" onClick={() => choose(product)}>
                <span>{index % 2 ? "Pedir este" : "Lo quiero"}</span><i aria-hidden="true">↗</i>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className={`product-sheet ${selected ? "is-open" : ""}`} aria-hidden={!selected}>
        <button className="sheet-backdrop" type="button" aria-label="Cerrar detalle" onClick={() => setSelected(null)} />
        <aside className="sheet-panel" role="dialog" aria-modal="true" aria-label={selected ? `Pedir ${selected.name}` : "Detalle del producto"}>
          <button className="sheet-close" type="button" aria-label="Cerrar" onClick={() => setSelected(null)}>×</button>
          {selected ? (
            <>
              <div className="sheet-visual">
                <ProductVisual product={selected} sizes="(max-width: 760px) 100vw, 45vw" />
              </div>
              <div className="sheet-content">
                <span className="eyebrow">Tu elección</span>
                <h2>{selected.name}</h2>
                <div className="sheet-price"><strong>{selected.priceLabel}</strong><small>{selected.unitLabel}</small></div>
                <p>{selected.description}</p>
                <div className="sheet-actions">
                  <div className="quantity" aria-label={`Cantidad de ${selected.name}`}>
                    <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Reducir cantidad">−</button>
                    <strong>{quantity}</strong>
                    <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Aumentar cantidad">+</button>
                  </div>
                  <a className="whatsapp-cta magnetic" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Pedir por WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <small className="sheet-note">Disponibilidad y entrega se confirman directamente por WhatsApp.</small>
              </div>
            </>
          ) : null}
        </aside>
      </div>
    </>
  );
}
