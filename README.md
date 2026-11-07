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

El formulario de Contacto envía las solicitudes a `/api/contact` ([api/contact.ts](api/contact.ts)), una función de Vercel que valida los datos y manda el correo con [Resend](https://resend.com). El correo llega con el visitante como *reply-to*, así que se le contesta directamente desde Gmail. Si el envío falla, el formulario ofrece abrir la misma solicitud en el correo del visitante.

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
