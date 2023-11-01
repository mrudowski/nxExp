import {SWAbstractThing} from '../types.ts';

export const compareByName = (a: SWAbstractThing, b: SWAbstractThing) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
