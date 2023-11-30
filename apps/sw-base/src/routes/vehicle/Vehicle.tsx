import {
  ConnectedThings,
  Details,
  getThingQueryUrl,
  ROUTES,
  SW_API_URLS,
  useThingQuery,
  VehicleType,
} from '@nx-exp/sw-base-tools';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';

import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {DetailPageParams} from '@/router/types.ts';

const Vehicle = () => {
  // https://github.com/remix-run/react-router/issues/8200
  const params = useParams() as DetailPageParams;
  const {t} = useTranslation();

  const {data: vehicle} = useThingQuery<VehicleType>(getThingQueryUrl(SW_API_URLS.vehicles, params.id));

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
