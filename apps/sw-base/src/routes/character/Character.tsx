import ZustandPlayground from '@libs/sw-base-tools/src/components/ZustandPlayground/ZustandPlayground.tsx';
import {
  CharacterType,
  ConnectedThings,
  Details,
  getThingQueryUrl,
  ROUTES,
  SW_API_URLS,
  useThingQuery,
} from '@nx-exp/sw-base-tools';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {DetailPageParams} from '@/router/types.ts';

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
    <Details name={character.name}>
      <ZustandPlayground />
      <p>
        {t('domain.species')}: {character.species.length === 0 ? '–' : <CharacterSpecies urls={character.species} />}
      </p>
      <ConnectedThings title={t('domain.vehicles')} route={ROUTES.vehicles} urlOrUrls={character.vehicles} />
      <ConnectedThings title={t('domain.planets')} route={ROUTES.planets} urlOrUrls={character.homeworld} />
    </Details>
  );
};

export default Character;
