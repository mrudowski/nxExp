import swApi from '../ky.ts';
import {SWAbstractThing} from './types.ts';

export const fetchThing = async <T extends SWAbstractThing>(url: string): Promise<T> => {
  return await swApi.get(url).json();
};

export const fetchList = async (url: string): Promise<SWAbstractThing[]> => {
  return await swApi.get(url).json();
};
