import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

import ConnectedThings from '../../components/ConnectedThings/ConnectedThings.tsx';
import Details from '../../components/Details/Details.tsx';
import PageLoading from '../../components/PageLoading/PageLoading.tsx';
import {ROUTES} from '../../router/ROUTES.ts';
import {DetailPageParams} from '../../router/types.ts';
import {SW_API_URLS} from '../../services/swApi/constants.ts';
import {useThingQuery} from '../../services/swApi/hooks/useThingQuery.ts';
import {Vehicle} from '../../services/swApi/types.ts';
import {getThingQueryUrl} from '../../services/swApi/utils.ts';

const Vehicle = () => {
  // https://github.com/remix-run/react-router/issues/8200
  const params = useParams() as DetailPageParams;
  const {t} = useTranslation();

  const {data: vehicle} = useThingQuery<Vehicle>(getThingQueryUrl(SW_API_URLS.vehicles, params.id));

  // thanks to react router loader it won't happen
  if (!vehicle) {
    return <PageLoading />;
  }

  return (
    <Details name={vehicle.name}>
      <p>
        {t('domain.vehicleType')}: {vehicle.vehicle_class}
      </p>
      <ConnectedThings title={t('domain.pilots')} route={ROUTES.characters} urlOrUrls={vehicle.pilots} />
    </Details>
  );
};

export default Vehicle;
