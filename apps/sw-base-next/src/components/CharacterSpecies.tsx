import {getTranslations} from 'next-intl/server';

async function getData(urls: string[]) {
  const t = await getTranslations('errors');
  const responses = await Promise.all(urls.map(url => fetch(url)));
  if (responses.some(res => !res.ok)) {
    throw new Error(t('problemWhileFetching'));
  }
  return Promise.all(responses.map(res => res.json()));
}

// alternative

// async function getData2(urls: string[]) {
//   return Promise.all(
//     urls.map(url => {
//       return fetch(url);
//     })
//   ).then(responses => {
//     return Promise.all(responses.map(resp => resp.json()));
//   });
// }

type CharacterSpeciesProps = {
  urls: string[];
};
const CharacterSpecies = async ({urls}: CharacterSpeciesProps) => {
  const species = await getData(urls);

  return species.map(oneSpecies => oneSpecies.name).join(',') || '–';
};

export default CharacterSpecies;
