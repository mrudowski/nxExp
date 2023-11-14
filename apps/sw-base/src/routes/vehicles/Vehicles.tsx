import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useSuspenseListQuery} from '@/services/swApi/hooks/useSuspenseListQuery.ts';

const Vehicles = () => {
  const {t} = useTranslation();

  const {data: vehicles} = useSuspenseListQuery(SW_API_URLS.vehicles);

  // thanks to react router loader it won't happen
  // if (!vehicles) {
  //   return <PageLoading />;
  // }

  return (
    <Suspense fallback={<PageLoading />}>
      <List title={t('domain.vehicles')} things={vehicles} />
    </Suspense>
  );
};

export default Vehicles;
