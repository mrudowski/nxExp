import {useAtomValue} from 'jotai/index';

import Sprite from '@/components/Sprite/Sprite.tsx';
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
    <button className={styles.paletteTile} style={tileStyle}>
      <Sprite />
      <div>{tile.name}</div>
    </button>
  );
};

export default PaletteTile;
