import {fetchList, fetchThing} from '../swApi.ts';
import {SWAbstractThing} from '../types.ts';
import {compareByName} from './utils.ts';

export const swApiThingQuery = <T extends SWAbstractThing>(url: string) => ({
  queryKey: [url],
  queryFn: async () => fetchThing<T>(url),
});

export const swApiListQuery = (url: string) => ({
  queryKey: [url],
  queryFn: async () => fetchList(url),
  select: (data: SWAbstractThing[]) => data.sort(compareByName),
});
