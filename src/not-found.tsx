import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/tokens.css';
import './styles/base.css';
import { I18nProvider } from './i18n/I18nProvider';
import { NotFound } from './pages/NotFound/NotFound';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider syncUrl={false}>
      <NotFound />
    </I18nProvider>
  </StrictMode>
);
