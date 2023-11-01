import {useQuery} from '@tanstack/react-query';

import {swApiListQuery} from '../queries/queries.ts';

export const useListQuery = (url: string) => {
  return useQuery(swApiListQuery(url));
};
