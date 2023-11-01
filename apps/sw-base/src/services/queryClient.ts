import {QueryClient} from '@tanstack/react-query';

import {QUERY_CLIENT_DEFAULT_GC_TIME, QUERY_CLIENT_DEFAULT_STALE_TIME} from './constants.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: QUERY_CLIENT_DEFAULT_GC_TIME,
      staleTime: QUERY_CLIENT_DEFAULT_STALE_TIME,
      retry: 0, // ky will handle this
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
