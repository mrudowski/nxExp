import {
  ConnectedThings,
  Details,
  getThingQueryUrl,
  PlanetType,
  ROUTES,
  SW_API_URLS,
  useThingQuery,
} from '@nx-exp/sw-base-tools';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {DetailPageParams} from '@/router/types.ts';

const Planet = () => {
  // https://github.com/remix-run/react-router/issues/8200
  const params = useParams() as DetailPageParams;
  const {t} = useTranslation();

  const {data: planet} = useThingQuery<PlanetType>(getThingQueryUrl(SW_API_URLS.planets, params.id));

  // thanks to react router loader it won't happen
  if (!planet) {
    return <PageLoading />;
  }

  return (
    <Details name={planet.name}>
      <p>
        {t('domain.population')}: {planet.population}
      </p>
      <ConnectedThings title={t('domain.residents')} route={ROUTES.characters} urlOrUrls={planet.residents} />
    </Details>
  );
};

export default Planet;
