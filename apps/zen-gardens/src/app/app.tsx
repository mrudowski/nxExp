// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import Tile from '@/components/Tile/Tile.tsx';
import {atlas} from '@/data/atlas.ts';

export function App() {
  return (
    <div style={{position: 'relative', display: 'flex', flexWrap: 'wrap'}}>
      {Array(64)
        .fill(0)
        .map((el, index) => (
          <Tile key={index} tileSet={atlas[0]} tile={atlas[0].tiles[0]} />
        ))}

      {/*<div style={{position: 'absolute', pointerEvents: 'none', top: (18 * 4) / 4, left: (16 * 4) / 2}}>*/}
      {/*  <Tile />*/}
      {/*</div>*/}
      {/*<div style={{position: 'absolute', pointerEvents: 'none', top: (18 * 4) / 4, left: -(16 * 4) / 2}}>*/}
      {/*  <Tile />*/}
      {/*</div>*/}
      {/*<div style={{position: 'absolute', pointerEvents: 'none', top: (18 * 4) / 2}}>*/}
      {/*  <Tile />*/}
      {/*</div>*/}
    </div>
  );
}

export default App;
