import {useAtomValue} from 'jotai/index';

import {AtlasTile} from '@/data/atlas.ts';
import useGetTileStyle from '@/hooks/useGetTileStyle.ts';
import {tileHeightPaletteScaledAtom, tileSetAtom, tileWidthPaletteScaledAtom} from '@/state/atlasAtom.ts';

import styles from './styles.module.scss';

interface PaletteTileProps {
  tile: AtlasTile;
}

const PaletteTile = ({tile}: PaletteTileProps) => {
  const tileSet = useAtomValue(tileSetAtom);
  const tileWidthScaled = useAtomValue(tileWidthPaletteScaledAtom);
  const tileHeightScaled = useAtomValue(tileHeightPaletteScaledAtom);

  const tileStyle = useGetTileStyle({
    tile,
    tileSet,
    tileWidthScaled,
    tileHeightScaled,
    tileScale: tileSet.paletteScale,
  });

  return (
    <div className={styles.tile} style={tileStyle}>
      <div className={styles.img} />
      <div>{tile.name}</div>
    </div>
  );
};

export default PaletteTile;
