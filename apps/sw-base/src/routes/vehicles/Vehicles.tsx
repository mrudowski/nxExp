import {useTranslation} from 'react-i18next';

import List from '../../components/List/List.tsx';
import PageLoading from '../../components/PageLoading/PageLoading.tsx';
import {SW_API_URLS} from '../../services/swApi/constants.ts';
import {useListQuery} from '../../services/swApi/hooks/useListQuery.ts';

const Vehicles = () => {
  const {t} = useTranslation();

  const {data: vehicles} = useListQuery(SW_API_URLS.vehicles);

  // thanks to react router loader it won't happen
  if (!vehicles) {
    return <PageLoading />;
  }

  return <List title={t('domain.vehicles')} things={vehicles} />;
};

export default Vehicles;
