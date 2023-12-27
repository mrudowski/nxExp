// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import Palette from '@/components/Palette/Palette.tsx';
import Scene from '@/components/Scene/Scene';
import {atlas} from '@/data/atlas.ts';

import styles from './style.module.scss';

const tilesInRow = 5;
const tileSet = atlas[0];

export function App() {
  return (
    <div className={styles.app}>
      <Palette tileSet={tileSet} />
      <Scene tilesInRow={tilesInRow} tileSet={tileSet} />
    </div>
  );
}

export default App;
