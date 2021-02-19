import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './enUS';
import ptBR from './ptBR';

const resources = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en-US',

    keySeparator: '.',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
