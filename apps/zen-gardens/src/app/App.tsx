// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import ColorSchemeSwitch from '@/components/ColorSchemeSwitch/ColorSchemeSwitch.tsx';

import ModeSwitch from './actions/components/ModeSwitch/ModeSwitch';
import SceneScaleSwitch from './actions/components/SceneScaleSwitch/SceneScaleSwitch.tsx';
import SceneSizeSwitch from './actions/components/SceneSizeSwitch/SceneSizeSwitch.tsx';
import Info from './info/components/Info/Info.tsx';
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
          <ModeSwitch />
          <ColorSchemeSwitch />
        </div>
        <Scene />
        <div className={styles.actionsBottom}>
          <div className={styles.sceneSizeAndScale}>
            <SceneSizeSwitch />
            <SceneScaleSwitch />
          </div>
          <span>TODO view options</span>
        </div>
      </div>
      <Info />
    </div>
  );
}

export default App;
