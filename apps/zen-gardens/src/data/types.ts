interface _AtlasTile {
  x: number;
  y: number;
  name: string;
}

interface _AtlasTilesGroup {
  name: string;
  tiles: _AtlasTile[];
}

interface _AtlasTileSet {
  name: string;
  desc: string;
  image: string;
  sceneScale: number;
  paletteScale: number;
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  tileWidthFrame: number;
  tileHeightFrame: number;
  tilesGroups: _AtlasTilesGroup[];
}

export type _Atlas = _AtlasTileSet[];

// - - -

export interface AtlasTile extends _AtlasTile {
  id: string;
}

export interface AtlasTilesGroup extends _AtlasTilesGroup {
  tiles: AtlasTile[];
}

export interface AtlasTileSet extends _AtlasTileSet {
  id: number;
  tilesGroups: AtlasTilesGroup[];
}

export type Atlas = AtlasTileSet[];
