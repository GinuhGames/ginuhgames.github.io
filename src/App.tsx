import { useEffect } from 'react';
import { SmoothScroll } from './lib/SmoothScroll';
import { ScrollTrigger } from './lib/gsap';
import { I18nProvider, useI18n } from './i18n/I18nProvider';
import { Nav } from './components/Nav/Nav';
import { Hero } from './sections/Hero/Hero';
import { Unlighted } from './sections/Unlighted/Unlighted';
import { Light } from './sections/Light/Light';
import { Memo } from './sections/Memo/Memo';
import { Studio } from './sections/Studio/Studio';
import { Team } from './sections/Team/Team';
import { Services } from './sections/Services/Services';
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
      <a className="skip-link" href="#unlighted">
        {t.common.skip}
      </a>
      <Nav />
      <main>
        <Hero />
        <Unlighted />
        <Light />
        <Memo />
        <Studio />
        <Team />
        <Services />
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
