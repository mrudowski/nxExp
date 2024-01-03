export type AtlasTile = {
  x: number;
  y: number;
  name: string;
};

export type AtlasTileSet = {
  id: number;
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
  tiles: AtlasTile[];
};

export type Atlas = AtlasTileSet[];

export const atlas: Atlas = [
  {
    id: 0,
    name: 'tiny Blocks',
    desc: 'by dani maccari',
    image: `/assets/tinyBlocks/tinyBlocks_NOiL.png`,
    sceneScale: 6,
    paletteScale: 2,
    width: 180,
    height: 160,
    tileWidth: 16,
    tileHeight: 18,
    tileWidthFrame: 18,
    tileHeightFrame: 18,
    tiles: [
      {
        x: 0,
        y: 1,
        name: 'grass',
      },
      {
        x: 2,
        y: 1,
        name: 'grass sm',
      },
      {
        x: 0,
        y: 2,
        name: 'sand',
      },
      {
        x: 4,
        y: 1,
        name: 'snow',
      },
      {
        x: 4,
        y: 2,
        name: 'water',
      },
    ],
  },
];
