import {expect} from 'vitest';

import {arrayMove} from './levelsUtils.ts';

describe('arrayMove', () => {
  it('Move on the same position', () => {
    const arr = [1, 2, 3];
    const movedArr = arrayMove(arr, 0, 0);
    expect(movedArr).toEqual([1, 2, 3]);
  });
  it('Move right and not mutate or array', () => {
    const arr = [1, 2, 3];
    const movedArr = arrayMove(arr, 0, 1);
    expect(arr).toEqual([1, 2, 3]);
    expect(movedArr).toEqual([2, 1, 3]);
  });
  it('Move on the right', () => {
    const arr = [1, 2, 3];
    const movedArr = arrayMove(arr, 0, 2);
    expect(movedArr).toEqual([2, 3, 1]);
  });
  it('Move on the right out of range', () => {
    const arr = [1, 2, 3];
    const movedArr = arrayMove(arr, 0, 3);
    expect(movedArr).toEqual([2, 3, 1]);
  });
  it('Move left', () => {
    const arr = [1, 2, 3];
    const movedArr = arrayMove(arr, 2, 1);
    expect(movedArr).toEqual([1, 3, 2]);
  });
  it('Move on the left', () => {
    const arr = [1, 2, 3];
    const movedArr = arrayMove(arr, 2, 0);
    expect(movedArr).toEqual([3, 1, 2]);
  });
  it('Move on the left out of range', () => {
    const arr = [1, 2, 3];
    const movedArr = arrayMove(arr, 2, -1);
    expect(movedArr).toEqual([3, 1, 2]);
  });
});
