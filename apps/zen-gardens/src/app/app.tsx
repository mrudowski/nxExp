// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import Scene from '@/components/Scene/Scene';
import {atlas} from '@/data/atlas.ts';

export function App() {
  return <Scene tilesInRow={5} tileSet={atlas[0]} />;
}

export default App;
