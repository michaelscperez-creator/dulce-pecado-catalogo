import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Dulce Pecado | Repostería en Santo Domingo",
    template: "%s | Dulce Pecado",
  },
  description:
    "Catálogo digital de Dulce Pecado: Tres Leches, brownies, alfajores y galletas artesanales en Santo Domingo. Pide por WhatsApp.",
  keywords: ["repostería", "postres", "brownies", "tres leches", "alfajores", "galletas", "Santo Domingo"],
  authors: [{ name: "Dulce Pecado" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Dulce Pecado | El pecado que sí vale la pena",
    description: "Postres hechos para antojarte. Descubre el catálogo y pide por WhatsApp.",
    type: "website",
    locale: "es_DO",
    images: [{ url: "/images/hero-products.webp", width: 1484, height: 1113, alt: "Brownies y alfajores de Dulce Pecado" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dulce Pecado",
    description: "Postres hechos para antojarte.",
    images: ["/images/hero-products.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8c1f46",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
