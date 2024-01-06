import {useSetAtom} from 'jotai';
import {Fragment, memo, useCallback, useMemo} from 'react';

import Slot from '@/app/scene/components/Slot/Slot.tsx';
import {AtlasTileSet} from '@/data/types.ts';
import {SceneAtom, sceneLevelTileAtom} from '@/stateAtoms/sceneAtoms.ts';

import AxisLabel from '../AxisLabel/AxisLabel';
import styles from './styles.module.scss';

interface LevelProps {
  id: number;
  tileSet: AtlasTileSet;
  filledSlots: SceneAtom['levels'][number]['slots'];
  // sceneLevelAtom: Atom<SceneAtom['levels'][number]>;
  tilesInRow: number;
  boardWidth: number;
  tileScale: number;
  widthHalfFloored: number;
  heightQuarterFloored: number;
}

const SlotMemorized = memo(Slot);
const AxisLabelMemorized = memo(AxisLabel);

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
  tileScale,
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
        const tile = filledSlot
          ? tileSet.tilesGroups.flatMap(tileGroup => tileGroup.tiles).find(t => t.name === filledSlot.tileId) ?? null
          : null;
        const x = start + slot.x * widthHalfFloored - slot.y * widthHalfFloored;
        const y = slot.y * heightQuarterFloored + slot.x * heightQuarterFloored;

        const axisXNumber =
          slot.y === tilesInRow - 1 ? (
            <AxisLabelMemorized
              axis="x"
              value={slot.x}
              x={x + widthHalfFloored / 4}
              y={y + heightQuarterFloored * 3}
              tileSize={heightQuarterFloored * 4}
            />
          ) : null;
        const axisYNumber =
          slot.x === tilesInRow - 1 ? (
            <AxisLabelMemorized
              axis="y"
              value={slot.y}
              x={x + widthHalfFloored * 2 - widthHalfFloored / 2}
              y={y + heightQuarterFloored * 3}
              tileSize={heightQuarterFloored * 4}
            />
          ) : null;

        return (
          <Fragment key={slot.id}>
            {axisXNumber} {axisYNumber}
            <SlotMemorized
              id={slot.id}
              x={x}
              y={y}
              tileScale={tileScale}
              tile={tile}
              onInteraction={handleInteraction}
            />
          </Fragment>
        );
      })}
    </section>
  );
};

export default Level;
