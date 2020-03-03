import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUsTranslations from './en-US';

i18n.use(LanguageDetector).init({
  resources: {
    enUS: {
      translations: enUsTranslations,
    },
    ptBR: {
      translations: enUsTranslations,
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
