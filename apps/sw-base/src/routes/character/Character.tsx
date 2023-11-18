import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

import ConnectedThings from '@/components/ConnectedThings/ConnectedThings.tsx';
import Details from '@/components/Details/Details.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {ROUTES} from '@/router/ROUTES.ts';
import {DetailPageParams} from '@/router/types.ts';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useThingQuery} from '@/services/swApi/hooks/useThingQuery.ts';
import {CharacterType} from '@/services/swApi/types.ts';
import {getThingQueryUrl} from '@/services/swApi/utils.ts';

import CharacterSpecies from './CharacterSpecies.tsx';

const Character = () => {
  // https://github.com/remix-run/react-router/issues/8200
  const params = useParams() as DetailPageParams;
  const {t} = useTranslation();

  const {data: character} = useThingQuery<CharacterType>(getThingQueryUrl(SW_API_URLS.characters, params.id));

  // thanks to react router loader it won't happen
  if (!character) {
    return <PageLoading />;
  }

  return (
    <Details name={Character.name}>
      <p>
        {t('domain.species')}: {character.species.length === 0 ? '–' : <CharacterSpecies urls={character.species} />}
      </p>
      <ConnectedThings title={t('domain.vehicles')} route={ROUTES.vehicles} urlOrUrls={character.vehicles} />
      <ConnectedThings title={t('domain.planets')} route={ROUTES.planets} urlOrUrls={character.homeworld} />
    </Details>
  );
};

export default Character;
