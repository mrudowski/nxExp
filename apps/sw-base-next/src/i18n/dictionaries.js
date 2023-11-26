import 'server-only';

const dictionaries = {
  en: () => {
    console.log('%c [mr] getDictionary', 'background-color:Gold; color: black');
    // eslint-disable-next-line @nx/enforce-module-boundaries
    return import('../../../../libs/sw-base-tools/src/i18n/en.json').then(module => module.default);
  },
};

// Why bother?
// We only have one language, but we want to have i18n language resource files
export const getDictionary = async () => dictionaries['en']();
// export const getDictionary = async locale => dictionaries[locale]();
