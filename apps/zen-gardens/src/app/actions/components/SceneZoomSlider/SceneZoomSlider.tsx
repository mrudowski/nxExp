import {Slider, SliderProps} from '@mantine/core';
import {useAtom} from 'jotai';

import {sceneZoomAtom} from '@/stateAtoms/sceneAtoms.ts';

import styles from './styles.module.scss';

// const marks: SliderProps['marks'] = [{value: 1}, {value: 6, label: ''}];

const label: SliderProps['label'] = value => `Zoom: ${value}`;

const SceneZoomSlider = () => {
  const [sceneZoom, setSceneZoom] = useAtom(sceneZoomAtom);

  return (
    <Slider
      w={60}
      size="xs"
      thumbSize={14}
      // marks={marks}
      min={1}
      max={4}
      step={1}
      label={label}
      value={sceneZoom}
      onChange={setSceneZoom}
      className={styles.sceneZoomSlider}
    />
  );
};

export default SceneZoomSlider;
