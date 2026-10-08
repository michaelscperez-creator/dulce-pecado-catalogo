import Image from "next/image";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Extras from "@/components/Extras";
import Motion from "@/components/Motion";
import SheetButton from "@/components/SheetButton";
import { CartProvider } from "@/components/Cart";
import { site } from "@/data/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  description: site.description,
  sameAs: [site.instagramUrl, site.tiktokUrl],
  servesCuisine: "Repostería",
  address: { "@type": "PostalAddress", addressLocality: "Santo Domingo", addressCountry: "DO" },
};

const ribbonA = ["Pecar sabe mejor", "Hecho por encargo", "Brownies", "Tres Leches", "Alfajores", "Galletas", "Cupcakes"];
const ribbonB = ["Mesa de dulces", "Eventos", "Cheesecake", "Cajas de bocados", "Beso de Ángel", "Flan"];

function Sprinkles({ n = 12 }: { n?: number }) {
  return (
    <div className="sprinkles" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => <span key={i} style={{ "--k": i } as React.CSSProperties} />)}
    </div>
  );
}

function Ribbon({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  return (
    <div className={`ribbon ${reverse ? "reverse" : ""}`} aria-hidden="true">
      <div className="ribbon-track">
        {[0, 1].map((g) => (
          <span key={g}>{words.map((w) => (<span key={w}>{w}<b>✦</b></span>))}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <Motion />
      <a className="skip" href="#carta">Saltar a la carta</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main>
        <section className="hero" id="inicio">
          <div className="hero-bg" data-parallax aria-hidden="true">
            <Image src="/images/hero-products.webp" alt="" fill priority sizes="100vw" />
          </div>
          <Header />
          <Sprinkles n={10} />
          <div className="hero-inner">
            <p className="hero-kicker"><i aria-hidden="true" />Repostería artesanal · Santo Domingo</p>
            <h1 aria-label="Dulce Pecado">
              <span className="ln"><span>Dulce</span></span>
              <span className="ln"><span><em>Pecado</em></span></span>
            </h1>
            <p className="hero-tag">Pecar sabe mejor.</p>
            <div className="hero-actions">
              <a className="btn btn-pink pulse" href="#carta">Elegir mi pecado <span aria-hidden="true">↓</span></a>
              <SheetButton kind="contact" className="btn btn-ghost">Pedir por WhatsApp <span aria-hidden="true">↗</span></SheetButton>
            </div>
          </div>
          <span className="vertical" aria-hidden="true">Catálogo / 2026</span>
          <a href="#carta" className="cue" aria-label="Bajar a la carta"><i aria-hidden="true" /><span>Descubrir</span></a>
        </section>

        <Ribbon words={ribbonA} />

        <section className="carta" id="carta">
          <div className="wrap">
            <header className="section-head" data-reveal>
              <span className="eyebrow">01 — La carta</span>
              <h2>Elige tu <em>debilidad.</em></h2>
              <p>Agrega lo que se te antoje a tu pedido, combina varios postres y envíalo completo por WhatsApp en un solo mensaje.</p>
            </header>
            <Menu />

            <div className="more">
              <div className="more-head" data-reveal>
                <span className="eyebrow">Más opciones</span>
                <h3>También hacemos <em>más.</em></h3>
                <p>Todo se puede sumar al mismo pedido.</p>
              </div>
              <Extras />
            </div>
          </div>
        </section>

        <Ribbon words={ribbonB} reverse />

        <section className="eventos" id="eventos">
          <Sprinkles n={8} />
          <div className="wrap eventos-grid">
            <div className="eventos-visual" data-reveal="zoom">
              <div className="eventos-arch" data-parallax>
                <Image src="/images/hero-products.webp" alt="Brownies y alfajores de Dulce Pecado sobre fondo rosa" fill sizes="(max-width: 959px) 80vw, 40vw" />
              </div>
              <span className="eventos-stamp" aria-hidden="true">Mesa<br />de dulces</span>
            </div>
            <div className="eventos-copy" data-reveal>
              <span className="eyebrow">02 — Eventos</span>
              <h2>Tu celebración merece <em>una mesa irresistible.</em></h2>
              <p>Cumpleaños, bodas, baby showers y reuniones: armamos una mesa de dulces a tu medida. Se cotiza por WhatsApp, según la fecha, la cantidad de personas y el estilo que imaginas.</p>
              <ul className="eventos-list">
                <li>Cuéntanos tu evento</li>
                <li>Te enviamos opciones y precio</li>
                <li>Reservas tu fecha</li>
              </ul>
              <SheetButton kind="quote" className="btn btn-pink btn-lg pulse">Cotizar mi evento <span aria-hidden="true">↗</span></SheetButton>
            </div>
          </div>
        </section>

        <section className="story" id="nosotros">
          <div className="wrap story-grid">
            <div className="story-visual" data-reveal="zoom">
              <div className="story-main" data-parallax>
                <Image src="/images/brownie-detail.webp" alt="Primer plano de un brownie de Dulce Pecado con dulce de leche" fill sizes="(max-width: 959px) 80vw, 38vw" />
              </div>
              <div className="story-small">
                <Image src="/images/mixed-desserts.webp" alt="Brownies y alfajores de Dulce Pecado sobre fondo rosa" fill sizes="(max-width: 959px) 42vw, 18vw" />
              </div>
            </div>
            <div className="story-copy" data-reveal>
              <span className="eyebrow">03 — Nosotros</span>
              <h2>No hacemos postres para que se vean bonitos.</h2>
              <p className="story-lead">Los hacemos para que quieras volver.</p>
              <p>Dulce Pecado nace de una idea sencilla: lo especial no tiene que esperar una celebración. Cuidamos el sabor, la textura y cada detalle para que abrir tu pedido ya se sienta como parte del antojo.</p>
              <dl className="values">
                <div><dt>01</dt><dd>Hecho por encargo</dd></div>
                <div><dt>02</dt><dd>Sabor sin atajos</dd></div>
                <div><dt>03</dt><dd>Atención cercana</dd></div>
              </dl>
              <a className="link" href={site.instagramUrl} target="_blank" rel="noreferrer">Ver el detrás de cámara en Instagram <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="steps" id="pedir">
          <div className="wrap">
            <header className="section-head light" data-reveal>
              <span className="eyebrow">04 — Cómo pedir</span>
              <h2>Del antojo a <em>tus manos.</em></h2>
            </header>
            <ol>
              <li data-reveal><span>01</span><h3>Elige</h3><p>Agrega lo que quieras a Mi pedido. Cambia cantidades cuando quieras.</p></li>
              <li data-reveal><span>02</span><h3>Escríbenos</h3><p>Pon tu nombre y envía el pedido: llega ordenado a nuestro WhatsApp.</p></li>
              <li data-reveal><span>03</span><h3>Confirma y disfruta</h3><p>Coordinamos disponibilidad y entrega contigo. Todo se hace por encargo.</p></li>
            </ol>
          </div>
        </section>

        <section className="finale">
          <Sprinkles n={10} />
          <div className="finale-word" aria-hidden="true" data-parallax>¿pecamos?</div>
          <div className="wrap finale-inner" data-reveal="zoom">
            <span className="eyebrow">Tu próximo favorito te espera</span>
            <h2>Pecar sabe <em>mejor.</em></h2>
            <SheetButton kind="contact" className="btn btn-dark btn-lg pulse">Pedir por WhatsApp <span aria-hidden="true">↗</span></SheetButton>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-top">
          <div className="footer-brand">
            <Image src="/images/logo-original.png" alt="Logo de Dulce Pecado" width={88} height={88} />
            <div><strong>Dulce Pecado</strong><span>{site.tagline}</span></div>
          </div>
          <nav className="footer-links" aria-label="Redes">
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={site.tiktokUrl} target="_blank" rel="noreferrer">TikTok ↗</a>
            <SheetButton kind="contact">WhatsApp ↗</SheetButton>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Dulce Pecado</span>
          <span>Santo Domingo, RD</span>
        </div>
      </footer>
    </CartProvider>
  );
}
