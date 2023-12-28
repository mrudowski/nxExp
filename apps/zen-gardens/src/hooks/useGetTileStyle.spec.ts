import {renderHook} from '@testing-library/react';

import {atlas} from '@/data/atlas.ts';
import useGetTileStyle from '@/hooks/useGetTileStyle.ts';

/**
 * https://testing-library.com/docs/react-testing-library/api#renderhook
 */

describe('useGetTileStyle', () => {
  it('to return something', () => {
    const {result} = renderHook(() =>
      useGetTileStyle({
        tileSet: atlas[0],
        tile: atlas[0].tiles[0],
        tileWidthScaled: 32,
        tileHeightScaled: 32,
        tileScale: 2,
      })
    );
    console.log(result.current);
    expect(result.current).toEqual({
      '--width': '32px',
      '--height': '32px',
      '--imageUrl': 'url(/assets/tinyBlocks/tinyBlocks_NOiL.png)',
      '--imagePosition': '-2px -36px',
      '--imageSize': '360px auto',
    });
  });
});
