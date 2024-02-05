import clsx from 'clsx';
import {useAtomValue} from 'jotai';

import useGetTileStyle from '@/hooks/useGetTileStyle.ts';
import {tileHeightSceneScaledAtom, tileSetAtom, tileWidthSceneScaledAtom} from '@/stateAtoms/paletteAtoms.ts';

import slotStyles from '../Slot/styles.module.scss';
import styles from './styles.module.scss';

const letterA = 'A'.charCodeAt(0);
const getAlphabetLetter = (num: number) => String.fromCharCode(num + letterA);

const SVG_SIZE = 80;
const FIX = 2;
const getPathDef = (axis: AxisLabelProps['axis']) => {
  const pointL = `0,${60 + FIX}`;
  const pointT = `40,${40 + 2 * FIX}`;
  const pointR = `80,${60 + FIX}`;
  const pointB = `40,${80}`;

  if (axis === 'xy') {
    return `M${pointL} ${pointT} ${pointR} ${pointB} z`;
  }
  if (axis === 'x') {
    return `M${pointL} ${pointT} ${pointR} ${pointB}`;
  }
  return `M${pointB} ${pointL} ${pointT} ${pointR}`;
};

interface AxisLabelProps {
  id: string;
  x: number;
  y: number;
  tileScale: number;
  axis: 'x' | 'y' | 'xy';
  value: number;
  tilesInRow: number;
  onInteraction: (id: string) => void;
}

const AxisLabel = ({id, x, y, axis, value, tileScale, tilesInRow, onInteraction}: AxisLabelProps) => {
  // TODO should we move it to parent?
  const tileSet = useAtomValue(tileSetAtom);
  const tileWidthScaled = useAtomValue(tileWidthSceneScaledAtom);
  const tileHeightScaled = useAtomValue(tileHeightSceneScaledAtom);
  // const [selectedTiles] = useAtom(selectedPaletteTilesAtom);

  const tileStyle = useGetTileStyle({tile: null, tileSet, tileWidthScaled, tileHeightScaled, tileScale});

  const tileStyleWithXY = {
    ...tileStyle,
    '--x': `${x}px`,
    '--y': `${y}px`,
  };

  const viewBox = `0 0 ${tileWidthScaled} ${tileHeightScaled}`;
  const transform = `scale(${tileWidthScaled / SVG_SIZE}, ${tileHeightScaled / SVG_SIZE})`;

  const label = axis === 'xy' ? '' : axis === 'x' ? getAlphabetLetter(value) : tilesInRow - value;
  const pathDef = getPathDef(axis);

  const handleClick = () => {
    onInteraction(id);
  };

  return (
    <div className={clsx(slotStyles.slot, styles[axis])} style={tileStyleWithXY} aria-label={`axisLabel-${id}`}>
      <svg viewBox={viewBox} className={slotStyles.hotspot}>
        <g transform={transform} onClick={handleClick} role="button">
          <path className="faceB" d={pathDef} />
        </g>
      </svg>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default AxisLabel;
