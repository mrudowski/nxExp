import {useSuspenseQuery} from '@tanstack/react-query';

import {swApiListQuery} from '../queries/queries.ts';

export const useSuspenseListQuery = (url: string) => {
  // when useSuspenseQuery data is always defined, but we can use enable
  return useSuspenseQuery(swApiListQuery(url));
  // return useQuery(swApiListQuery(url));
};
