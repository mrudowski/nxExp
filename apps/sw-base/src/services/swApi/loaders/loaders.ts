import {QueryClient} from '@tanstack/react-query';

import {DetailPageParams} from '@/router/types.ts';

import {swApiListQuery, swApiThingQuery} from '../queries/queries.ts';
import {getThingQueryUrl} from '../utils.ts';

export const thingLoader =
  (queryClient: QueryClient, url: string) =>
  async ({params}) => {
    const query = swApiThingQuery(getThingQueryUrl(url, (params as DetailPageParams).id));
    // ⬇️ return data or fetch it
    // https://tkdodo.eu/blog/react-query-meets-react-router#getquerydata--fetchquery
    // fetchQuery is the best option. Note that prefetchQuery doesn't return anything and catches errors internally
    // return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
    return await queryClient.ensureQueryData(query);
  };

export const listLoader = (queryClient: QueryClient, url: string) => async () => {
  const query = swApiListQuery(url);
  return await queryClient.ensureQueryData(query);
};
