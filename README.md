# Ginuh Games — web

Web oficial de [Ginuh Games](https://www.ginuhgames.com), estudio independiente de videojuegos de Barcelona.

Construida con **React 19 + Vite + TypeScript**, scroll suave con **Lenis**, animaciones con **GSAP** (ScrollTrigger, SplitText) y componentes de **React Bits** (LightRays, SplitText, DecryptedText).

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # comprueba tipos y genera dist/
npm run preview   # sirve el build de producción
```

Requiere Node 20.19+ (probado con Node 22).

## Dónde cambiar cada cosa

| Qué | Dónde |
| --- | --- |
| Textos en inglés, castellano y catalán | `src/i18n/en.ts`, `es.ts`, `ca.ts` |
| Enlaces, redes, equipo, servicios | `src/content/site.ts` |
| Paleta, tipografía, espaciado, curvas de animación | `src/styles/tokens.css` |
| Secciones de la página | `src/sections/*` |
| Página 404 (la sirve Vercel para cualquier URL que no existe) | `404.html`, `src/pages/NotFound/*` |
| Componentes de React Bits (copiados, editables) | `src/components/reactbits/*` |
| Imágenes (WebP optimizado) | `src/assets/images/*` |
| Favicons, imagen para redes sociales, manifest | `public/` |

Para el foco de luz del equipo, `team[].spot` en `site.ts` indica la posición de cada cara en la foto de grupo (en % del ancho y alto).

## Idiomas

La web está en inglés (`/`), castellano (`/es`) y catalán (`/ca`). `en.ts` es el diccionario de referencia: si añades un texto allí, TypeScript obliga a añadirlo también en `es.ts` y `ca.ts`. En `/`, la web usa el idioma elegido antes por el visitante o, si no hay ninguno, el del navegador.

## Formulario de proyectos

La web es estática, así que el formulario de la sección de contacto valida los datos y abre la aplicación de correo del visitante con la solicitud ya redactada y dirigida a `ginuhgames@gmail.com`. Si en el futuro queréis recibir las solicitudes sin pasar por el correo del visitante, basta con cambiar la función `submit` de `src/sections/Contact/ProjectForm.tsx` para enviar los datos a un servicio de formularios o a una función de Vercel.

## Paleta de marca

| Token | Color |
| --- | --- |
| `--orange` | `#FB5B21` |
| `--charcoal` | `#222429` |
| `--black` | `#111111` |
| `--grey` | `#BDBDBF` |
| `--paper` | `#F4F5F8` |

## Despliegue

El dominio `ginuhgames.com` se sirve desde **Vercel**. `vercel.json` fija el framework (Vite), el comando de build (`npm run build`) y la carpeta de salida (`dist`), así que cualquier push a `main` despliega la nueva versión. También reescribe `/es` y `/ca` a `index.html`.
