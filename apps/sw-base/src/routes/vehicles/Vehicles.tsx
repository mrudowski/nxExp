import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import QuerySuspenseWithError from '@/components/QuerySuspenseWithError/QuerySuspenseWithError.tsx';
import {getVehicleRoute} from '@/router/utils.ts';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useSuspenseListQuery} from '@/services/swApi/hooks/useSuspenseListQuery.ts';

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
