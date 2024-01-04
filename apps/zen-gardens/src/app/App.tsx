// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import ColorSchemeSwitch from '@/components/ColorSchemeSwitch/ColorSchemeSwitch.tsx';

import ModeSwitch from './actions/components/ModeSwitch/ModeSwitch';
import SceneSizeSwitch from './actions/components/SceneSizeSwitch/SceneSizeSwitch.tsx';
import Palette from './palette/components/Palette/Palette.tsx';
import Scene from './scene/components/Scene/Scene';
import styles from './style.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <Palette />
      <div className={styles.main}>
        <div className={styles.actionsTop}>
          <ModeSwitch />
          <ColorSchemeSwitch />
        </div>
        <Scene />
        <div className={styles.actionsBottom}>
          <SceneSizeSwitch />
          <span>SceneZoomSlider</span>
        </div>
      </div>
    </div>
  );
}

export default App;
