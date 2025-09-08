import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import azTranslations from './locales/az.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

const resources = {
  az: {
    translation: azTranslations
  },
  en: {
    translation: enTranslations
  },
  ru: {
    translation: ruTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'az', // default language (Azerbaijani)
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
