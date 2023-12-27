import Level from '@/components/Level/Level.tsx';
import {AtlasTileSet} from '@/data/atlas.ts';

import styles from './styles.module.scss';

interface SceneProps {
  tileSet: AtlasTileSet;
  tilesInRow: number;
  // children: ReactNode;
}

const Scene = ({tileSet, tilesInRow}: SceneProps) => {
  const widthHalfFloored = Math.floor(tileSet.tileWidth / 2) * tileSet.sceneScale;
  const heightQuarterFloored = Math.floor(tileSet.tileHeight / 4) * tileSet.sceneScale;

  const sceneStyle = {
    width: tilesInRow * tileSet.tileWidth * tileSet.sceneScale,
    height: (tilesInRow * (heightQuarterFloored * 5)) / 2,
  };

  return (
    <main className={styles.scene} style={sceneStyle}>
      <Level
        tilesInRow={tilesInRow}
        tileSet={tileSet}
        boardWidth={sceneStyle.width}
        widthHalfFloored={widthHalfFloored}
        heightQuarterFloored={heightQuarterFloored}
      />
    </main>
  );
};

export default Scene;
