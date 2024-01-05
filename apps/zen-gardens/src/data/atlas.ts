import {_Atlas} from '@/data/types.ts';

export const atlas: _Atlas = [
  {
    name: 'Tiny Blocks',
    desc: 'by dani maccari',
    image: `/assets/tinyBlocks/tinyBlocks_NOiL.png`,
    sceneScale: 6,
    sceneScaleRange: [2, 4, 6],
    paletteScale: 2,
    width: 180,
    height: 160,
    tileWidth: 16,
    tileHeight: 18,
    tileWidthFrame: 18,
    tileHeightFrame: 18,
    tilesGroups: [
      {
        name: 'Grass',
        tiles: [
          {
            x: 0,
            y: 1,
            name: '',
          },
          {
            x: 2,
            y: 1,
            name: ' sm',
          },
        ],
      },
      {
        name: 'Sand',
        tiles: [
          {
            x: 0,
            y: 2,
            name: '',
          },
        ],
      },
      {
        name: 'Snow',
        tiles: [
          {
            x: 4,
            y: 1,
            name: '',
          },
          {
            x: 7,
            y: 1,
            name: ' xs',
          },
        ],
      },
      {
        name: 'Water',
        tiles: [
          {
            x: 4,
            y: 2,
            name: '',
          },
        ],
      },
    ],
  },
];
