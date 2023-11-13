import styles from './Breakouts.module.scss';

function Breakouts() {
  return (
    <main className={styles.breakouts}>
      <h1>Some Heading</h1>
      <p>Some content and stuff</p>
      <img className="full-bleed" alt="cute meerkat" src="/asets.jpg" />
    </main>
  );
}

export default Breakouts;
