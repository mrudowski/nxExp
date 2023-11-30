import {getPlanetRoute, SW_API_URLS, useSuspenseListQuery} from '@nx-exp/sw-base-tools';
import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';

const PlanetsList = () => {
  const {t} = useTranslation();
  const {data: planets} = useSuspenseListQuery(SW_API_URLS.planets);

  return <List title={t('domain.planets')} things={planets} getRoute={getPlanetRoute} />;
};

const Planets = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <PlanetsList />
    </Suspense>
  );
};

export default Planets;
