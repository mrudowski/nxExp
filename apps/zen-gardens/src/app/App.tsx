// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import Palette from '@/app/palette/components/Palette/Palette.tsx';
import Scene from '@/app/scene/components/Scene/Scene';
import ColorSchemeSwitch from '@/components/ColorSchemeSwitch/ColorSchemeSwitch.tsx';
import {atlas} from '@/data/atlas.ts';

import styles from './style.module.scss';

const tilesInRow = 5;
const tileSet = atlas[0];

export function App() {
  return (
    <div className={styles.app}>
      <Palette tileSet={tileSet} />
      <div className={styles.main}>
        <ColorSchemeSwitch />
        <Scene tilesInRow={tilesInRow} tileSet={tileSet} />
      </div>
    </div>
  );
}

export default App;
