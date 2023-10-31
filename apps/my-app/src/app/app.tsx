import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div className={styles.test}>
      <NxWelcome title="my-app" />
    </div>
  );
}

export default App;
