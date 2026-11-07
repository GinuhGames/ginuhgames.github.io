import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { en, type Dictionary } from './en';
import { es } from './es';
import { ca } from './ca';

export const locales = ['en', 'es', 'ca'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
};

const dictionaries: Record<Locale, Dictionary> = { en, es, ca };
const STORAGE_KEY = 'ginuh-locale';
const SITE = 'https://www.ginuhgames.com';

export const pathFor = (locale: Locale) => (locale === 'en' ? '/' : `/${locale}`);

const fromPath = (pathname: string): Locale | null => {
  const segment = pathname.split('/')[1];
  if (segment === 'es' || segment === 'ca') return segment;
  return segment === '' || segment === 'en' ? 'en' : null;
};

const readStored = (): Locale | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'en' || value === 'es' || value === 'ca' ? value : null;
  } catch {
    return null;
  }
};

const store = (locale: Locale) => {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* storage unavailable: the URL still carries the language */
  }
};

/** /es and /ca are explicit. On the root, a saved choice wins, then the browser language. */
function detectLocale(): Locale {
  const pathname = window.location.pathname;
  if (pathname !== '/') return fromPath(pathname) ?? 'en';
  const stored = readStored();
  if (stored) return stored;
  for (const language of navigator.languages ?? [navigator.language]) {
    const code = language.toLowerCase().slice(0, 2);
    if (code === 'ca' || code === 'es') return code;
    if (code === 'en') return 'en';
  }
  return 'en';
}

const setMeta = (selector: string, attribute: string, value: string) => {
  document.querySelector(selector)?.setAttribute(attribute, value);
};

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);
  const localeRef = useRef(locale);

  // Keep the address bar, <html lang> and the meta tags in step with the language.
  useEffect(() => {
    const t = dictionaries[locale];
    const path = pathFor(locale);
    localeRef.current = locale;
    if (window.location.pathname !== path) {
      history.replaceState(history.state, '', path + window.location.hash);
    }
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', 'content', t.meta.description);
    setMeta('meta[property="og:title"]', 'content', t.meta.title);
    setMeta('meta[property="og:description"]', 'content', t.meta.description);
    setMeta('meta[property="og:url"]', 'content', SITE + path);
    setMeta('meta[property="og:locale"]', 'content', { en: 'en_GB', es: 'es_ES', ca: 'ca_ES' }[locale]);
    setMeta('link[rel="canonical"]', 'href', SITE + path);
  }, [locale]);

  useEffect(() => {
    const onPop = () => setLocaleState(fromPath(window.location.pathname) ?? 'en');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    store(next);
    if (localeRef.current === next) return;
    history.pushState(null, '', pathFor(next) + window.location.hash);
    setLocaleState(next);
  }, []);

  const value = useMemo(() => ({ locale, t: dictionaries[locale], setLocale }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}
