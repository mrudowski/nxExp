import {useSuspenseQuery} from '@tanstack/react-query';

import {swApiListQuery} from '../queries/queries.ts';

export const useSuspenseListQuery = (url: string) => {
  // we use suspense here only as exercise
  // when useSuspenseQuery data is always defined, but we can't use enable
  return useSuspenseQuery(swApiListQuery(url));
};
