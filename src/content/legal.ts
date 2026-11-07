import type { Locale } from '../i18n/I18nProvider';

export type LegalDoc = 'privacy' | 'legal';

/** Address of each legal page in each language. vercel.json and vite.config.ts serve them all from legal.html. */
export const legalPaths: Record<LegalDoc, Record<Locale, string>> = {
  privacy: { en: '/privacy', es: '/es/privacidad', ca: '/ca/privacitat' },
  legal: { en: '/legal', es: '/es/aviso-legal', ca: '/ca/avis-legal' },
};

/** Which page and language an address belongs to, if it is a legal page. */
export function legalFromPath(pathname: string): { doc: LegalDoc; locale: Locale } | null {
  const clean = pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/';
  for (const doc of Object.keys(legalPaths) as LegalDoc[]) {
    for (const [locale, path] of Object.entries(legalPaths[doc]) as [Locale, string][]) {
      if (path === clean) return { doc, locale };
    }
  }
  return null;
}
