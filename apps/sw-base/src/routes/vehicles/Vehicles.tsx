import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {getVehicleRoute} from '@/router/utils.ts';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useSuspenseListQuery} from '@/services/swApi/hooks/useSuspenseListQuery.ts';

const VehiclesInner = () => {
  const {t} = useTranslation();
  const {data: vehicles} = useSuspenseListQuery(SW_API_URLS.vehicles);

  return <List title={t('domain.vehicles')} things={vehicles} getRoute={getVehicleRoute} />;
};

const Vehicles = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <VehiclesInner />
    </Suspense>
  );
};

export default Vehicles;
