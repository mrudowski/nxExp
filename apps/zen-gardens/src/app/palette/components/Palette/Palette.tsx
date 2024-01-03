import {Paper, ScrollArea, Select} from '@mantine/core';

import PaletteTile from '@/app/palette/components/PaletteTile/PaletteTile.tsx';
import {atlas, AtlasTileSet} from '@/data/atlas.ts';

import styles from './styles.module.scss';

interface PaletteProps {
  tileSet: AtlasTileSet;
}

const selectData: {value: string; label: string}[] = atlas.map(tileSet => ({
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
        searchable={true}
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
          {tileSet.tiles.map(tile => {
            return <PaletteTile key={tile.name} tile={tile} />;
          })}
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default Palette;
