# Ginuh Games — web

Web oficial de [Ginuh Games](https://www.ginuhgames.com), estudio independiente de videojuegos de Barcelona.

Construida con **React 19 + Vite + TypeScript**, scroll suave con **Lenis**, animaciones con **GSAP** (ScrollTrigger, SplitText) y componentes de **React Bits** (LightRays, SplitText).

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
| Proyectos (propios y bajo demanda): imágenes, enlaces, linterna | `src/content/projects.ts` |
| Enlaces, redes, equipo, servicios, tramos de presupuesto, datos de la empresa | `src/content/site.ts` |
| Política de privacidad y aviso legal | `src/pages/Legal/copy.ts` (se sirven desde `legal.html`) |
| Paleta, tipografía, espaciado, curvas de animación | `src/styles/tokens.css` |
| Secciones de la página | `src/sections/*` |
| Página 404 (la sirve Vercel para cualquier URL que no existe) | `404.html`, `src/pages/NotFound/*` |
| Componentes de React Bits (copiados, editables) | `src/components/reactbits/*` |
| Imágenes (WebP optimizado) | `src/assets/images/*` |
| Favicons, imagen para redes sociales, manifest | `public/` |

Para el foco de luz del equipo, `team[].spot` en `site.ts` indica la posición de cada cara en la foto de grupo (en % del ancho y alto).

## Proyectos

La sección Proyectos tiene dos bloques: **Nuestros proyectos** (`ownProjects`) y **Proyectos bajo demanda** (`clientProjects`, vacío por ahora: el bloque muestra el texto, los tipos de servicio y el botón, y las tarjetas aparecen solas al añadir el primero). Cada tarjeta abre debajo de su fila una ficha con toda la información; Unlighted empieza abierta. Cada proyecto tiene su enlace directo: `ginuhgames.com/#witch-you`.

Para añadir un proyecto:

1. Guarda en `src/assets/images/` su logo (WebP con transparencia) y una imagen 16:9 en dos tamaños (900 px y unos 1600 px de ancho).
2. Añádelo a `ownProjects` o `clientProjects` en `src/content/projects.ts` y su id a `ProjectId`.
3. Escribe sus textos en `projects.items` de `en.ts`, `es.ts` y `ca.ts` (TypeScript avisa de lo que falte).

`flashlight` activa la linterna sobre la imagen (la mecánica de Unlighted): la imagen empieza a oscuras y el cursor la ilumina.

## Páginas legales

La política de privacidad y el aviso legal están en `/privacy`, `/legal`, `/es/privacidad`, `/es/aviso-legal`, `/ca/privacitat` y `/ca/avis-legal`. Las seis direcciones las sirve `legal.html` (reescrituras en `vercel.json`, y en `vite.config.ts` para desarrollo). Los datos del titular salen de `company` en `site.ts`. Revisad los textos con vuestra gestoría.

## Idiomas

La web está en inglés (`/`), castellano (`/es`) y catalán (`/ca`). `en.ts` es el diccionario de referencia: si añades un texto allí, TypeScript obliga a añadirlo también en `es.ts` y `ca.ts`. En `/`, la web usa el idioma elegido antes por el visitante o, si no hay ninguno, el del navegador.

## Formulario de proyectos

El formulario de Contacto envía las solicitudes a `/api/contact` ([api/contact.ts](api/contact.ts)), una función de Vercel que valida los datos y manda el correo con [Resend](https://resend.com). El correo llega con el visitante como *reply-to*, así que se le contesta directamente desde Gmail. Si el envío falla, el formulario ofrece abrir la misma solicitud en el correo del visitante.

El formulario pide el presupuesto disponible (tramos en `budgetTiers` de `site.ts`, más «No lo sé todavía») y la aceptación de la política de privacidad; la función rechaza cualquier envío sin ambos. El correo incluye el tramo elegido y la fecha de aceptación.

**Configuración (una sola vez):**

1. Crea una cuenta gratuita en [resend.com](https://resend.com) **con `ginuhgames@gmail.com`**. Sin verificar un dominio, Resend solo entrega a la dirección de la cuenta.
2. En Resend → *API Keys* → *Create API Key* (permiso *Sending access*).
3. En Vercel → proyecto → *Settings → Environment Variables*, añade `RESEND_API_KEY` con esa clave para *Production* y *Preview*.
4. Vuelve a desplegar (las variables se aplican en el siguiente despliegue).

Variables opcionales: `CONTACT_TO` (buzón que recibe, por defecto `ginuhgames@gmail.com`) y `CONTACT_FROM` (remitente; por ejemplo `Ginuh Games <web@ginuhgames.com>` cuando verifiquéis `ginuhgames.com` en Resend).

**Protección:** solo acepta peticiones desde ginuhgames.com y sus despliegues de Vercel, descarta bots (campo trampa invisible y envíos en menos de 2,5 s) y limita la longitud de cada campo.

**En local:** `npm run dev` también sirve `/api/contact`. Sin `RESEND_API_KEY` no envía nada: valida la solicitud y la muestra en la consola.

## Paleta de marca

| Token | Color |
| --- | --- |
| `--orange` | `#E67347` |
| `--charcoal` | `#222429` |
| `--black` | `#111111` |
| `--grey` | `#BDBDBF` |
| `--paper` | `#F4F5F8` |

## Despliegue

El dominio `ginuhgames.com` se sirve desde **Vercel**. `vercel.json` fija el framework (Vite), el comando de build (`npm run build`) y la carpeta de salida (`dist`), así que cualquier push a `main` despliega la nueva versión. También reescribe `/es` y `/ca` a `index.html`.
