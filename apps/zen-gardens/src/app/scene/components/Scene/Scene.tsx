import {useAtomValue} from 'jotai';
import {useAtom} from 'jotai/index';

import Level from '@/app/scene/components/Level/Level.tsx';
import {sceneActiveLevelAtom, sceneLevelsAtom} from '@/stateAtoms/levels/sceneLevelsAtom.ts';
import {tileSetAtom} from '@/stateAtoms/paletteAtoms.ts';
import {sceneScaleAtom, sceneSizeAtom} from '@/stateAtoms/sceneAtoms.ts';

import styles from './styles.module.scss';

// interface SceneProps {
//   // children: ReactNode;
// }

const MARGIN_TO_FIX_HORIZONTAL_SCROLL = 8;

const Scene = () => {
  const tileSet = useAtomValue(tileSetAtom);
  const sceneScale = useAtomValue(sceneScaleAtom);

  const widthHalfFloored = Math.floor(tileSet.tileWidth / 2) * sceneScale;
  const heightHalfFloored = Math.floor(tileSet.tileHeight / 2) * sceneScale;
  const heightQuarterFloored = Math.floor(tileSet.tileHeight / 4) * sceneScale;
  const tilesInRow = useAtomValue(sceneSizeAtom);
  // not very helpful because of React key rule
  // const sceneLevelAtoms = useAtomValue(sceneLevelAtomsAtom);
  const [activeLevelId] = useAtom(sceneActiveLevelAtom);
  const sceneLevels = useAtomValue(sceneLevelsAtom);

  const numberOfAdditionalLevels = sceneLevels.length - 1;

  const tilesInRowIncludingAxis = tilesInRow + 1;
  const levelHeight = heightHalfFloored + 6;
  const sceneStyle = {
    width: tilesInRowIncludingAxis * tileSet.tileWidth * sceneScale + MARGIN_TO_FIX_HORIZONTAL_SCROLL,
    // TODO width?
    height:
      numberOfAdditionalLevels * levelHeight +
      (tilesInRowIncludingAxis * widthHalfFloored + tileSet.tileHeight * sceneScale - widthHalfFloored),
  };

  return (
    <div className={styles.scroll}>
      <div className={styles.sceneWrapper} style={sceneStyle}>
        <main className={styles.scene} style={sceneStyle}>
          {sceneLevels.map((sceneLevel, index) => (
            <Level
              id={sceneLevel.id}
              active={activeLevelId === sceneLevel.id}
              key={sceneLevel.id}
              top={(numberOfAdditionalLevels - index) * levelHeight}
              // height={sceneStyle.height}
              tilesInRow={tilesInRow}
              filledSlots={sceneLevel.slots}
              tileSet={tileSet}
              boardWidth={sceneStyle.width}
              tileScale={sceneScale}
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
