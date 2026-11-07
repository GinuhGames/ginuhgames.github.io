import { localeNames, locales, pathFor, useI18n } from '../../i18n/I18nProvider';
import './LanguageSwitch.css';

/** Real links (crawlable, open in a new tab), switched in place on a plain click. */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <nav className={`lang ${className}`} aria-label={t.nav.language}>
      <ul role="list">
        {locales.map((code) => (
          <li key={code}>
            <a
              href={pathFor(code)}
              hrefLang={code}
              lang={code}
              title={localeNames[code]}
              aria-current={code === locale ? 'true' : undefined}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                event.preventDefault();
                setLocale(code);
              }}
            >
              {code.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
