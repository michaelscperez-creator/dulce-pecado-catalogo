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
    "Catálogo digital de Dulce Pecado: postres, cheesecakes, brownies, Tres Leches, alfajores y mesas de dulces. Arma tu pedido y envíalo por WhatsApp.",
  keywords: ["repostería", "postres", "brownies", "tres leches", "cheesecake", "alfajores", "mesa de dulces", "Santo Domingo"],
  authors: [{ name: "Dulce Pecado" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Dulce Pecado | El pecado que sí vale la pena",
    description: "Postres hechos para antojarte. Descubre el catálogo y pide por WhatsApp.",
    type: "website",
    locale: "es_DO",
    images: [{ url: "/images/hero-cupcakes.webp", width: 1122, height: 1402, alt: "Cupcakes de Dulce Pecado" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dulce Pecado",
    description: "Postres hechos para antojarte.",
    images: ["/images/hero-cupcakes.webp"],
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
