import {useAtomValue} from 'jotai';

import Level from '@/app/scene/components/Level/Level.tsx';
import {tileSetAtom} from '@/stateAtoms/paletteAtoms.ts';
import {sceneLevelsAtom, sceneScaleAtom, sceneSizeAtom, sceneZoomAtom} from '@/stateAtoms/sceneAtoms.ts';

import styles from './styles.module.scss';

// interface SceneProps {
//   // children: ReactNode;
// }

const Scene = () => {
  const tileSet = useAtomValue(tileSetAtom);
  const sceneScale = useAtomValue(sceneScaleAtom);
  const sceneZoom = useAtomValue(sceneZoomAtom);

  const widthHalfFlooredNotZoomed = Math.floor(tileSet.tileWidth / 2) * sceneScale;
  const widthHalfFloored = widthHalfFlooredNotZoomed * sceneZoom;
  const heightQuarterFloored = Math.floor(tileSet.tileHeight / 4) * sceneScale * sceneZoom;
  const tilesInRow = useAtomValue(sceneSizeAtom);
  // not very helpful because of React key rule
  // const sceneLevelAtoms = useAtomValue(sceneLevelAtomsAtom);
  const sceneLevels = useAtomValue(sceneLevelsAtom);

  const sceneStyle = {
    width: tilesInRow * tileSet.tileWidth * sceneScale,
    height: tilesInRow * widthHalfFlooredNotZoomed + tileSet.tileHeight * sceneScale - widthHalfFlooredNotZoomed,
  };

  return (
    <div className={styles.scroll}>
      <div className={styles.sceneWrapper}>
        <main className={styles.scene} style={sceneStyle}>
          {sceneLevels.map(sceneLevel => (
            <Level
              id={sceneLevel.id}
              key={sceneLevel.id}
              tilesInRow={tilesInRow}
              filledSlots={sceneLevel.slots}
              tileSet={tileSet}
              boardWidth={sceneStyle.width}
              tileScale={sceneScale * sceneZoom}
              widthHalfFloored={widthHalfFloored}
              heightQuarterFloored={heightQuarterFloored}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Scene;
