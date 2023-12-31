import {Avatar, getIdFromUrl, SWAbstractThing} from '@nx-exp/sw-base-tools';
import Link from 'next/link';

import styles from './List.module.scss';

type ListProps = {
  title: string;
  things: SWAbstractThing[];
  getRoute: (id: string) => string;
};
const List = ({title, things, getRoute}: ListProps) => {
  return (
    <article>
      <h2>
        {title} <small>({things.length})</small>
      </h2>
      <div className={styles.list}>
        {things.map(thing => {
          const id = getIdFromUrl(thing.url);
          return (
            <Link key={id} href={getRoute(id)} className={styles.listItem}>
              <Avatar name={thing.name} size="sm" />
              <span>{thing.name}</span>
            </Link>
          );
        })}
      </div>
    </article>
  );
};

export default List;
