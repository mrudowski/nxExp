import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useListQuery} from '@/services/swApi/hooks/useListQuery.ts';

const Planets = () => {
  const {t} = useTranslation();

  const {data: planets} = useListQuery(SW_API_URLS.planets);

  // thanks to react router loader it won't happen
  if (!planets) {
    return <PageLoading />;
  }

  return <List title={t('domain.planets')} things={planets} />;
};

export default Planets;
