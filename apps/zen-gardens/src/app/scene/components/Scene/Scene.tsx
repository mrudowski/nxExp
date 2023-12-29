import {useAtomValue} from 'jotai';

import Level from '@/app/scene/components/Level/Level.tsx';
import {AtlasTileSet} from '@/data/atlas.ts';
import {sceneLevelsAtom, sceneSizeAtom} from '@/stateAtoms/scene.ts';

import styles from './styles.module.scss';

interface SceneProps {
  tileSet: AtlasTileSet;
  // children: ReactNode;
}

const Scene = ({tileSet}: SceneProps) => {
  const widthHalfFloored = Math.floor(tileSet.tileWidth / 2) * tileSet.sceneScale;
  const heightQuarterFloored = Math.floor(tileSet.tileHeight / 4) * tileSet.sceneScale;
  const tilesInRow = useAtomValue(sceneSizeAtom);
  // not very helpful because of React key rule
  // const sceneLevelAtoms = useAtomValue(sceneLevelAtomsAtom);
  const sceneLevels = useAtomValue(sceneLevelsAtom);

  const sceneStyle = {
    width: tilesInRow * tileSet.tileWidth * tileSet.sceneScale,
    height: (tilesInRow * (heightQuarterFloored * 5)) / 2,
  };

  return (
    <main className={styles.scene} style={sceneStyle}>
      {sceneLevels.map(sceneLevel => (
        <Level
          id={sceneLevel.id}
          key={sceneLevel.id}
          tilesInRow={tilesInRow}
          filledSlots={sceneLevel.slots}
          tileSet={tileSet}
          boardWidth={sceneStyle.width}
          widthHalfFloored={widthHalfFloored}
          heightQuarterFloored={heightQuarterFloored}
        />
      ))}
    </main>
  );
};

export default Scene;
