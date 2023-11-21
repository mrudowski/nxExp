import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import translation from './resources/en/translation.json';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation,
  },
} as const;

// https://github.com/i18next/i18next/issues/1035
// not needed because we removed in settings: eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: 'en',
  defaultNS,
  resources,
});
