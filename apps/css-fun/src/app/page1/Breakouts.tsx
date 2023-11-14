import {clsx} from 'clsx';

import styles from './Breakouts.module.scss';

function Breakouts() {
  return (
    <main className={styles.resizer}>
      <article className={styles.wrapper}>
        <h1>Some Heading</h1>
        <p>Some content and stuff</p>
        <img className={styles.fullBleed} alt="green leafs" src="/leafs.jpg" />
      </article>

      <article className={styles.content}>
        <h1>Some Heading</h1>
        <p>Some content and stuff</p>
        <p className={styles.popout}>Some popout stuff</p>
        <p>Some content and stuff</p>
        <p className={styles.feature}>Some feature stuff</p>
        <p>Some content and stuff</p>
        <p className={styles.full}>Some full stuff</p>
        <section className={clsx(styles.full, styles.content)}>
          <p>Some full stuff</p>
        </section>
        <p>Some content and stuff</p>
      </article>
    </main>
  );
}

export default Breakouts;
