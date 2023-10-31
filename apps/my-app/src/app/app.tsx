// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NxWelcome from './nx-welcome';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.test}>
      <NxWelcome title="my-app" />
    </div>
  );
}

export default App;
