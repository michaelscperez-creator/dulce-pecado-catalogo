import Image from "next/image";
import Header from "@/components/Header";
import CatalogShop from "@/components/CatalogShop";
import { orderLabel, orderUrl, site } from "@/data/site";

const generalOrder =
  "Hola, vi el catálogo de Dulce Pecado y quiero hacer un pedido. ¿Qué tienen disponible hoy?";

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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#catalogo">Saltar al catálogo</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="hero" id="inicio">
        <div className="hero-backdrop" aria-hidden="true">
          <Image
            src="/images/hero-cupcakes.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            quality={92}
          />
        </div>
        <Header />
        <div className="hero-grid shell">
          <div className="hero-copy">
            <span className="kicker hero-kicker">
              Repostería artesanal <i aria-hidden="true" /> Santo Domingo
            </span>
            <h1>
              <span className="hero-main">Tu próximo</span>
              <span className="hero-script">pecado</span>
              <span className="hero-main">empieza aquí.</span>
            </h1>
            <p>
              Brownies, cupcakes, vasitos y clásicos artesanales para convertir
              cualquier momento en algo que quieras repetir.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#catalogo">
                Explorar el catálogo <ArrowIcon />
              </a>
              <a className="button button-link" href="#catalogo">Armar mi pedido</a>
            </div>
            <div className="hero-proof" aria-label="Información de pedidos">
              <span><strong>Hecho</strong> por encargo</span>
              <span><strong>1:1</strong> atención por WhatsApp</span>
            </div>
          </div>
        </div>
        <div className="hero-edition" aria-hidden="true">
          <span>Dulce Pecado</span>
          <i />
          <span>Catálogo 2026</span>
        </div>
        <a className="scroll-cue" href="#catalogo" aria-label="Bajar al catálogo">
          <span>Descubre</span><i aria-hidden="true" />
        </a>
      </section>

      <section className="catalog shell" id="catalogo">
        <div className="section-heading catalog-heading">
          <div>
            <span className="kicker">Los favoritos de la casa</span>
            <h2>Elige un <em>favorito.</em></h2>
          </div>
          <p>
            Empieza por los clásicos o baja para descubrir todo el menú.
          </p>
        </div>
        <CatalogShop />
      </section>

      <section className="story" id="historia">
        <div className="shell story-grid">
          <div className="story-visual">
            <div className="story-image">
              <Image
                src="/images/brownie-detail.webp"
                alt="Detalle real de brownie de Dulce Pecado"
                width={1122}
                height={1402}
                sizes="(max-width: 860px) 100vw, 48vw"
              />
            </div>
            <span className="story-index" aria-hidden="true">DP / 01</span>
            <span className="story-script" aria-hidden="true">irresistible</span>
          </div>
          <div className="story-copy">
            <span className="kicker">Detrás de cada antojo</span>
            <h2>No hacemos postres para que se vean bonitos.</h2>
            <h3>Los hacemos para que quieras volver.</h3>
            <p>
              Dulce Pecado nace de una idea sencilla: lo especial no tiene que
              esperar una celebración. Cuidamos el sabor, la textura y cada
              detalle para que abrir tu pedido ya se sienta como parte del gusto.
            </p>
            <dl className="story-values">
              <div><dt>01</dt><dd>Hecho con intención</dd></div>
              <div><dt>02</dt><dd>Sabor que se recuerda</dd></div>
              <div><dt>03</dt><dd>Atención cercana</dd></div>
            </dl>
            <a className="text-link" href={site.instagramUrl} target="_blank" rel="noreferrer">
              Conoce más en Instagram <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="ritual shell" id="pedido">
        <div className="ritual-intro">
          <span className="kicker">Pedir es así de fácil</span>
          <h2>Del antojo a tus manos.</h2>
        </div>
        <ol className="steps">
          <li>
            <span>01</span>
            <div><h3>Elige</h3><p>Encuentra tu favorito en el catálogo.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><h3>Escríbenos</h3><p>Tu selección llega lista a WhatsApp.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><h3>Confirma</h3><p>Coordinamos disponibilidad y entrega.</p></div>
          </li>
        </ol>
      </section>

      <section className="final-cta">
        <div className="final-scribble" aria-hidden="true">¿pecamos?</div>
        <div className="shell final-cta-inner">
          <div>
            <span className="kicker">Tu próximo favorito te espera</span>
            <h2>¿Con cuál vas a caer hoy?</h2>
          </div>
          <a
            className="button button-light"
            href={orderUrl(generalOrder)}
            target="_blank"
            rel="noreferrer"
          >
            {orderLabel()} <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-top">
          <div className="footer-brand">
            <span className="brand-logo brand-logo-footer" aria-hidden="true">
              <Image src="/images/logo-original.png" alt="" width={3375} height={3375} />
            </span>
            <div><strong>Dulce Pecado</strong><span>{site.tagline}</span></div>
          </div>
          <div className="footer-social">
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={site.tiktokUrl} target="_blank" rel="noreferrer">TikTok ↗</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Dulce Pecado</span>
          <a href={orderUrl(generalOrder)} target="_blank" rel="noreferrer">
            {site.whatsappDisplay}
          </a>
          <span>Santo Domingo, RD</span>
        </div>
      </footer>

    </main>
  );
}
