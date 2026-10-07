# Dulce Pecado — publicación

La web está diseñada, conectada a WhatsApp y compilada. La única pieza pendiente de contenido es una foto real de Galletas; hasta entonces se muestra un tratamiento editorial que no intenta representar el producto.

## Ejecutar localmente

Requiere Node.js 20.9 o superior:

    npm install
    npm run dev

Abre http://localhost:3000.

## Publicar en Vercel

El repositorio `michaelscperez-creator/dulce-pecado-catalogo` ya está conectado a Vercel. La publicación se activa al subir los cambios a la rama `main`.

1. Revisa y confirma los cambios locales.
2. Crea el commit y súbelo a `main`.
3. Espera el despliegue automático de Vercel.
4. Comprueba la URL pública en móvil y desktop.

Opcional: define `NEXT_PUBLIC_SITE_URL` con el dominio final para que las imágenes sociales usen la URL pública correcta.

El proyecto usa exportación estática. La salida local de producción se genera con:

    npm run build

## Dónde editar

- Productos y precios: data/products.ts
- WhatsApp y redes: data/site.ts
- Contenido: app/page.tsx
- Estilos: app/globals.css
- Fotografías: public/images/
