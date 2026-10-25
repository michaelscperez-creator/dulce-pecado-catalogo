import Image from "next/image";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Extras from "@/components/Extras";
import Motion from "@/components/Motion";
import ChristmasAtmosphere from "@/components/ChristmasAtmosphere";
import SheetButton from "@/components/SheetButton";
import { CartProvider } from "@/components/Cart";
import { site } from "@/data/site";
import "./christmas.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  description: site.description,
  sameAs: [site.instagramUrl, site.tiktokUrl],
  servesCuisine: "Repostería",
  address: { "@type": "PostalAddress", addressLocality: "Santo Domingo", addressCountry: "DO" },
};

export default function Home() {
  return (
    <CartProvider>
      <Motion />
      <ChristmasAtmosphere />
      <a className="skip" href="#carta">Saltar a la carta</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="christmas">
        <section className="christmas-hero" id="inicio" aria-labelledby="christmas-title">
          <Header />
          <div className="christmas-hero-copy">
            <p className="christmas-kicker"><span aria-hidden="true" /> Edición de Navidad <b>/ 2026</b></p>
            <h1 id="christmas-title" aria-label="Esta Navidad, regala un dulce pecado.">
              <span className="christmas-title-line">Esta Navidad,</span>
              <span className="christmas-title-line">regala un</span>
              <span className="christmas-title-line"><em>dulce pecado.</em></span>
            </h1>
            <p className="christmas-intro">Para regalar, compartir y celebrar juntos.</p>
            <div className="christmas-actions">
              <a className="btn btn-dark" href="#navidad">Descubrir la Navidad <span aria-hidden="true">↗</span></a>
              <a className="christmas-text-link" href="#carta">Ver la carta habitual <span aria-hidden="true">→</span></a>
            </div>
            <p className="christmas-season-note"><span /> Colección navideña en preparación</p>
          </div>
          <div className="christmas-hero-photo">
            <Image src="/images/navidad-pino.webp" alt="Galletas en forma de árbol, estrella y bastón de Navidad entre ramas de pino" fill priority sizes="100vw" />
          </div>
          <div className="christmas-hero-bottom"><span>Repostería artesanal <i aria-hidden="true">·</i> Santo Domingo</span><a href="#navidad" aria-label="Explorar el adelanto navideño"><span>Un primer vistazo</span><i aria-hidden="true">↓</i></a></div>
        </section>

        <section className="christmas-preview" id="navidad" aria-labelledby="christmas-preview-title">
          <div className="wrap christmas-preview-layout">
            <header className="christmas-preview-head">
              <div>
                <span className="eyebrow">Un primer vistazo</span>
                <h2 id="christmas-preview-title">Ya se siente<br /><em>la Navidad.</em></h2>
              </div>
              <div className="christmas-preview-note">
                <span className="christmas-status">Próximamente</span>
                <p>Estamos preparando algo especial para estas fiestas. Pronto conocerás la colección, sus presentaciones y precios.</p>
              </div>
              <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="christmas-text-link">Ver novedades en Instagram <span aria-hidden="true">↗</span></a>
            </header>
            <div className="christmas-gallery">
              <figure>
                <div className="christmas-gallery-image"><Image src="/images/navidad-rosa.webp" alt="Galletas decoradas con árboles, estrellas y bastones de Navidad sobre fondo rosa" fill sizes="(min-width: 1300px) 342px, (min-width: 960px) 29vw, 44vw" /></div>
                <figcaption>El lado más dulce de la Navidad.</figcaption>
              </figure>
              <figure>
                <div className="christmas-gallery-image"><Image src="/images/navidad-arbol.webp" alt="Detalle de una galleta en forma de árbol de Navidad con glaseado verde, blanco y rojo" fill sizes="(min-width: 1300px) 342px, (min-width: 960px) 29vw, 44vw" /></div>
                <figcaption>La magia está en los detalles.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="carta" id="carta">
          <div className="wrap">
            <header className="section-head" data-reveal>
              <span className="eyebrow">Nuestra carta habitual</span>
              <h2>Tus favoritos,<br /><em>todo el año.</em></h2>
              <p>Mientras llega la colección navideña, explora nuestra carta habitual. Combina tus favoritos y consulta disponibilidad por WhatsApp.</p>
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

        <section className="eventos" id="eventos">
          <div className="wrap eventos-grid">
            <div className="eventos-visual" data-reveal="zoom">
              <div className="eventos-arch" data-parallax>
                <Image src="/images/hero-products.webp" alt="Brownies y alfajores de Dulce Pecado sobre fondo rosa" fill sizes="(max-width: 959px) 80vw, 40vw" />
              </div>
              <span className="eventos-stamp" aria-hidden="true">Mesa<br />de dulces</span>
            </div>
            <div className="eventos-copy" data-reveal>
              <span className="eyebrow">Para celebrar juntos</span>
              <h2>Una mesa dulce.<br /><em>Muchos buenos momentos.</em></h2>
              <p>Una reunión en familia, un encuentro con amigos o la celebración de tu equipo. Cuéntanos tu idea y consultamos opciones según la fecha, la cantidad de personas y el estilo que imaginas.</p>
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
          <div className="finale-word" aria-hidden="true" data-parallax>¿pecamos?</div>
          <div className="wrap finale-inner" data-reveal="zoom">
            <span className="eyebrow">Dulce Pecado · Navidad 2026</span>
            <h2>Lo dulce se<br /><em>comparte.</em></h2>
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
