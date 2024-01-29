import {useAtomValue} from 'jotai';
import {MouseEventHandler} from 'react';

import Sprite from '@/components/Sprite/Sprite.tsx';
import {AtlasTile} from '@/data/types.ts';
import useGetTileStyle from '@/hooks/useGetTileStyle.ts';
import {tileHeightSceneScaledAtom, tileSetAtom, tileWidthSceneScaledAtom} from '@/stateAtoms/paletteAtoms.ts';

import styles from './styles.module.scss';

const SVG_SIZE = 80;
const FIX = 2;

interface SlotProps {
  id: string;
  x: number;
  y: number;
  tileScale: number;
  tile: AtlasTile | null;
  onInteraction: (id: string, finished: boolean) => void;
}

const Slot = ({id, x, y, tile, tileScale, onInteraction}: SlotProps) => {
  // TODO should we move it to parent ?
  const tileSet = useAtomValue(tileSetAtom);
  const tileWidthScaled = useAtomValue(tileWidthSceneScaledAtom);
  const tileHeightScaled = useAtomValue(tileHeightSceneScaledAtom);
  // const [selectedTiles] = useAtom(selectedPaletteTilesAtom);

  const tileStyle = useGetTileStyle({tile, tileSet, tileWidthScaled, tileHeightScaled, tileScale});

  const tileStyleWithXY = {
    ...tileStyle,
    '--x': `${x}px`,
    '--y': `${y}px`,
  };

  const viewBox = `0 0 ${tileWidthScaled} ${tileHeightScaled}`;
  const transform = `scale(${tileWidthScaled / SVG_SIZE}, ${tileHeightScaled / SVG_SIZE})`;

  // const handleClick = () => {
  //   onClick(id);
  // };

  const handleMouseDown = () => {
    onInteraction(id, false);
  };

  const handleMouseEnter: MouseEventHandler<SVGGElement> = e => {
    if (e.buttons) {
      onInteraction(id, false);
    }
  };

  const handleMouseUp = () => {
    onInteraction(id, true);
  };

  return (
    <div className={styles.slot} style={tileStyleWithXY} aria-label={`slot-${id}`}>
      {tile ? <Sprite id={tile.id} className={styles.sprite} /> : null}
      <svg viewBox={viewBox} className={styles.hotspot}>
        <g
          transform={transform}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
          role="button"
        >
          {/*<path className="faceB" d="M40,80 0,60 40,40 80,60 z" />*/}
          {/*<path className="faceBL" d="M0,20 40,0 40,40 0,60 z" />*/}
          {/*<path className="faceBR" d="M40,0 80,20 80,60 40,40 z" />*/}
          <path className="faceFL" d={`M0,${20 - FIX} 40,${40 - 2 * FIX} 40,80 0,${60 + FIX} z`} />
          <path className="faceFR" d={`M40,${40 - 2 * FIX} 80,${20 - FIX} 80,${60 + FIX} 40,80 z`} />
          <path className="faceF" d={`M40,${40 - 2 * FIX} 0,${20 - FIX} 40,0 80,${20 - FIX} z`} />
        </g>
      </svg>
      {/*<span className={styles.label}>[{id}]</span>*/}
    </div>
  );
};

export default Slot;
