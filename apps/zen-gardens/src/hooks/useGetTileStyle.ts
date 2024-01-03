import {CSSProperties} from 'react';

import {AtlasTile, AtlasTileSet} from '@/data/types.ts';

export interface TileCssProperties extends CSSProperties {
  '--width': string;
  '--height': string;
  '--imageUrl': string;
  '--imagePosition': string;
  '--imageSize': string;
}
interface useGetTileStyleArgs {
  tileSet: AtlasTileSet;
  tile: AtlasTile | null;
  tileWidthScaled: number;
  tileHeightScaled: number;
  tileScale: number;
}

const useGetTileStyle = ({tileSet, tile, tileWidthScaled, tileHeightScaled, tileScale}: useGetTileStyleArgs) => {
  const backgroundPositionX = getBackgroundPosition(tile?.x ?? 0, tileSet.tileWidthFrame, tileSet.tileWidth, tileScale);
  const backgroundPositionY = getBackgroundPosition(
    tile?.y ?? 0,
    tileSet.tileHeightFrame,
    tileSet.tileHeight,
    tileScale
  );

  const tileStyle: TileCssProperties = {
    '--width': `${tileWidthScaled}px`,
    '--height': `${tileHeightScaled}px`,
    '--imageUrl': `url(${tileSet.image})`,
    '--imagePosition': `${backgroundPositionX}px ${backgroundPositionY}px`,
    '--imageSize': `${tileScale * tileSet.width}px auto`,
  };

  return tileStyle;
};

function getBackgroundPosition(tilePos: number, tileSizeFrame: number, tileSize: number, scale: number) {
  return (-tilePos * tileSizeFrame - (tileSizeFrame - tileSize) / 2) * scale;
}

export default useGetTileStyle;
