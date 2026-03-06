# D'Areli Banquetería — Selector de diseños

Web para que el cliente pueda visualizar y elegir entre dos diseños (templates) en tiempo real. Pensada para desplegar en Vercel y compartir el enlace con el cliente.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). En la barra superior puedes alternar entre **Diseño 1** y **Diseño 2** sin recargar la página.

## Enlaces directos a un diseño

- [http://localhost:3000/?template=1](http://localhost:3000/?template=1) — Diseño 1
- [http://localhost:3000/?template=2](http://localhost:3000/?template=2) — Diseño 2

Útil para enviar al cliente un enlace que abra directamente uno de los diseños.

## Desplegar en Vercel

1. Sube el repositorio a GitHub (o similar).
2. En [vercel.com](https://vercel.com) importa el proyecto desde el repo.
3. Vercel detecta Next.js y usa el script `build` por defecto. No hace falta configuración adicional.
4. Tras el despliegue, comparte la URL con el cliente (por ejemplo `https://tu-proyecto.vercel.app` o `https://tu-proyecto.vercel.app/?template=2`).

## Estructura

- `app/page.tsx` — Página principal con estado del template activo y barra de selección.
- `components/TemplateSwitcher.tsx` — Barra fija «Diseño 1» / «Diseño 2».
- `components/templates/Template1.tsx` — Primer diseño (estilo neutro/minimalista).
- `components/templates/Template2.tsx` — Segundo diseño (estilo slate/rojo).
- `template-1.tsx` y `template-2.tsx` en la raíz se mantienen como referencia.

## Scripts

- `npm run dev` — Servidor de desarrollo.
- `npm run build` — Build de producción.
- `npm run start` — Servidor de producción (tras `npm run build`).
- `npm run lint` — Linter.
