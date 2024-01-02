import {useSetAtom} from 'jotai';
import {memo, useCallback, useMemo} from 'react';

import Slot from '@/app/scene/components/Slot/Slot.tsx';
import {AtlasTileSet} from '@/data/atlas.ts';
import {SceneAtom, sceneLevelTileAtom} from '@/stateAtoms/scene.ts';

import styles from './styles.module.scss';

interface LevelProps {
  id: number;
  tileSet: AtlasTileSet;
  filledSlots: SceneAtom['levels'][number]['slots'];
  // sceneLevelAtom: Atom<SceneAtom['levels'][number]>;
  tilesInRow: number;
  boardWidth: number;
  widthHalfFloored: number;
  heightQuarterFloored: number;
}

const SlotMemorized = memo(Slot);

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

const Level = ({
  id,
  tileSet,
  filledSlots,
  tilesInRow,
  boardWidth,
  widthHalfFloored,
  heightQuarterFloored,
}: LevelProps) => {
  const setTile = useSetAtom(sceneLevelTileAtom);

  const slots = useMemo(() => {
    return getSlots(tilesInRow);
  }, [tilesInRow]);

  const start = boardWidth / 2 - widthHalfFloored;

  const handleInteraction = useCallback(
    (slotId: string) => {
      setTile({slotId, levelId: id});
    },
    [setTile, id]
  );

  return (
    <section className={styles.level}>
      {slots.map(slot => {
        const filledSlot = filledSlots[slot.id];
        const tile = filledSlot ? tileSet.tiles.find(t => t.name === filledSlot.tileName) ?? null : null;
        const x = start + slot.x * widthHalfFloored - slot.y * widthHalfFloored;
        const y = slot.y * heightQuarterFloored + slot.x * heightQuarterFloored;

        return <SlotMemorized key={slot.id} id={slot.id} x={x} y={y} tile={tile} onInteraction={handleInteraction} />;
      })}
    </section>
  );
};

export default Level;
