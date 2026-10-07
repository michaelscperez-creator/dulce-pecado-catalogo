export const site = {
  name: "Dulce Pecado",
  tagline: "El pecado que sí vale la pena.",
  description: "Postres hechos para convertir cualquier momento en un pequeño pecado.",
  instagramHandle: "dulcepecado.sd",
  instagramUrl: "https://www.instagram.com/dulcepecado.sd/",
  tiktokHandle: "dulcepecado.sd",
  tiktokUrl: "https://www.tiktok.com/@dulcepecado.sd",
  whatsappNumber: "18098542386",
  whatsappDisplay: "+1 (809) 854-2386",
};

export function orderUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function orderLabel(short = false) {
  return short ? "Pedir ahora" : "Pedir por WhatsApp";
}
