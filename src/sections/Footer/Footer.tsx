import { useLenis } from 'lenis/react';
import { LuArrowUp } from 'react-icons/lu';
import { links, sectionIds } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { LanguageSwitch } from '../../components/LanguageSwitch/LanguageSwitch';
import wordmark from '../../assets/images/ginuh-wordmark.webp';
import './Footer.css';

export function Footer() {
  const { t } = useI18n();
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <img className="footer__wordmark" src={wordmark} alt="Ginuh Games" width={1200} height={434} loading="lazy" />

          <nav aria-label={t.footer.nav}>
            <ul role="list" className="footer__links">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`}>{t.nav.sections[id]}</a>
                </li>
              ))}
              <li>
                <a href={links.steam} target="_blank" rel="noopener noreferrer">
                  Steam
                </a>
              </li>
              <li>
                <a href={links.discord} target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </li>
            </ul>
          </nav>

          <button type="button" className="footer__top-btn" onClick={toTop}>
            {t.footer.top}
            <LuArrowUp aria-hidden="true" />
          </button>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} Ginuh Games. {t.footer.rights}
          </p>
          <LanguageSwitch />
          <p>{t.footer.made}</p>
        </div>
      </div>
    </footer>
  );
}
