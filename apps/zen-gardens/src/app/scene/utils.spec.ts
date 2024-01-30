import {expect} from 'vitest';

import {getSlotsRangeFromAxisLabelId} from '@/app/scene/utils.ts';

describe('getSlotsRangeFromAxisLabelId', () => {
  it('should return empty array for 0,0', async () => {
    const result = getSlotsRangeFromAxisLabelId('0,0');
    expect(result).toEqual([]);
  });
  it('should return 3 elements for 0,3', async () => {
    const result = getSlotsRangeFromAxisLabelId('0,3');
    expect(result).toEqual(['0,0', '0,1', '0,2']);
  });
  it('should return 3 numbers for 3,0', async () => {
    const result = getSlotsRangeFromAxisLabelId('3,0');
    expect(result).toEqual(['0,0', '1,0', '2,0']);
  });
  it('should return 3*3 elements for 3,3', async () => {
    const result = getSlotsRangeFromAxisLabelId('3,3');
    expect(result).toEqual(['0,0', '1,0', '2,0', '0,1', '1,1', '2,1', '0,2', '1,2', '2,2']);
  });
  it('should return 8 elements for 4,8', async () => {
    const result = getSlotsRangeFromAxisLabelId('4,8');
    expect(result).toEqual(['4,0', '4,1', '4,2', '4,3', '4,4', '4,5', '4,6', '4,7']);
  });
  it('should return 100 elements for 5,100', async () => {
    const result = getSlotsRangeFromAxisLabelId('5,100');
    expect(result.length).toEqual(100);
  });
  it('should return 100 elements for 100,5', async () => {
    const result = getSlotsRangeFromAxisLabelId('100,5');
    expect(result.length).toEqual(100);
  });
});
