import 'server-only';

const dictionaries = {
  en: () => {
    console.log('%c [mr] getDictionary', 'background-color:Gold; color: black');
    return import('./en.json').then(module => module.default);
  },
};

// Why bother?
// We only have one language, but we want to have i18n language resource files
export const getDictionary = async () => dictionaries['en']();
// export const getDictionary = async locale => dictionaries[locale]();
