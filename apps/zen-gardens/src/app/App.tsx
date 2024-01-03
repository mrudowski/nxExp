// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import ColorSchemeSwitch from '@/components/ColorSchemeSwitch/ColorSchemeSwitch.tsx';
import {atlas} from '@/data/atlas.ts';
import {getAtlas} from '@/data/getAtlas.ts';

import ModeSwitch from './actions/components/ModeSwitch/ModeSwitch';
import Palette from './palette/components/Palette/Palette.tsx';
import Scene from './scene/components/Scene/Scene';
import styles from './style.module.scss';

const tileSet = getAtlas(atlas)[0];

export function App() {
  return (
    <div className={styles.app}>
      <Palette tileSet={tileSet} />
      <div className={styles.main}>
        <div className={styles.actions}>
          <ModeSwitch />
          <ColorSchemeSwitch />
        </div>
        <Scene tileSet={tileSet} />
      </div>
    </div>
  );
}

export default App;
