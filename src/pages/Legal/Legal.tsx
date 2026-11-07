import { Fragment, useEffect, type ReactNode } from 'react';
import { Button } from '../../components/Button/Button';
import { LanguageSwitch } from '../../components/LanguageSwitch/LanguageSwitch';
import { legalPaths, type LegalDoc } from '../../content/legal';
import { links } from '../../content/site';
import { pathFor, useI18n } from '../../i18n/I18nProvider';
import wordmark from '../../assets/images/ginuh-wordmark.webp';
import { legalCopy } from './copy';
import './Legal.css';

const SITE = 'https://www.ginuhgames.com';
const TOKENS = /(ginuhgames@gmail\.com|www\.aepd\.es|\[\[privacy\]\])/;

/** Privacy policy or legal notice, in the language its address names. */
export function Legal({ doc }: { doc: LegalDoc }) {
  const { t, locale } = useI18n();
  const copy = legalCopy[locale];
  const page = copy[doc];
  const other: LegalDoc = doc === 'privacy' ? 'legal' : 'privacy';
  const home = pathFor(locale);

  // Switching language moves to this same page in that language.
  useEffect(() => {
    const path = legalPaths[doc][locale];
    if (window.location.pathname !== path) history.replaceState(history.state, '', path + window.location.hash);
    document.title = `${page.title} — Ginuh Games`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE + path);
  }, [doc, locale, page.title]);

  const rich = (text: string): ReactNode =>
    text.split(TOKENS).map((part, index) => {
      if (part === links.email) {
        return (
          <a key={index} className="text-link" href={`mailto:${links.email}`}>
            {part}
          </a>
        );
      }
      if (part === 'www.aepd.es') {
        return (
          <a key={index} className="text-link" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            {part}
            <span className="sr-only"> {t.common.newTab}</span>
          </a>
        );
      }
      if (part === '[[privacy]]') {
        return (
          <a key={index} className="text-link" href={legalPaths.privacy[locale]}>
            {copy.privacy.title.toLowerCase()}
          </a>
        );
      }
      return <Fragment key={index}>{part}</Fragment>;
    });

  return (
    <div className="legal">
      <header className="wrap legal__bar">
        <a href={home} className="legal__brand" aria-label={t.nav.home}>
          <img src={wordmark} alt="" width={1200} height={434} />
        </a>
        <LanguageSwitch hrefFor={(code) => legalPaths[doc][code]} />
      </header>

      <main className="wrap legal__main">
        <p className="legal__eyebrow mono">{copy.label}</p>
        <h1 className="legal__title">{page.title}</h1>
        <p className="legal__updated mono">{copy.updated}</p>

        {page.sections.map((section) => (
          <section key={section.heading} className="legal__section">
            <h2>{section.heading}</h2>
            {section.body.map((block, index) =>
              Array.isArray(block) ? (
                <ul key={index}>
                  {block.map((item) => (
                    <li key={item}>{rich(item)}</li>
                  ))}
                </ul>
              ) : (
                <p key={index}>{rich(block)}</p>
              )
            )}
          </section>
        ))}

        <nav className="legal__foot actions" aria-label={copy.label}>
          <Button href={home}>{t.notFound.home}</Button>
          <Button href={legalPaths[other][locale]} variant="secondary">
            {copy[other].title}
          </Button>
        </nav>
      </main>
    </div>
  );
}
