import {getDictionary} from '@/i18n/dictionaries.js';

async function getData(urls: string[]) {
  const dict = await getDictionary();
  const responses = await Promise.all(urls.map(url => fetch(url)));
  if (responses.some(res => !res.ok)) {
    // TODO try it
    throw new Error(dict.errors.problemWhileFetching);
  }
  return Promise.all(responses.map(res => res.json()));
}

type CharacterSpeciesProps = {
  urls: string[];
};
const CharacterSpecies = async ({urls}: CharacterSpeciesProps) => {
  const species = await getData(urls);

  // TODO try error handler
  // if (isError) {
  //   return <em>{t('errors.problemWhileFetching')}</em>;
  // }

  return species.map(oneSpecies => oneSpecies.name).join(',') || '–';
};

export default CharacterSpecies;
