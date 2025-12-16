import ja from '@/locales/ja.json';
import { kanaHaftToFull } from '@/utils/kanaHaftToFull';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18n = i18next
  .use(initReactI18next)
  .use({
    type: 'postProcessor',
    name: 'kanaHaftToFull',
    process: kanaHaftToFull,
  })
  .init({
    interpolation: { escapeValue: false },
    resources: {
      ja: {
        translation: ja,
      },
    },
    lng: 'ja',
  });

export default i18n;
