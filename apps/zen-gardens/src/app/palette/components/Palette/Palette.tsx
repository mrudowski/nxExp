import {Paper, ScrollArea, Select} from '@mantine/core';
import {ComboboxItem} from '@mantine/core/lib/components/Combobox/Combobox.types';
import clsx from 'clsx';
import {useAtomValue, useSetAtom} from 'jotai';

import PaletteTile from '@/app/palette/components/PaletteTile/PaletteTile.tsx';
import {atlas} from '@/data/atlas.ts';
import {getAtlas} from '@/data/getAtlas.ts';
import {modeAtom} from '@/stateAtoms/modeAtoms.ts';
import {tileSetAtom, writeActiveTileSetIdAtom} from '@/stateAtoms/paletteAtoms.ts';
import {displaySize} from '@/utils/utils.ts';

import styles from './styles.module.scss';

// interface PaletteProps {
// }

const selectData: ComboboxItem[] = getAtlas(atlas).map(tileSet => ({
  value: tileSet.id + '',
  label: tileSet.name,
}));

const Palette = () => {
  const tileSet = useAtomValue(tileSetAtom);
  const setActiveTileSetId = useSetAtom(writeActiveTileSetIdAtom);
  const disabled = useAtomValue(modeAtom) !== 'paint';

  return (
    <Paper className={styles.palette}>
      <Select
        data={selectData}
        value={tileSet.id + ''}
        onChange={val => {
          if (val) {
            setActiveTileSetId(val);
          }
        }}
        allowDeselect={false}
        // searchable={true}
        nothingFoundMessage="Nothing found"
      />
      <ul className={styles.tileSetInfo}>
        <li>{tileSet.desc}</li>
        <li>
          <span>size:</span> {displaySize(tileSet.tileWidth, tileSet.tileHeight)}
        </li>
      </ul>
      <ScrollArea h={250}>
        <div className={clsx(disabled && styles.disabled)}>
          {tileSet.tilesGroups.map(tilesGroup => {
            return (
              <div key={tilesGroup.name} className={styles.group}>
                <h4>{tilesGroup.name}</h4>
                <section>
                  {tilesGroup.tiles.map(tile => {
                    return <PaletteTile key={tile.id} tile={tile} />;
                  })}
                </section>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default Palette;
