import {UnstyledButton} from '@mantine/core';
import clsx from 'clsx';
import {useAtom, useAtomValue} from 'jotai';

import Sprite from '@/components/Sprite/Sprite.tsx';
import Tooltip from '@/components/Tooltip/Tooltip.tsx';
import {AtlasTile} from '@/data/types.ts';
import useGetTileStyle from '@/hooks/useGetTileStyle.ts';
import {
  selectedPaletteTilesAtom,
  tileHeightPaletteScaledAtom,
  tileSetAtom,
  tileWidthPaletteScaledAtom,
} from '@/stateAtoms/paletteAtoms.ts';

import styles from './styles.module.scss';

interface PaletteTileProps {
  tile: AtlasTile;
}

const PaletteTile = ({tile}: PaletteTileProps) => {
  // TODO should we move it to parent?
  const tileSet = useAtomValue(tileSetAtom);
  const tileWidthScaled = useAtomValue(tileWidthPaletteScaledAtom);
  const tileHeightScaled = useAtomValue(tileHeightPaletteScaledAtom);
  const [selectedTiles, setSelectedTile] = useAtom(selectedPaletteTilesAtom);

  const tileStyle = useGetTileStyle({
    tile,
    tileSet,
    tileWidthScaled,
    tileHeightScaled,
    tileScale: tileSet.paletteScale,
  });

  const active = selectedTiles.includes(tile.id);

  const className = clsx(styles.paletteTile, active && styles.active);

  const handleClick = () => {
    // TODO add cmd
    setSelectedTile(prevState => {
      const index = prevState.indexOf(tile.id);
      if (index > -1) {
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
      }
      return [...prevState, tile.id];
    });
  };

  return (
    <Tooltip label={tile.name}>
      <UnstyledButton className={className} style={tileStyle} onClick={handleClick}>
        <Sprite />
      </UnstyledButton>
    </Tooltip>
  );
};

export default PaletteTile;
