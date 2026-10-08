// El número no se muestra en pantalla ni en el HTML: se arma solo al abrir WhatsApp.
const phoneParts = ["1809", "854", "2386"];

export const site = {
  name: "Dulce Pecado",
  tagline: "Pecar sabe mejor.",
  description:
    "Repostería artesanal en Santo Domingo. Pecar sabe mejor: brownies, tres leches, alfajores, galletas y cajas de bocados.",
  instagramHandle: "dulcepecado.sd",
  instagramUrl: "https://www.instagram.com/dulcepecado.sd/",
  tiktokHandle: "dulcepecado.sd",
  tiktokUrl: "https://www.tiktok.com/@dulcepecado.sd",
};

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${phoneParts.join("")}?text=${encodeURIComponent(message)}`;
  const win = window.open(url, "_blank");
  if (win) {
    win.opener = null;
  } else {
    window.location.href = url;
  }
}
