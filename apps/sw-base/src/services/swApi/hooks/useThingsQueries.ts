import {useQueries} from '@tanstack/react-query';

import {fetchThing} from '@/services/swApi/swApi.ts';

import {SWAbstractThing} from '../types.ts';

const isThing = (thing: SWAbstractThing | undefined): thing is SWAbstractThing => {
  return !!thing;
};

const useThingsQueries = (urlOrUrls: string | string[]) => {
  const urls = Array.isArray(urlOrUrls) ? urlOrUrls : [urlOrUrls];
  return useQueries({
    queries: urls.map(url => {
      return {
        queryKey: [url],
        queryFn: async () => fetchThing(url),
        // enabled: !!urls,
      };
    }),
    combine: results => {
      return {
        data: results.map(result => result.data).filter(isThing),
        pending: results.some(result => result.isPending),
        isError: results.some(result => result.isError),
        isSuccess: results.every(result => result.isSuccess),
      };
    },
  });
};

export default useThingsQueries;
