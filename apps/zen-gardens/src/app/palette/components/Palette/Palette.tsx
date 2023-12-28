import PaletteTile from '@/app/palette/components/PaletteTile/PaletteTile.tsx';
import {AtlasTileSet} from '@/data/atlas.ts';

import styles from './styles.module.scss';

interface PaletteProps {
  tileSet: AtlasTileSet;
}

const Palette = ({tileSet}: PaletteProps) => {
  return (
    <aside className={styles.palette}>
      {tileSet.tiles.map(tile => {
        return <PaletteTile key={tile.name} tile={tile} />;
      })}
    </aside>
  );
};

export default Palette;
