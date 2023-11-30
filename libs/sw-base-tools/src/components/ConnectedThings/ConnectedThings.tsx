'use client';

import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

// import {Link} from 'react-router-dom';
import useThingsQueries from '../../services/swApi/hooks/useThingsQueries.ts';
import {SWAbstractThing} from '../../services/swApi/types.ts';
import {RouteId} from '../../types/types.ts';
import {getIdFromUrl, getThingRoute} from '../../utils/utils.ts';
import styles from './ConnectedThings.module.scss';

type ContentProps = {
  route: RouteId;
  things: SWAbstractThing[];
  getLink?: (props: {href: string; label: string}) => ReactNode;
  pending: boolean;
  isError: boolean;
  isSuccess: boolean;
};
const Content = ({route, things, getLink, pending, isError, isSuccess}: ContentProps) => {
  const {t} = useTranslation();
  if (pending) {
    return <>{t('utils.loading')}</>;
  }
  if (isError) {
    return <em>{t('errors.problemWhileFetching')}</em>;
  }
  if (isSuccess && things.length === 0) {
    return <em>–</em>;
  }
  if (isSuccess) {
    return (
      <ul>
        {things.map(thing => {
          const id = getIdFromUrl(thing.url);
          return (
            <li key={id}>
              {getLink ? (
                // next
                getLink({href: getThingRoute(route, id), label: thing.name})
              ) : (
                <Link to={getThingRoute(route, id)}>{thing.name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};

export type ConnectedThingsProps = {
  title: string;
  route: RouteId;
  urlOrUrls: string | string[];
  getLink?: ContentProps['getLink'];
};

const ConnectedThings = ({title, route, urlOrUrls, getLink}: ConnectedThingsProps) => {
  const {data: things, pending, isSuccess, isError} = useThingsQueries(urlOrUrls);

  return (
    <section className={styles.connectedThings}>
      <h3>{title}</h3>
      <Content
        route={route}
        things={things}
        getLink={getLink}
        pending={pending}
        isSuccess={isSuccess}
        isError={isError}
      />
    </section>
  );
};

export default ConnectedThings;
