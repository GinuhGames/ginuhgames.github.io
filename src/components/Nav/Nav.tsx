import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { LuMenu, LuX } from 'react-icons/lu';
import { FaSteam } from 'react-icons/fa6';
import { links, sectionIds, socials } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { socialIcons } from '../icons';
import { Button } from '../Button/Button';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import wordmark from '../../assets/images/ginuh-wordmark.webp';
import './Nav.css';

export function Nav() {
  const { t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const lenis = useLenis(({ scroll, direction, velocity }) => {
    setScrolled(scroll > 24);
    if (scroll < 120) setHidden(false);
    else if (direction === 1 && velocity > 0.5) setHidden(true);
    else if (direction === -1) setHidden(false);
  });

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Full-screen menu: lock scroll, close on Escape, return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.classList.add('menu-open');
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    menuRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    return () => {
      lenis?.start();
      document.documentElement.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [open, lenis]);

  const go = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
    // Let the menu release the scroll lock before travelling.
    requestAnimationFrame(() => {
      lenis?.scrollTo(id === 'top' ? 0 : `#${id}`, { duration: 1.4 });
    });
    history.replaceState(history.state, '', id === 'top' ? location.pathname : `#${id}`);
  };

  return (
    <header
      className="nav"
      data-hidden={hidden && !open ? '' : undefined}
      data-scrolled={scrolled || open ? '' : undefined}
    >
      <div className="wrap nav__bar">
        <a href="#top" className="nav__brand" onClick={go('top')} aria-label={t.nav.home}>
          <img src={wordmark} alt="" width={1200} height={434} />
        </a>

        <nav className="nav__links" aria-label={t.nav.main}>
          <ul role="list">
            {sectionIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)} aria-current={active === id ? 'true' : undefined}>
                  {t.nav.sections[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <LanguageSwitch />
          <Button href={links.steam} size="sm" icon={<FaSteam />} className="nav__cta">
            {t.nav.cta}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="menu"
        data-open={open ? '' : undefined}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="wrap menu__inner" aria-label={t.nav.mobile}>
          <ul role="list" className="menu__links">
            {sectionIds.map((id, index) => (
              <li key={id} style={{ '--i': index } as React.CSSProperties}>
                <a href={`#${id}`} onClick={go(id)}>
                  {t.nav.sections[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <Button href={links.steam} icon={<FaSteam />}>
              {t.common.getOnSteam}
            </Button>
            <ul role="list" className="menu__socials">
              {socials.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <li key={social.id}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
