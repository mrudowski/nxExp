import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {getCharacterRoute} from '@/router/utils.ts';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useSuspenseListQuery} from '@/services/swApi/hooks/useSuspenseListQuery.ts';

const Characters = () => {
  const {t} = useTranslation();

  // when useSuspenseQuery data is always defined, but we can use enable
  const {data: characters} = useSuspenseListQuery(SW_API_URLS.characters);

  // thanks to react router loader it won't happen
  // if (!characters) {
  //   return <PageLoading />;
  // }
  //
  // return <List title={t('domain.characters')} things={characters} />;

  return (
    <Suspense fallback={<PageLoading />}>
      <List title={t('domain.characters')} things={characters} getRoute={getCharacterRoute} />
    </Suspense>
  );
};

export default Characters;
