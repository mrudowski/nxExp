import {Avatar} from '@nx-exp/sw-base-tools';
import {ReactNode} from 'react';

import styles from './Details.module.scss';
import JotaiPlayground from './JotaiPlayground.tsx';

type ListProps = {
  name: string;
  children: ReactNode;
};

const Details = ({name, children}: ListProps) => {
  return (
    <article className={styles.details}>
      <h2>
        <Avatar name={name} /> {name}
      </h2>
      <JotaiPlayground />
      {children}
    </article>
  );
};

export default Details;
