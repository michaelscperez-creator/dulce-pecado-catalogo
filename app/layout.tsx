import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dulce-pecado-catalogo.vercel.app"),
  title: {
    default: "Navidad 2026 | Dulce Pecado",
    template: "%s | Dulce Pecado",
  },
  description:
    "La Navidad tiene su lado dulce. Descubre el adelanto navideño de Dulce Pecado y explora nuestra carta habitual de repostería artesanal en Santo Domingo.",
  keywords: ["repostería", "postres", "brownies", "tres leches", "alfajores", "cupcakes", "cheesecake", "Santo Domingo"],
  authors: [{ name: "Dulce Pecado" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Navidad 2026 | Dulce Pecado",
    description: "Un primer vistazo a nuestra Navidad. Colección navideña en preparación y carta habitual disponible para consultar.",
    type: "website",
    locale: "es_DO",
    images: [{ url: "/images/navidad-rosa.webp", width: 1086, height: 1448, alt: "Galletas de Navidad sobre fondo rosa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navidad 2026 | Dulce Pecado",
    description: "Repostería artesanal en Santo Domingo.",
    images: ["/images/navidad-rosa.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5d5df",
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
