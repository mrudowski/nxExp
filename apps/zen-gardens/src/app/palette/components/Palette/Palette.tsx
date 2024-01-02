import {Paper, ScrollArea, Select} from '@mantine/core';

import PaletteTile from '@/app/palette/components/PaletteTile/PaletteTile.tsx';
import {AtlasTileSet} from '@/data/atlas.ts';

import styles from './styles.module.scss';

interface PaletteProps {
  tileSet: AtlasTileSet;
}

const Palette = ({tileSet}: PaletteProps) => {
  return (
    <Paper p="md" className={styles.palette}>
      <Select data={['React']} allowDeselect={false} searchable={true} nothingFoundMessage="Nothing found" />
      <div className={styles.tileSetInfo}>
        <span>Tile size:</span> {tileSet.tileWidth}x{tileSet.tileHeight}
      </div>
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
