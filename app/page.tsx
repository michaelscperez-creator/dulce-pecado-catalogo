import Image from "next/image";
import Header from "@/components/Header";
import CatalogShop from "@/components/CatalogShop";
import Motion from "@/components/Motion";
import { orderUrl, site } from "@/data/site";

const generalOrder = "Hola, vi el catálogo de Dulce Pecado y quiero hacer un pedido. ¿Qué tienen disponible hoy?";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  description: site.description,
  telephone: site.whatsappDisplay,
  sameAs: [site.instagramUrl, site.tiktokUrl],
  servesCuisine: "Repostería",
  priceRange: "RD$100–RD$300",
};

export default function Home() {
  return (
    <main>
      <Motion />
      <a className="skip-link" href="#catalogo">Saltar al catálogo</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="hero" id="inicio">
        <Header />
        <div className="hero-photo" data-parallax>
          <Image src="/images/hero-products.webp" alt="Brownies y alfajores reales de Dulce Pecado" fill sizes="100vw" priority />
        </div>
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-content shell">
          <span className="hero-overline">Repostería artesanal · Santo Domingo</span>
          <h1 aria-label="Dulce Pecado. Hecho para provocar antojos.">
            <span>Dulce</span><em>Pecado</em>
          </h1>
          <div className="hero-bottom">
            <p>Hecho para<br />provocar antojos.</p>
            <a className="circle-link magnetic" href="#catalogo" aria-label="Descubrir el catálogo"><span>Descubrir</span><i>↓</i></a>
          </div>
        </div>
        <span className="hero-edition">Catálogo / 2026</span>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          {[0, 1].map((group) => (
            <span key={group}>Un antojo <b>✦</b> Un pecado <b>✦</b> Sin remordimientos <b>✦</b> Dulce Pecado <b>✦</b></span>
          ))}
        </div>
      </div>

      <section className="catalog" id="catalogo">
        <div className="catalog-intro shell" data-reveal>
          <span className="eyebrow">01 — La selección</span>
          <div>
            <h2>Cuatro formas<br />de <em>caer.</em></h2>
            <p>No necesitas una ocasión. Solo elegir el pecado que hoy no vas a resistir.</p>
          </div>
        </div>
        <CatalogShop />
      </section>

      <section className="brand-story" id="nosotros">
        <div className="brand-image" data-reveal>
          <Image src="/images/brownie-detail.webp" alt="Primer plano de brownie real de Dulce Pecado" fill sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
        <div className="brand-copy" data-reveal>
          <span className="eyebrow">02 — Dulce Pecado</span>
          <h2>El pecado<br />comienza <em>aquí.</em></h2>
          <p>Hacemos postres con intención: sabor que se recuerda, textura que provoca y detalles que convierten cada pedido en parte del antojo.</p>
          <div className="brand-values">
            <span><b>01</b> Hecho por encargo</span>
            <span><b>02</b> Atención cercana</span>
            <span><b>03</b> Sabor sin atajos</span>
          </div>
          <a className="underline-link" href={site.instagramUrl} target="_blank" rel="noreferrer">Ver el detrás de cámara en Instagram ↗</a>
        </div>
      </section>

      <section className="order-ritual" id="pedir">
        <div className="shell" data-reveal>
          <span className="eyebrow">03 — Del antojo a tus manos</span>
          <h2>Pedir también<br />debe sentirse <em>rico.</em></h2>
          <ol>
            <li><span>01</span><div><h3>Elige tu pecado</h3><p>Abre el producto, ajusta la cantidad y déjate tentar.</p></div></li>
            <li><span>02</span><div><h3>Escríbenos</h3><p>Tu selección llega lista a nuestro WhatsApp.</p></div></li>
            <li><span>03</span><div><h3>Confirma y disfruta</h3><p>Coordinamos disponibilidad y entrega contigo.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-orbit" aria-hidden="true" />
        <div className="shell final-inner" data-reveal>
          <span className="eyebrow">¿Lista/o para caer?</span>
          <h2>¿Ya elegiste<br />tu <em>pecado?</em></h2>
          <a className="final-button magnetic" href={orderUrl(generalOrder)} target="_blank" rel="noreferrer">Pedir por WhatsApp <span>↗</span></a>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <div className="footer-brand"><Image src="/images/logo-original.png" alt="Logo de Dulce Pecado" width={120} height={120} /><span>Dulce Pecado</span></div>
          <div className="footer-links"><a href={site.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a><a href={site.tiktokUrl} target="_blank" rel="noreferrer">TikTok ↗</a></div>
        </div>
        <div className="shell footer-meta"><span>© 2026 Dulce Pecado</span><a href={orderUrl(generalOrder)} target="_blank" rel="noreferrer">{site.whatsappDisplay}</a><span>Santo Domingo, RD</span></div>
      </footer>
    </main>
  );
}
