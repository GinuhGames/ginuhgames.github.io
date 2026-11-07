import { useEffect } from 'react';
import { SmoothScroll } from './lib/SmoothScroll';
import { ScrollTrigger } from './lib/gsap';
import { I18nProvider, useI18n } from './i18n/I18nProvider';
import { Nav } from './components/Nav/Nav';
import { Hero } from './sections/Hero/Hero';
import { Projects } from './sections/Projects/Projects';
import { Studio } from './sections/Studio/Studio';
import { Team } from './sections/Team/Team';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './sections/Footer/Footer';

function Page() {
  const { t, locale } = useI18n();

  // Copy length changes with the language, so scroll-linked positions are measured again.
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [locale]);

  return (
    <>
      <a className="skip-link" href="#projects">
        {t.common.skip}
      </a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Studio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <SmoothScroll>
        <Page />
      </SmoothScroll>
    </I18nProvider>
  );
}
