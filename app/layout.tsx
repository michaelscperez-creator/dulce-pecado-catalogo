import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dulce-pecado-catalogo.vercel.app"),
  title: {
    default: "Dulce Pecado | Pecar sabe mejor",
    template: "%s | Dulce Pecado",
  },
  description:
    "Catálogo de Dulce Pecado, repostería artesanal en Santo Domingo: Tres Leches, brownies, alfajores, galletas, cheesecakes y cajas de bocados. Arma tu pedido y envíalo por WhatsApp.",
  keywords: ["repostería", "postres", "brownies", "tres leches", "alfajores", "cupcakes", "cheesecake", "Santo Domingo"],
  authors: [{ name: "Dulce Pecado" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Dulce Pecado | Pecar sabe mejor",
    description: "Repostería artesanal en Santo Domingo. Descubre la carta y pide por WhatsApp.",
    type: "website",
    locale: "es_DO",
    images: [{ url: "/images/hero-products.webp", width: 1484, height: 1060, alt: "Brownies y alfajores de Dulce Pecado" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dulce Pecado | Pecar sabe mejor",
    description: "Repostería artesanal en Santo Domingo.",
    images: ["/images/hero-products.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a0b24",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
