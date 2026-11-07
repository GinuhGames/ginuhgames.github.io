import { resolve } from 'node:path';
import type { IncomingMessage } from 'node:http';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const readBody = (req: IncomingMessage) =>
  new Promise<string>((done, fail) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => done(body));
    req.on('error', fail);
  });

/**
 * Serves the Vercel Functions in /api during `npm run dev`, so the contact form
 * works locally. Without RESEND_API_KEY the function only logs the email.
 */
function localApi(): Plugin {
  return {
    name: 'ginuh-local-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        try {
          const handlers = await server.ssrLoadModule('/api/contact.ts');
          const handler = handlers[req.method ?? 'GET'] as ((request: Request) => Promise<Response>) | undefined;
          if (!handler) {
            res.statusCode = 405;
            res.end('Method not allowed');
            return;
          }
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(key, value);
          }
          const body = req.method === 'POST' ? await readBody(req) : undefined;
          const response = await handler(
            new Request(`http://${req.headers.host}${req.originalUrl ?? '/api/contact'}`, {
              method: req.method,
              headers,
              body,
            })
          );
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch (error) {
          server.config.logger.error(String(error));
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: 'local-api' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localApi()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rolldownOptions: {
      // 404.html is served by Vercel for any unknown URL.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
});
