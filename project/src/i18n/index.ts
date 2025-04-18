import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import de from './locales/de.json';
import pt from './locales/pt.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  it: { translation: it },
  de: { translation: de },
  pt: { translation: pt }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en', // Set English as default language
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'it', 'de', 'pt'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      cookieMinutes: 160,
      cookieOptions: { path: '/' }
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded'
    }
  });

// Force English on first visit
if (!localStorage.getItem('i18nextLng')) {
  i18n.changeLanguage('en');
}

export default i18n;