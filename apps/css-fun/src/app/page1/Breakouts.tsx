import clsx from 'clsx';

import styles from './Breakouts.module.scss';
import pageStyles from './Page.module.scss';

function Breakouts() {
  return (
    <main className={styles.resizer}>
      <article className={styles.wrapper}>
        <h1 className={pageStyles.header}>
          Some Heading <span>1</span>
        </h1>
        <p>Some content and stuff</p>
        <img className={styles.fullBleed} alt="green leafs" src="/leafs.jpg" />
      </article>

      <article className={styles.content}>
        <h1>Some Heading</h1>
        <p className={pageStyles.textWrap}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
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
