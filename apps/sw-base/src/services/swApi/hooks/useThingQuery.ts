import {useQuery} from '@tanstack/react-query';

import {swApiThingQuery} from '../queries/queries.ts';
import {SWAbstractThing} from '../types.ts';

export const useThingQuery = <T extends SWAbstractThing>(url: string) => {
  return useQuery<T>(swApiThingQuery(url));
};
