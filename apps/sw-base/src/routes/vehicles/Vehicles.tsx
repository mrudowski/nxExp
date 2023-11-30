import {getVehicleRoute, SW_API_URLS, useSuspenseListQuery} from '@nx-exp/sw-base-tools';
import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import QuerySuspenseWithError from '@/components/QuerySuspenseWithError/QuerySuspenseWithError.tsx';

const VehiclesList = () => {
  const {t} = useTranslation();
  const {data: vehicles} = useSuspenseListQuery(SW_API_URLS.vehicles);

  return <List title={t('domain.vehicles')} things={vehicles} getRoute={getVehicleRoute} />;
};

const Vehicles = () => {
  return (
    <QuerySuspenseWithError>
      <VehiclesList />
    </QuerySuspenseWithError>
  );
};

export default Vehicles;
