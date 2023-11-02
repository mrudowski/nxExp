import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

import ConnectedThings from '@/components/ConnectedThings/ConnectedThings.tsx';
import Details from '@/components/Details/Details.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {ROUTES} from '@/router/ROUTES.ts';
import {DetailPageParams} from '@/router/types.ts';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useThingQuery} from '@/services/swApi/hooks/useThingQuery.ts';
import {Planet} from '@/services/swApi/types.ts';
import {getThingQueryUrl} from '@/services/swApi/utils.ts';

const Planet = () => {
  // https://github.com/remix-run/react-router/issues/8200
  const params = useParams() as DetailPageParams;
  const {t} = useTranslation();

  const {data: planet} = useThingQuery<Planet>(getThingQueryUrl(SW_API_URLS.planets, params.id));

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
