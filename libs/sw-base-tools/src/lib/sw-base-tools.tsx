import styles from './sw-base-tools.module.scss';

/* eslint-disable-next-line */
export interface SwBaseToolsProps {}

export function SwBaseTools(props: SwBaseToolsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SwBaseTools!</h1>
    </div>
  );
}

export default SwBaseTools;
