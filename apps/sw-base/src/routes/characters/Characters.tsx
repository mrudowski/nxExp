import {useTranslation} from 'react-i18next';

import List from '../../components/List/List.tsx';
import PageLoading from '../../components/PageLoading/PageLoading.tsx';
import {SW_API_URLS} from '../../services/swApi/constants.ts';
import {useListQuery} from '../../services/swApi/hooks/useListQuery.ts';

const Characters = () => {
  const {t} = useTranslation();

  const {data: characters} = useListQuery(SW_API_URLS.characters);

  // thanks to react router loader it won't happen
  if (!characters) {
    return <PageLoading />;
  }

  return <List title={t('domain.characters')} things={characters} />;
};

export default Characters;
