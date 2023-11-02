import {useTranslation} from 'react-i18next';

import useThingsQueries from '@/services/swApi/hooks/useThingsQueries.ts';

type CharacterSpeciesProps = {
  urls: string[];
};

const CharacterSpecies = ({urls}: CharacterSpeciesProps) => {
  const {data: species, pending} = useThingsQueries(urls);
  const {t} = useTranslation();

  return pending ? t('utils.loading') : species.map(oneSpecies => oneSpecies.name).join(',') || '–';
};

export default CharacterSpecies;
