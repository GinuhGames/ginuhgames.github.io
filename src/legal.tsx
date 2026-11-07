import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/tokens.css';
import './styles/base.css';
import { I18nProvider } from './i18n/I18nProvider';
import { legalFromPath } from './content/legal';
import { Legal } from './pages/Legal/Legal';

// legal.html serves every legal address; the address names the page and its language.
const route = legalFromPath(window.location.pathname) ?? { doc: 'privacy' as const, locale: 'en' as const };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider syncUrl={false} initialLocale={route.locale}>
      <Legal doc={route.doc} />
    </I18nProvider>
  </StrictMode>
);
