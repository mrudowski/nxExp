import {en} from '@nx-exp/sw-base-tools';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: en,
  },
} as const;

// https://github.com/i18next/i18next/issues/1035
// not needed because we removed in settings: eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: 'en',
  defaultNS,
  resources,
});
