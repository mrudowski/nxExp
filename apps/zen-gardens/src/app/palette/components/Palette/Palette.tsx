import {Paper, ScrollArea, Select} from '@mantine/core';

import PaletteTile from '@/app/palette/components/PaletteTile/PaletteTile.tsx';
import {atlas} from '@/data/atlas.ts';
import {getAtlas} from '@/data/getAtlas.ts';
import {AtlasTileSet} from '@/data/types.ts';

import styles from './styles.module.scss';

interface PaletteProps {
  tileSet: AtlasTileSet;
}

const selectData: {value: string; label: string}[] = getAtlas(atlas).map(tileSet => ({
  value: tileSet.id + '',
  label: tileSet.name,
}));

const Palette = ({tileSet}: PaletteProps) => {
  return (
    <Paper className={styles.palette}>
      <Select
        data={selectData}
        value={'0'}
        allowDeselect={false}
        // searchable={true}
        nothingFoundMessage="Nothing found"
      />
      <dl className={styles.tileSetInfo}>
        <dt>{tileSet.desc}</dt>
        <dt>Tile size:</dt>
        <dd>
          {tileSet.tileWidth}x{tileSet.tileHeight}
        </dd>
      </dl>
      <ScrollArea>
        <div className={styles.tiles}>
          {tileSet.tilesGroups.map(tilesGroup => {
            return (
              <div key={tilesGroup.name}>
                <h3>{tilesGroup.name}</h3>
                {tilesGroup.tiles.map(tile => {
                  return <PaletteTile key={tile.id} tile={tile} />;
                })}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default Palette;
