import {UnstyledButton} from '@mantine/core';
import clsx from 'clsx';
import {useAtom, useAtomValue} from 'jotai';

import Sprite from '@/components/Sprite/Sprite.tsx';
import Tooltip from '@/components/Tooltip/Tooltip.tsx';
import {AtlasTile} from '@/data/atlas.ts';
import useGetTileStyle from '@/hooks/useGetTileStyle.ts';
import {tileHeightPaletteScaledAtom, tileSetAtom, tileWidthPaletteScaledAtom} from '@/stateAtoms/atlas.ts';
import {selectedPaletteTilesAtom} from '@/stateAtoms/palette.ts';

import styles from './styles.module.scss';

interface PaletteTileProps {
  tile: AtlasTile;
}

const PaletteTile = ({tile}: PaletteTileProps) => {
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

  const active = selectedTiles.some(
    selectedTile => selectedTile.tileSetId === tileSet.id && selectedTile.tileName === tile.name
  );

  const className = clsx(styles.paletteTile, active && styles.active);

  const handleClick = () => {
    setSelectedTile([{tileSetId: tileSet.id, tileName: tile.name}]);
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
