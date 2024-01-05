import {Slider, SliderProps} from '@mantine/core';
import {useAtom, useAtomValue} from 'jotai';

import {tileSetAtom} from '@/stateAtoms/paletteAtoms.ts';
import {sceneScaleAtom} from '@/stateAtoms/sceneAtoms.ts';

import styles from './styles.module.scss';

// const marks: SliderProps['marks'] = [{value: 1}, {value: 6, label: ''}];

const label: SliderProps['label'] = value => `Scene scale: ${value}`;

const SceneZoomSlider = () => {
  const [sceneScale, setSceneScale] = useAtom(sceneScaleAtom);
  const tileSet = useAtomValue(tileSetAtom);

  return (
    <Slider
      w={60}
      size="xs"
      thumbSize={14}
      // marks={marks}
      min={tileSet.sceneScaleRange.at(0)}
      max={tileSet.sceneScaleRange.at(-1)}
      step={2}
      label={label}
      value={sceneScale}
      onChange={setSceneScale}
      className={styles.sceneZoomSlider}
    />
  );
};

export default SceneZoomSlider;
