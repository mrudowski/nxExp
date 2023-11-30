export const QUERY_CLIENT_DEFAULT_GC_TIME = 1000 * 60 * 30; // 30 minutes (was 5)

/**
 * With SSR (and react router 6 loaders), we usually want to set some default staleTime
 * above 0 to avoid refetching immediately on the client
 */
export const QUERY_CLIENT_DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5 minutes (was 0)
