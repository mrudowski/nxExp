export type AtlasTile = {
  x: number;
  y: number;
  name: string;
};

export type AtlasTileSet = {
  id: string;
  name: string;
  desc: string;
  image: string;
  scale: number;
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
    id: 'tinyBlock',
    name: 'tinyBlock',
    desc: '@danimaccari -> https://dani-maccari.itch.io/',
    image: `/assets/tinyBlocks/tinyBlocks_NOiL.png`,
    scale: 4,
    width: 180,
    height: 160,
    tileWidth: 16,
    tileHeight: 18,
    tileWidthFrame: 18,
    tileHeightFrame: 18,
    tiles: [
      {
        x: 4,
        y: 1,
        name: 'grass',
      },
    ],
  },
];
