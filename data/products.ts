export type Item = {
  id: string;
  name: string;
  priceLabel: string;
  unit?: string;
  priceCents?: number;
  image?: string;
};

export type Product = Item & {
  category: string;
  description: string;
  caption: string;
  image: string;
  imageAlt: string;
};

export type Extra = {
  id: string;
  name: string;
  detail: string;
  priceLabel: string;
  priceCents: number;
  variants?: { id: string; label: string; name: string }[];
};

export const products: Product[] = [
  {
    id: "tres-leches",
    name: "Tres Leches",
    category: "El clásico",
    description: "Suave, húmedo y coronado con crema. Un clásico delicado que desaparece demasiado rápido.",
    caption: "Suave por dentro. Imposible de olvidar.",
    priceLabel: "RD$125",
    unit: "por unidad",
    priceCents: 12500,
    image: "/images/tres-leches.webp",
    imageAlt: "Tres Leches de Dulce Pecado en vasito, coronado con crema y cereza",
  },
  {
    id: "brownie",
    name: "Brownies",
    category: "Chocolate intenso",
    description: "Centro húmedo, bordes delicados y una cubierta generosa de dulce de leche. Nuestro pecado más intenso.",
    caption: "Chocolate sin medias tintas.",
    priceLabel: "RD$100",
    unit: "por unidad",
    priceCents: 10000,
    image: "/images/brownie.webp",
    imageAlt: "Brownies de Dulce Pecado con dulce de leche y perlas azules",
  },
  {
    id: "alfajores",
    name: "Alfajores",
    category: "Para compartir",
    description: "Dos tapas suaves, dulce de leche y coco, cubiertos de azúcar glass. Delicados por fuera, generosos por dentro.",
    caption: "Dos razones para caer en la tentación.",
    priceLabel: "RD$150",
    unit: "2 unidades",
    priceCents: 15000,
    image: "/images/alfajores.webp",
    imageAlt: "Alfajores de Dulce Pecado con azúcar glass",
  },
  {
    id: "galletas",
    name: "Galletas",
    category: "Horneadas",
    description: "Galletas grandes, doradas por fuera y suaves por dentro, con trozos de chocolate y Oreo. Escríbenos por las variedades disponibles.",
    caption: "Doradas por fuera. Suaves por dentro.",
    priceLabel: "RD$150",
    unit: "por unidad",
    priceCents: 15000,
    image: "/images/galletas.webp",
    imageAlt: "Galletas de chocolate con Oreo de Dulce Pecado recién horneadas",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    category: "Celebraciones",
    description: "Cupcakes personalizados con crema suave y detalles dorados para cumpleaños, regalos y celebraciones.",
    caption: "Cada detalle, a tu medida.",
    priceLabel: "Cotizar",
    unit: "según diseño y cantidad",
    image: "/images/hero-cupcakes.webp",
    imageAlt: "Cupcakes de Dulce Pecado con crema rosada y perlas doradas",
  },
  {
    id: "cajas",
    name: "Cajas de bocados",
    category: "Regalar o compartir",
    description: "Mini brownies y vasitos dulces en una caja lista para regalar, compartir o completar una mesa de postres.",
    caption: "La caja que nadie quiere compartir.",
    priceLabel: "Cotizar",
    unit: "según selección y cantidad",
    image: "/images/dessert-box.webp",
    imageAlt: "Caja de mini brownies y vasitos dulces de Dulce Pecado",
  },
];

export const extras: Extra[] = [
  {
    id: "cheesecake",
    name: "Cheesecake",
    detail: "Elige tu sabor",
    priceLabel: "RD$350",
    priceCents: 35000,
    variants: [
      { id: "cheesecake-clasico", label: "Clásico", name: "Cheesecake clásico" },
      { id: "cheesecake-brownie", label: "Base de brownie", name: "Cheesecake con base de brownie" },
      { id: "cheesecake-dulce-leche", label: "Dulce de leche", name: "Cheesecake de dulce de leche" },
      { id: "cheesecake-chinola", label: "Chinola", name: "Cheesecake de chinola" },
    ],
  },
  { id: "beso-de-angel", name: "Beso de Ángel", detail: "Confirma disponibilidad por WhatsApp", priceLabel: "RD$350", priceCents: 35000 },
  { id: "flan", name: "Flan", detail: "Cremoso y delicado", priceLabel: "RD$200", priceCents: 20000 },
  { id: "coco-horneado", name: "Coco horneado", detail: "Confirma disponibilidad por WhatsApp", priceLabel: "RD$100", priceCents: 10000 },
];

// Todo lo que se puede agregar al pedido
export const allItems: Item[] = [
  ...products,
  ...extras.flatMap((e): Item[] =>
    e.variants
      ? e.variants.map((v) => ({ id: v.id, name: v.name, priceLabel: e.priceLabel, priceCents: e.priceCents }))
      : [{ id: e.id, name: e.name, priceLabel: e.priceLabel, priceCents: e.priceCents }],
  ),
];
