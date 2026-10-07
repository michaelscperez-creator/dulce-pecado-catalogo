export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  priceLabel: string;
  unitLabel: string;
  priceCents?: number;
  image?: string;
  imageAlt?: string;
  caption: string;
};

export const products: Product[] = [
  {
    id: "tres-leches",
    name: "Tres Leches",
    category: "El clásico",
    description: "Suave, húmedo y coronado con crema. Un clásico delicado que desaparece demasiado rápido.",
    priceLabel: "RD$125",
    unitLabel: "por unidad",
    priceCents: 12500,
    image: "/images/tres-leches.webp",
    imageAlt: "Tres Leches real de Dulce Pecado",
    caption: "Suave por dentro. Imposible de olvidar.",
  },
  {
    id: "brownie",
    name: "Brownies",
    category: "Chocolate intenso",
    description: "Centro húmedo, bordes delicados y una cubierta generosa de dulce de leche. Nuestro pecado más intenso.",
    priceLabel: "RD$100",
    unitLabel: "por unidad",
    priceCents: 10000,
    image: "/images/brownie.webp",
    imageAlt: "Brownie real de Dulce Pecado",
    caption: "Chocolate sin medias tintas.",
  },
  {
    id: "alfajores",
    name: "Alfajores",
    category: "Para compartir",
    description: "Dos tapas suaves, dulce de leche y coco. Delicados por fuera, generosos por dentro.",
    priceLabel: "2 × RD$150",
    unitLabel: "dos unidades",
    priceCents: 15000,
    image: "/images/alfajores.webp",
    imageAlt: "Alfajores reales de Dulce Pecado",
    caption: "Dos razones para caer en la tentación.",
  },
  {
    id: "galletas",
    name: "Galletas",
    category: "Horneadas por encargo",
    description: "Variedades y tamaños para cada antojo. Escríbenos para conocer la selección disponible.",
    priceLabel: "RD$150–300",
    unitLabel: "según variedad",
    caption: "La próxima tentación está en el horno.",
  },
];
