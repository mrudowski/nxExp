import {Select} from '@mantine/core';
import {useAtom, useAtomValue} from 'jotai';
import {useMemo} from 'react';

import Tooltip from '@/components/Tooltip/Tooltip';
import {tileSetAtom} from '@/stateAtoms/paletteAtoms.ts';
import {sceneScaleAtom} from '@/stateAtoms/sceneAtoms.ts';
// import styles from './styles.module.scss';

const SceneScaleSwitch = () => {
  const [sceneScale, setSceneScale] = useAtom(sceneScaleAtom);
  const tileSet = useAtomValue(tileSetAtom);

  const selectData: string[] = useMemo(() => {
    return tileSet.sceneScaleRange.map(range => range + '');
  }, [tileSet]);
  return (
    <Tooltip label="Scene scale">
      <Select
        w={64}
        size="xs"
        data={selectData}
        value={sceneScale + ''}
        onChange={val => {
          if (val) {
            setSceneScale(Number(val));
          }
        }}
        allowDeselect={false}
      />
    </Tooltip>
  );
};

export default SceneScaleSwitch;
