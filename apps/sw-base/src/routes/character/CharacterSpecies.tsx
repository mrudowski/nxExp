import {useThingsQueries} from '@nx-exp/sw-base-tools';
import {useTranslation} from 'react-i18next';

type CharacterSpeciesProps = {
  urls: string[];
};

const CharacterSpecies = ({urls}: CharacterSpeciesProps) => {
  const {data: species, pending, isError} = useThingsQueries(urls);
  const {t} = useTranslation();

  if (isError) {
    return <em>{t('errors.problemWhileFetching')}</em>;
  }

  return pending ? t('utils.loading') : species.map(oneSpecies => oneSpecies.name).join(',') || '–';
};

export default CharacterSpecies;
