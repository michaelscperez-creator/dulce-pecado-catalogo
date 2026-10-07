import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductCard({
  product,
  index = 0,
  onAdd,
}: {
  product: Product;
  index?: number;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className="product-card">
      <div className={`product-image-wrap ${product.visual === "editorial" ? `product-editorial tone-${product.tone ?? "berry"}` : ""}`}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt ?? `${product.name} real de Dulce Pecado`}
            width={1122}
            height={1402}
            sizes="(max-width: 680px) 100vw, (max-width: 1040px) 50vw, 33vw"
            className="product-image"
          />
        ) : (
          <div className="editorial-art" role="img" aria-label={`Espacio editorial para ${product.name}; fotografía próximamente`}>
            <span className="editorial-orbit" aria-hidden="true" />
            <span className="editorial-stars" aria-hidden="true">✦　✦</span>
            <strong>{product.name}</strong>
            <small>Fotografía próximamente</small>
          </div>
        )}
        <span className="product-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        {product.badge ? <span className="badge">{product.badge}</span> : null}
      </div>

      <div className="product-body">
        <span className="eyebrow">{product.category}</span>
        <div className="product-heading">
          <h3>{product.name}</h3>
          <div className="price-wrap">
            <strong>{product.priceLabel}</strong>
            {product.priceDetail ? <small>{product.priceDetail}</small> : null}
          </div>
        </div>
        <p>{product.description}</p>
        <button className="product-add" type="button" onClick={() => onAdd(product)}>
          <span>Agregar al pedido</span>
          <span className="add-icon" aria-hidden="true">+</span>
        </button>
      </div>
    </article>
  );
}
