import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';

import List from '@/components/List/List.tsx';
import PageLoading from '@/components/PageLoading/PageLoading.tsx';
import {getCharacterRoute} from '@/router/utils.ts';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {useSuspenseListQuery} from '@/services/swApi/hooks/useSuspenseListQuery.ts';

const CharactersList = () => {
  const {t} = useTranslation();
  // when useSuspenseQuery data is always defined - because while pending we display Suspense
  const {data: characters} = useSuspenseListQuery(SW_API_URLS.characters);

  return <List title={t('domain.characters')} things={characters} getRoute={getCharacterRoute} />;
};

const Characters = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <CharactersList />
    </Suspense>
  );
};

export default Characters;
