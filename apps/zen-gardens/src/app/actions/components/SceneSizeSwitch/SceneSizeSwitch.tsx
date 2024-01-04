import {Select} from '@mantine/core';
import {ComboboxItem} from '@mantine/core/lib/components/Combobox/Combobox.types';
import {useAtom} from 'jotai';

import Tooltip from '@/components/Tooltip/Tooltip';
import {sceneSizeAtom} from '@/stateAtoms/sceneAtoms.ts';
import {displaySize} from '@/utils/utils.ts';
// import styles from './styles.module.scss';

const selectData: ComboboxItem[] = [3, 5, 8, 12, 16].map(size => ({
  value: size + '',
  label: displaySize(size),
}));

const SceneSizeSwitch = () => {
  const [sceneSize, setSceneSize] = useAtom(sceneSizeAtom);

  return (
    <Tooltip label="Scene size">
      <Select
        data={selectData}
        value={sceneSize + ''}
        onChange={val => {
          if (val) {
            setSceneSize(Number(val));
          }
        }}
        allowDeselect={false}
      />
    </Tooltip>
  );
};

export default SceneSizeSwitch;
