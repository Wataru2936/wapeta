import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 言語リソースをインポート
import jaCommon from '../public/locales/ja/common.json';
import koCommon from '../public/locales/ko/common.json';
import zhCommon from '../public/locales/zh/common.json';
import enCommon from '../public/locales/en/common.json';

const resources = {
  ja: {
    common: jaCommon,
  },
  ko: {
    common: koCommon,
  },
  zh: {
    common: zhCommon,
  },
  en: {
    common: enCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // デフォルト言語
    fallbackLng: 'ja',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n; 