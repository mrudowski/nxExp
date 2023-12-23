// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import Tile from '@/components/Tile/Tile.tsx';

// ok

export function App() {
  return (
    <div style={{position: 'relative', display: 'flex', flexWrap: 'wrap'}}>
      {Array(64)
        .fill(0)
        .map((el, index) => (
          <Tile key={index} />
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
