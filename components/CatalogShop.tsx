"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { products, type Product } from "@/data/products";
import { orderUrl } from "@/data/site";

type CartItem = { id: string; quantity: number };

const storageKey = "dulce-pecado-cart";

function money(cents: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function CatalogShop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCart(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    document.body.classList.toggle("cart-open", open);
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("cart-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    function openCart() {
      setOpen(true);
    }
    window.addEventListener("open-dp-cart", openCart);
    return () => window.removeEventListener("open-dp-cart", openCart);
  }, []);

  const detailedCart = useMemo(
    () =>
      cart.flatMap((item) => {
        const product = products.find((candidate) => candidate.id === item.id);
        return product ? [{ ...item, product }] : [];
      }),
    [cart],
  );

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const knownTotal = detailedCart.reduce(
    (sum, item) => sum + (item.product.priceCents ?? 0) * item.quantity,
    0,
  );
  const hasQuotes = detailedCart.some((item) => item.product.priceCents === undefined);

  function add(product: Product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { id: product.id, quantity: 1 }];
    });
    setNotice(`${product.name} agregado`);
    window.setTimeout(() => setNotice(""), 1800);
  }

  function change(id: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function checkoutUrl() {
    const lines = detailedCart.map(
      ({ product, quantity }) => `• ${quantity} × ${product.name} — ${product.priceLabel}`,
    );
    const totalLine = knownTotal
      ? `\nSubtotal de precios confirmados: ${money(knownTotal)}`
      : "";
    const quoteLine = hasQuotes
      ? "\nIncluí productos por cotizar; quisiera confirmar tamaños, precios y disponibilidad."
      : "";
    const message = [
      "Hola, armé este pedido en el catálogo de Dulce Pecado:",
      "",
      ...lines,
      totalLine,
      quoteLine,
      "",
      "¿Me ayudan a confirmar el pedido y las opciones de entrega?",
    ].join("\n");
    return orderUrl(message);
  }

  return (
    <>
      <div className="featured-products">
        {products.slice(0, 3).map((product) => (
          <article className="featured-card" key={`featured-${product.id}`}>
            <div className="featured-image">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.imageAlt ?? `${product.name} real de Dulce Pecado`}
                  width={1122}
                  height={1402}
                  sizes="(max-width: 680px) 100vw, 33vw"
                />
              ) : null}
            </div>
            <div className="featured-info">
              <div>
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.priceLabel}</p>
              </div>
              <button type="button" onClick={() => add(product)} aria-label={`Agregar ${product.name} al pedido`}>+</button>
            </div>
          </article>
        ))}
      </div>

      <div className="menu-subheading">
        <div>
          <span className="kicker">Más para elegir</span>
          <h3>El menú completo.</h3>
        </div>
        <p>Combina clásicos, bocados y opciones para celebrar.</p>
      </div>

      <div className="product-grid">
        {products.slice(3).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index + 3} onAdd={add} />
        ))}
      </div>

      <p className="availability-note">
        <span aria-hidden="true">✦</span>
        Los productos sin precio publicado se cotizan según tamaño, cantidad o personalización.
      </p>

      <button
        className={`cart-fab ${count ? "has-items" : ""}`}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Abrir pedido, ${count} productos`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 8H7M10 20h.01M17 20h.01" />
        </svg>
        <span>Mi pedido</span>
        <b>{count}</b>
      </button>

      <div className={`cart-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="cart-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Cerrar pedido" />
        <aside className="cart-drawer" aria-label="Mi pedido" aria-modal="true" role="dialog">
          <div className="cart-header">
            <div>
              <span className="kicker">Dulce Pecado</span>
              <h2>Mi pedido</h2>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar carrito">×</button>
          </div>

          {detailedCart.length ? (
            <>
              <div className="cart-items">
                {detailedCart.map(({ product, quantity }) => (
                  <article className="cart-item" key={product.id}>
                    <div>
                      <span>{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.priceLabel}</p>
                    </div>
                    <div className="quantity" aria-label={`Cantidad de ${product.name}`}>
                      <button type="button" onClick={() => change(product.id, -1)} aria-label={`Quitar un ${product.name}`}>−</button>
                      <strong>{quantity}</strong>
                      <button type="button" onClick={() => change(product.id, 1)} aria-label={`Agregar otro ${product.name}`}>+</button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-summary">
                <div>
                  <span>Subtotal confirmado</span>
                  <strong>{knownTotal ? money(knownTotal) : "Por cotizar"}</strong>
                </div>
                {hasQuotes ? <p>El total final se confirma por WhatsApp según tamaños y personalización.</p> : null}
                <a href={checkoutUrl()} target="_blank" rel="noreferrer">
                  Enviar pedido por WhatsApp
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 6l6 6-6 6" /></svg>
                </a>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span aria-hidden="true">✦</span>
              <h3>Aún no has caído en la tentación.</h3>
              <p>Agrega tus favoritos y arma el pedido completo antes de escribirnos.</p>
              <button type="button" onClick={() => setOpen(false)}>Explorar productos</button>
            </div>
          )}
        </aside>
      </div>

      <div className={`cart-notice ${notice ? "show" : ""}`} role="status" aria-live="polite">
        {notice}
      </div>
    </>
  );
}
