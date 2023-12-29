import {useSetAtom} from 'jotai/index';
import {useCallback, useMemo} from 'react';

import Tile from '@/app/scene/components/Tile/Tile.tsx';
import {AtlasTileSet} from '@/data/atlas.ts';
import {SceneAtom, sceneLevelTileAtom} from '@/stateAtoms/scene.ts';

import styles from './styles.module.scss';

interface LevelProps {
  id: number;
  tileSet: AtlasTileSet;
  tiles: SceneAtom['levels'][number]['tiles'];
  // sceneLevelAtom: Atom<SceneAtom['levels'][number]>;
  tilesInRow: number;
  boardWidth: number;
  widthHalfFloored: number;
  heightQuarterFloored: number;
}

const getSlots = (tilesInRow: number) => {
  const data = [];
  for (let y = 0; y < tilesInRow; y++) {
    for (let x = 0; x < tilesInRow; x++) {
      data.push({
        x,
        y,
        id: `${x},${y}`,
      });
    }
  }
  return data;
};

const Level = ({id, tileSet, tiles, tilesInRow, boardWidth, widthHalfFloored, heightQuarterFloored}: LevelProps) => {
  const setTile = useSetAtom(sceneLevelTileAtom);

  const slots = useMemo(() => {
    return getSlots(tilesInRow);
  }, [tilesInRow]);

  const start = boardWidth / 2 - widthHalfFloored;

  const tileSetId = tileSet.id;
  const handleClick = useCallback(
    (slotId: string) => {
      setTile({slotId, levelId: id, tileName: 'grass', tileSetId});
    },
    [setTile, id, tileSetId]
  );

  return (
    <section className={styles.level}>
      {slots.map(slot => {
        const attachedTile = tiles[slot.id];
        const tile = attachedTile ? tileSet.tiles.find(t => t.name === attachedTile.tileName) ?? null : null;
        const x = start + slot.x * widthHalfFloored - slot.y * widthHalfFloored;
        const y = slot.y * heightQuarterFloored + slot.x * heightQuarterFloored;

        return <Tile key={slot.id} id={slot.id} x={x} y={y} tile={tile} onClick={handleClick} />;
      })}
    </section>
  );
};

export default Level;
