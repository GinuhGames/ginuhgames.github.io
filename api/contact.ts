/**
 * POST /api/contact — Vercel Function that emails a project request to the studio.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  required in production. API key from https://resend.com
 *   CONTACT_TO      optional. Inbox that receives requests (default ginuhgames@gmail.com)
 *   CONTACT_FROM    optional. Sender. The default works without verifying a domain, but
 *                   Resend then only delivers to the email the Resend account was created with.
 *
 * Locally (no key, not on Vercel) the request is validated and logged instead of sent.
 */

const PROJECT_TYPES = {
  games: 'Juegos a medida',
  microgames: 'Microjuegos',
  interactive: 'Actividades interactivas',
  gamification: 'Gamificación',
  other: 'Otra cosa',
} as const;
type ProjectType = keyof typeof PROJECT_TYPES;

const LANGUAGES = { en: 'Inglés', es: 'Castellano', ca: 'Catalán' } as const;
type Language = keyof typeof LANGUAGES;

const LIMITS = { name: 120, email: 200, company: 160, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Real people take longer than this to fill in the form. */
const MIN_FILL_MS = 2500;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

/** Only the studio's own pages may post here. */
function allowedOrigin(origin: string | null) {
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return (
      host === 'ginuhgames.com' ||
      host.endsWith('.ginuhgames.com') ||
      (host.startsWith('ginuhgames-github') && host.endsWith('.vercel.app')) ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!allowedOrigin(request.headers.get('origin'))) return json(403, { ok: false, error: 'forbidden' });

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: 'invalid' });
  }

  // Bots fill the hidden field or submit instantly: answer "ok" and send nothing.
  const elapsed = typeof data.elapsed === 'number' ? data.elapsed : Infinity;
  if (text(data.website, 200) || elapsed < MIN_FILL_MS) return json(200, { ok: true });

  const name = text(data.name, LIMITS.name);
  const email = text(data.email, LIMITS.email);
  const company = text(data.company, LIMITS.company);
  const message = text(data.message, LIMITS.message);
  const types = Array.isArray(data.types)
    ? [...new Set(data.types.filter((type): type is ProjectType => typeof type === 'string' && type in PROJECT_TYPES))]
    : [];
  const language: Language =
    typeof data.locale === 'string' && data.locale in LANGUAGES ? (data.locale as Language) : 'en';

  if (!name || !EMAIL.test(email) || !message) return json(422, { ok: false, error: 'invalid' });

  const typeLabels = types.map((type) => PROJECT_TYPES[type]);
  const subject = `Nueva solicitud de proyecto${typeLabels.length ? `: ${typeLabels.join(', ')}` : ''} — ${name}`;
  const rows: [string, string][] = [
    ['Nombre', name],
    ['Correo', email],
    ...(company ? ([['Empresa', company]] as [string, string][]) : []),
    ...(typeLabels.length ? ([['Tipo de proyecto', typeLabels.join(', ')]] as [string, string][]) : []),
    ['Idioma de la web', LANGUAGES[language]],
  ];

  const plain = [
    'Nueva solicitud desde ginuhgames.com',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Mensaje:',
    message,
    '',
    'Responde a este correo para contestar directamente.',
  ].join('\n');

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
    <div style="background:#111;color:#f4f5f8;padding:20px 24px;font-size:18px;font-weight:bold">Nueva solicitud de proyecto</div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:10px 24px;color:#66686e;width:140px;border-bottom:1px solid #eee">${escapeHtml(label)}</td><td style="padding:10px 24px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`
        )
        .join('')}
    </table>
    <div style="padding:20px 24px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
    <div style="padding:14px 24px;background:#f4f5f8;color:#66686e;font-size:12px">Responde a este correo para contestar directamente a ${escapeHtml(name)}.</div>
  </div></body></html>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (!process.env.VERCEL) {
      console.info(`[contact] dry run (no RESEND_API_KEY)\nSubject: ${subject}\n${plain}`);
      return json(200, { ok: true, dryRun: true });
    }
    console.error('[contact] RESEND_API_KEY is not set');
    return json(503, { ok: false, error: 'not-configured' });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Ginuh Games Web <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'ginuhgames@gmail.com'],
      reply_to: email,
      subject,
      text: plain,
      html,
    }),
  });

  if (!response.ok) {
    console.error('[contact] Resend error', response.status, await response.text());
    return json(502, { ok: false, error: 'send-failed' });
  }

  return json(200, { ok: true });
}
