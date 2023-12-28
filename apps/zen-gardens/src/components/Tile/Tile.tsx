import {useAtomValue} from 'jotai';

import Sprite from '@/components/Sprite/Sprite.tsx';
import {AtlasTile} from '@/data/atlas.ts';
import useGetTileStyle from '@/hooks/useGetTileStyle.ts';
import {tileHeightSceneScaledAtom, tileSetAtom, tileWidthSceneScaledAtom} from '@/state/atlasAtom.ts';

import styles from './styles.module.scss';

const SVG_SIZE = 80;

interface TileProps {
  id: string;
  x: number;
  y: number;
  tile: AtlasTile;
}

const Tile = ({id, x, y, tile}: TileProps) => {
  const tileSet = useAtomValue(tileSetAtom);
  const tileWidthScaled = useAtomValue(tileWidthSceneScaledAtom);
  const tileHeightScaled = useAtomValue(tileHeightSceneScaledAtom);

  const tileStyle = useGetTileStyle({tile, tileSet, tileWidthScaled, tileHeightScaled, tileScale: tileSet.sceneScale});

  const tileStyleWithXY = {
    ...tileStyle,
    '--x': `${x}px`,
    '--y': `${y}px`,
  };

  const viewBox = `0 0 ${tileWidthScaled} ${tileHeightScaled}`;
  const transform = `scale(${tileWidthScaled / SVG_SIZE}, ${tileHeightScaled / SVG_SIZE})`;

  return (
    <div className={styles.tile} style={tileStyleWithXY}>
      <Sprite className={styles.sprite} />
      <svg viewBox={viewBox} className={styles.hotspot}>
        <g
          transform={transform}
          onClick={() => {
            console.log('TODO');
          }}
        >
          {/*<path className="faceB" d="M40,80 0,60 40,40 80,60 z" />*/}
          {/*<path className="faceBL" d="M0,20 40,0 40,40 0,60 z" />*/}
          {/*<path className="faceBR" d="M40,0 80,20 80,60 40,40 z" />*/}
          <path className="faceFL" d="M0,20 40,40 40,80 0,60 z" />
          <path className="faceFR" d="M40,40 80,20 80,60 40,80 z" />
          <path className="faceF" d="M40,40 0,20 40,0 80,20 z" />
        </g>
      </svg>
      <span>[{id}]</span>
    </div>
  );
};

export default Tile;
