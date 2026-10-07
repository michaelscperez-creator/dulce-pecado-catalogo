# Dulce Pecado — publicación

La web está diseñada, conectada a WhatsApp y compilada. La única pieza pendiente de contenido es una foto real de Galletas; hasta entonces se muestra un tratamiento editorial que no intenta representar el producto.

## Ejecutar localmente

Requiere Node.js 20.9 o superior:

    npm install
    npm run dev

Abre http://localhost:3000.

## Publicar en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel, elige **Add New → Project** e importa el repositorio.
3. Vercel detectará Next.js automáticamente; no hace falta cambiar el comando de build.
4. Opcional: define NEXT_PUBLIC_SITE_URL con el dominio final para que las imágenes sociales usen la URL pública correcta.
5. Pulsa **Deploy** y comprueba la URL de producción.

El proyecto usa exportación estática. La salida local de producción se genera con:

    npm run build

## Dónde editar

- Productos y precios: data/products.ts
- WhatsApp y redes: data/site.ts
- Contenido: app/page.tsx
- Estilos: app/globals.css
- Fotografías: public/images/
