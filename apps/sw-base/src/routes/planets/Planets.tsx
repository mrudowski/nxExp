import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {getPlanetRoute} from '@/router/utils.ts';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useSuspenseListQuery} from '@/services/swApi/hooks/useSuspenseListQuery.ts';

const Planets = () => {
  const {t} = useTranslation();

  const {data: planets} = useSuspenseListQuery(SW_API_URLS.planets);

  // thanks to react router loader it won't happen
  // if (!planets) {
  //   return <PageLoading />;
  // }

  return (
    <Suspense fallback={<PageLoading />}>
      <List title={t('domain.planets')} things={planets} getRoute={getPlanetRoute} />
    </Suspense>
  );
};

export default Planets;
