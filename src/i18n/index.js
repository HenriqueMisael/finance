import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUsTranslations from './en-US';
import ptBrTranslations from './pt-BR';

i18n.use(LanguageDetector).init({
  resources: {
    enUS: {
      translations: enUsTranslations,
    },
    ptBR: {
      translations: ptBrTranslations,
    },
  },
  fallbackLng: 'enUS',
  debug: true,
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

export default i18n;
