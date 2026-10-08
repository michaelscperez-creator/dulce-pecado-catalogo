"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { allItems, type Item } from "@/data/products";
import { openWhatsApp } from "@/data/site";

type Line = { id: string; qty: number };
type SheetKind = "contact" | "quote";
type CartContext = {
  count: number;
  add: (item: Item, origin?: HTMLElement | null) => void;
  open: () => void;
  openSheet: (kind: SheetKind) => void;
};

const Ctx = createContext<CartContext>({ count: 0, add: () => {}, open: () => {}, openSheet: () => {} });
export const useCart = () => useContext(Ctx);

const CART_KEY = "dulce-pecado-pedido";
const NAME_KEY = "dulce-pecado-nombre";
const money = (cents: number) => `RD$${(cents / 100).toLocaleString("en-US")}`;
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function celebrate(from: HTMLElement) {
  if (reduced()) return;
  const a = from.getBoundingClientRect();
  const cx = a.left + a.width / 2;
  const cy = a.top + a.height / 2;
  const target = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]"))
    .map((el) => el.getBoundingClientRect())
    .find((r) => r.width > 0 && r.bottom > 0 && r.top < window.innerHeight);
  const tx = target ? target.left + target.width / 2 : window.innerWidth / 2;
  const ty = target ? target.top + target.height / 2 : window.innerHeight - 40;

  const dot = document.createElement("span");
  dot.className = "fly-dot";
  dot.style.left = `${cx}px`;
  dot.style.top = `${cy}px`;
  document.body.appendChild(dot);
  dot.animate(
    [
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(-50% + ${(tx - cx) * 0.55}px), calc(-50% + ${(ty - cy) * 0.35 - 70}px)) scale(1.25)`, opacity: 1, offset: 0.45 },
      { transform: `translate(calc(-50% + ${tx - cx}px), calc(-50% + ${ty - cy}px)) scale(0.25)`, opacity: 0.8 },
    ],
    { duration: 820, easing: "cubic-bezier(0.45, 0, 0.2, 1)" },
  ).onfinish = () => {
    dot.remove();
    document.querySelectorAll<HTMLElement>("[data-cart-target]").forEach((el) => {
      el.classList.remove("bump");
      void el.offsetWidth;
      el.classList.add("bump");
    });
  };

  const colors = ["#f58bb2", "#8fd3dc", "#e9b872", "#ffffff", "#8c1f46"];
  for (let i = 0; i < 9; i++) {
    const s = document.createElement("span");
    s.className = "spark-bit";
    s.style.left = `${cx}px`;
    s.style.top = `${cy}px`;
    s.style.background = colors[i % colors.length];
    document.body.appendChild(s);
    const angle = (Math.PI * 2 * i) / 9 + Math.random() * 0.5;
    const dist = 34 + Math.random() * 34;
    s.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 },
      ],
      { duration: 620, easing: "cubic-bezier(0.2, 0.8, 0.3, 1)" },
    ).onfinish = () => s.remove();
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [sheet, setSheet] = useState<SheetKind | null>(null);
  const [form, setForm] = useState({ event: "", date: "", people: "", details: "" });
  const [toast, setToast] = useState("");
  const [ready, setReady] = useState(false);
  const [shake, setShake] = useState(false);
  const cartNameRef = useRef<HTMLInputElement>(null);
  const sheetNameRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) setLines((JSON.parse(saved) as Line[]).filter((l) => allItems.some((p) => p.id === l.id)));
      setName(window.localStorage.getItem(NAME_KEY) ?? "");
    } catch {
      /* sin almacenamiento */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
      window.localStorage.setItem(NAME_KEY, name);
    } catch {
      /* sin almacenamiento */
    }
  }, [lines, name, ready]);

  const anyOpen = cartOpen || sheet !== null;
  useEffect(() => {
    document.body.classList.toggle("locked", anyOpen);
    const t = window.setTimeout(() => {
      if (cartOpen) closeRef.current?.focus();
      else if (sheet) sheetNameRef.current?.focus();
    }, 380);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setCartOpen(false); setSheet(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(t); window.removeEventListener("keydown", onKey); document.body.classList.remove("locked"); };
  }, [anyOpen, cartOpen, sheet]);

  const add = useCallback((item: Item, origin?: HTMLElement | null) => {
    setLines((cur) =>
      cur.some((l) => l.id === item.id)
        ? cur.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
        : [...cur, { id: item.id, qty: 1 }],
    );
    if (origin) celebrate(origin);
    setToast(`${item.name} agregado`);
    window.setTimeout(() => setToast(""), 2000);
  }, []);

  const change = (id: string, delta: number) =>
    setLines((cur) => cur.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0));

  const detailed = useMemo(
    () => lines.flatMap((l) => { const item = allItems.find((p) => p.id === l.id); return item ? [{ ...l, item }] : []; }),
    [lines],
  );
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = detailed.reduce((sum, l) => sum + (l.item.priceCents ?? 0) * l.qty, 0);
  const hasQuotes = detailed.some((l) => l.item.priceCents === undefined);
  const cleanName = name.trim();
  const nameOk = cleanName.length >= 2;

  const warnName = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.focus();
    setShake(true);
    window.setTimeout(() => setShake(false), 600);
  };

  const sendOrder = () => {
    if (!nameOk) return warnName(cartNameRef);
    const rows = detailed.map(({ item, qty }) =>
      item.priceCents !== undefined
        ? `• ${qty} × ${item.name}${item.unit ? ` (${item.unit})` : ""} — ${money(item.priceCents * qty)}`
        : `• ${qty} × ${item.name} — por cotizar`,
    );
    const parts = [
      `Hola, soy ${cleanName}. Armé mi pedido en el catálogo de Dulce Pecado:`,
      "",
      ...rows,
      "",
      subtotal ? `Subtotal de productos con precio: ${money(subtotal)}` : "",
      hasQuotes ? "Incluí productos por cotizar; ¿me ayudan con tamaños y precios?" : "",
      note.trim() ? `Notas: ${note.trim()}` : "",
      "¿Me confirman disponibilidad y entrega?",
    ].filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""));
    openWhatsApp(parts.join("\n"));
  };

  const sendSheet = () => {
    if (!nameOk) return warnName(sheetNameRef);
    if (sheet === "quote") {
      const rows = [
        `Hola, soy ${cleanName}. Quiero cotizar una mesa de dulces para mi evento.`,
        "",
        form.event.trim() ? `Tipo de evento: ${form.event.trim()}` : "",
        form.date.trim() ? `Fecha: ${form.date.trim()}` : "",
        form.people.trim() ? `Personas: ${form.people.trim()}` : "",
        form.details.trim() ? `Detalles: ${form.details.trim()}` : "",
        "",
        "¿Me ayudan con opciones y precio?",
      ].filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""));
      openWhatsApp(rows.join("\n"));
    } else {
      openWhatsApp(
        [`Hola, soy ${cleanName}. Vi el catálogo de Dulce Pecado y quiero hacer un pedido.`, form.details.trim() ? `\n${form.details.trim()}` : "\n¿Qué tienen disponible?"].join(""),
      );
    }
  };

  const value = useMemo(
    () => ({ count, add, open: () => setCartOpen(true), openSheet: (k: SheetKind) => setSheet(k) }),
    [count, add],
  );

  const nameField = (ref: React.RefObject<HTMLInputElement | null>) => (
    <label className={`field ${shake ? "shake" : ""} ${!nameOk && name.length > 0 ? "warn" : ""}`}>
      <span>Tu nombre <b>*</b></span>
      <input ref={ref} type="text" name="nombre" autoComplete="given-name" enterKeyHint="next" placeholder="¿Cómo te llamas?" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} required />
    </label>
  );

  return (
    <Ctx.Provider value={value}>
      {children}

      <button className={`cart-bar ${count ? "has-items" : ""}`} type="button" onClick={() => setCartOpen(true)} data-cart-target aria-label={`Abrir mi pedido, ${count} productos`} tabIndex={count ? 0 : -1}>
        <span className="bar-count">{count}</span>
        <span className="bar-label">Ver mi pedido</span>
        <span className="bar-total">{subtotal ? money(subtotal) : "Por cotizar"}</span>
      </button>

      <div className={`drawer ${cartOpen ? "is-open" : ""}`} inert={!cartOpen}>
        <button className="drawer-backdrop" type="button" tabIndex={-1} aria-label="Cerrar pedido" onClick={() => setCartOpen(false)} />
        <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Mi pedido">
          <header className="drawer-head">
            <div><span className="eyebrow">Dulce Pecado</span><h2>Mi pedido</h2></div>
            <button ref={closeRef} type="button" className="icon-btn" aria-label="Cerrar" onClick={() => setCartOpen(false)}>×</button>
          </header>
          {detailed.length ? (
            <>
              <div className="drawer-scroll">
                <ul className="drawer-lines">
                  {detailed.map(({ item, qty }) => (
                    <li key={item.id}>
                      <span className="line-thumb">
                        {item.image ? <Image src={item.image} alt="" fill sizes="64px" /> : <i aria-hidden="true">{item.name.charAt(0)}</i>}
                      </span>
                      <div className="line-info">
                        <h3>{item.name}</h3>
                        <p>{item.priceCents !== undefined ? `${item.priceLabel}${item.unit ? ` · ${item.unit}` : ""}` : "Por cotizar"}</p>
                      </div>
                      <div className="qty" role="group" aria-label={`Cantidad de ${item.name}`}>
                        <button type="button" onClick={() => change(item.id, -1)} aria-label={`Quitar un ${item.name}`}>−</button>
                        <strong>{qty}</strong>
                        <button type="button" onClick={() => change(item.id, 1)} aria-label={`Agregar otro ${item.name}`}>+</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="drawer-form">
                  {nameField(cartNameRef)}
                  <label className="field">
                    <span>Notas o fecha de entrega <em>(opcional)</em></span>
                    <textarea rows={2} placeholder="Ej.: para el sábado, sin nueces…" value={note} onChange={(e) => setNote(e.target.value)} maxLength={240} />
                  </label>
                </div>
              </div>
              <footer className="drawer-foot">
                <div className="subtotal"><span>Subtotal con precio</span><strong>{subtotal ? money(subtotal) : "Por cotizar"}</strong></div>
                <p>{nameOk ? (hasQuotes ? "Lo que está por cotizar y la entrega se confirman por WhatsApp." : "Disponibilidad y entrega se confirman por WhatsApp.") : "Escribe tu nombre para enviar el pedido."}</p>
                <button className={`btn btn-wine ${nameOk ? "" : "is-disabled"}`} type="button" onClick={sendOrder} aria-disabled={!nameOk}>
                  Enviar pedido por WhatsApp <span aria-hidden="true">↗</span>
                </button>
              </footer>
            </>
          ) : (
            <div className="drawer-empty">
              <span className="spark" aria-hidden="true">✦</span>
              <h3>Aún no has caído en la tentación.</h3>
              <p>Agrega tus favoritos y envía todo en un solo mensaje.</p>
              <button type="button" className="btn btn-line" onClick={() => setCartOpen(false)}>Ver la carta</button>
            </div>
          )}
        </aside>
      </div>

      <div className={`sheet ${sheet ? "is-open" : ""}`} inert={!sheet}>
        <button className="drawer-backdrop" type="button" tabIndex={-1} aria-label="Cerrar" onClick={() => setSheet(null)} />
        <section className="sheet-panel" role="dialog" aria-modal="true" aria-label={sheet === "quote" ? "Cotizar mesa de dulces" : "Escríbenos"}>
          <header className="sheet-head">
            <div>
              <span className="eyebrow">{sheet === "quote" ? "Eventos" : "WhatsApp"}</span>
              <h2>{sheet === "quote" ? "Cotiza tu mesa de dulces" : "Cuéntanos qué se te antoja"}</h2>
            </div>
            <button type="button" className="icon-btn" aria-label="Cerrar" onClick={() => setSheet(null)}>×</button>
          </header>
          <div className="sheet-body">
            {nameField(sheetNameRef)}
            {sheet === "quote" ? (
              <>
                <label className="field"><span>Tipo de evento <em>(opcional)</em></span><input type="text" placeholder="Cumpleaños, boda, baby shower…" value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} maxLength={60} /></label>
                <div className="field-row">
                  <label className="field"><span>Fecha <em>(opcional)</em></span><input type="text" placeholder="15 de noviembre" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} maxLength={40} /></label>
                  <label className="field"><span>Personas <em>(opcional)</em></span><input type="text" inputMode="numeric" placeholder="40" value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} maxLength={10} /></label>
                </div>
              </>
            ) : null}
            <label className="field"><span>{sheet === "quote" ? "Detalles o estilo" : "Tu mensaje"} <em>(opcional)</em></span><textarea rows={3} placeholder={sheet === "quote" ? "Colores, temática, postres que te gustan…" : "¿Qué tienen disponible hoy?"} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} maxLength={300} /></label>
            <button className={`btn btn-wine ${nameOk ? "" : "is-disabled"}`} type="button" onClick={sendSheet} aria-disabled={!nameOk}>
              {sheet === "quote" ? "Pedir cotización por WhatsApp" : "Abrir WhatsApp"} <span aria-hidden="true">↗</span>
            </button>
            <p className="sheet-note">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
          </div>
        </section>
      </div>

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </Ctx.Provider>
  );
}
