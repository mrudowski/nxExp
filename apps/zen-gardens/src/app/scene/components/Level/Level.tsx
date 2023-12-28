import {useMemo} from 'react';

import Tile from '@/app/scene/components/Tile/Tile.tsx';
import {AtlasTileSet} from '@/data/atlas.ts';

import styles from './styles.module.scss';

interface LevelProps {
  tileSet: AtlasTileSet;
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

const Level = ({tileSet, tilesInRow, boardWidth, widthHalfFloored, heightQuarterFloored}: LevelProps) => {
  const slots = useMemo(() => {
    return getSlots(tilesInRow);
  }, [tilesInRow]);

  const start = boardWidth / 2 - widthHalfFloored;

  return (
    <section className={styles.level}>
      {slots.map(slot => {
        const x = start + slot.x * widthHalfFloored - slot.y * widthHalfFloored;
        const y = slot.y * heightQuarterFloored + slot.x * heightQuarterFloored;

        return <Tile key={slot.id} id={slot.id} x={x} y={y} tile={tileSet.tiles[0]} />;
      })}
    </section>
  );
};

export default Level;
