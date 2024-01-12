import {useSetAtom} from 'jotai';
import {Fragment, memo, useCallback, useMemo} from 'react';

import Slot from '@/app/scene/components/Slot/Slot.tsx';
import {getSlotsRangeFromAxisLabelId} from '@/app/scene/utils.ts';
import {AtlasTileSet} from '@/data/types.ts';
import {Scene, sceneLevelTileAtom} from '@/stateAtoms/sceneAtoms.ts';

import AxisLabel from '../AxisLabel/AxisLabel';
import styles from './styles.module.scss';

interface LevelProps {
  id: number;
  tileSet: AtlasTileSet;
  filledSlots: Scene['levels'][number]['slots'];
  // sceneLevelAtom: Atom<SceneAtom['levels'][number]>;
  tilesInRow: number;
  boardWidth: number;
  tileScale: number;
  widthHalfFloored: number;
  heightQuarterFloored: number;
}

const SlotMemorized = memo(Slot);
const AxisLabelMemorized = memo(AxisLabel);

interface Slot {
  x: number;
  y: number;
  id: string;
  axis: 'x' | 'y' | 'xy' | null;
}

const getSlots = (tilesInRow: number): Slot[] => {
  const data = [];
  for (let y = 0; y < tilesInRow; y++) {
    for (let x = 0; x < tilesInRow; x++) {
      data.push({
        x,
        y,
        id: `${x},${y}`,
        axis: null,
      });
    }
  }
  // add one more x asis
  for (let x = 0; x < tilesInRow; x++) {
    const y = tilesInRow;
    data.push({
      x,
      y,
      id: `${x},${y}`,
      axis: 'x' as const,
    });
  }
  // and one more for y axis
  for (let y = 0; y < tilesInRow; y++) {
    const x = tilesInRow;
    data.push({
      x,
      y,
      id: `${x},${y}`,
      axis: 'y' as const,
    });
  }
  // and the last one on the very bottom for special operation
  const y = tilesInRow;
  const x = tilesInRow;
  data.push({
    x,
    y,
    id: `${x},${y}`,
    axis: 'xy' as const,
  });
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
  const setTiles = useSetAtom(sceneLevelTileAtom);

  const slots = useMemo(() => {
    return getSlots(tilesInRow);
  }, [tilesInRow]);

  const start = boardWidth / 2 - widthHalfFloored;

  const handleSlotInteraction = useCallback(
    (slotId: string) => {
      setTiles({slotsIds: [slotId], levelId: id});
    },
    [setTiles, id]
  );

  const handleAxisInteraction = useCallback(
    (axisLabelId: string) => {
      const slotsIds = getSlotsRangeFromAxisLabelId(axisLabelId);
      setTiles({slotsIds, levelId: id});
    },
    [setTiles, id]
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

        return (
          <Fragment key={slot.id}>
            {slot.axis ? (
              <AxisLabelMemorized
                id={slot.id}
                x={x}
                y={y}
                tileScale={tileScale}
                axis={slot.axis}
                value={slot.axis === 'x' ? slot.x : slot.y}
                tilesInRow={tilesInRow}
                //value={slot.axis === 'x' ? slot.x : slot.y}
                onInteraction={handleAxisInteraction}
              />
            ) : (
              <SlotMemorized
                id={slot.id}
                x={x}
                y={y}
                tileScale={tileScale}
                tile={tile}
                onInteraction={handleSlotInteraction}
              />
            )}
          </Fragment>
        );
      })}
    </section>
  );
};

export default Level;
