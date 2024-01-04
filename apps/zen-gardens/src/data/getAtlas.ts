import {_Atlas, Atlas} from '@/data/types.ts';

let atlasMemorized: Atlas | null = null;

export const getAtlas = (atlas: _Atlas): Atlas => {
  if (atlasMemorized) return atlasMemorized;
  atlasMemorized = atlas.map((tileSet, tileSetIndex) => {
    return {
      ...tileSet,
      id: tileSetIndex + '',
      tilesGroups: tileSet.tilesGroups.map(tilesGroup => {
        return {
          ...tilesGroup,
          tiles: tilesGroup.tiles.map(tile => {
            const tileName = tilesGroup.name + tile.name;
            return {
              ...tile,
              name: tileName,
              id: tileName,
            };
          }),
        };
      }),
    };
  });
  return atlasMemorized;
};
