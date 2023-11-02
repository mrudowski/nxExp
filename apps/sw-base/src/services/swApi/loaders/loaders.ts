import {QueryClient} from '@tanstack/react-query';
import {Params} from 'react-router-dom';

import {DetailPageParams} from '@/router/types.ts';

import {swApiListQuery, swApiThingQuery} from '../queries/queries.ts';
import {getThingQueryUrl} from '../utils.ts';

// real answer to react router loader params
// https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
export const thingLoader =
  (queryClient: QueryClient, url: string) =>
  async ({params}: {params: Params}) => {
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
