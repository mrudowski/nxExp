import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {RouteId} from '@/router/types.ts';
import {getIdFromUrl, getThingRoute} from '@/router/utils.ts';
import useThingsQueries from '@/services/swApi/hooks/useThingsQueries.ts';
import {SWAbstractThing} from '@/services/swApi/types.ts';

import styles from './ConnectedThings.module.scss';

type ContentProps = {
  route: RouteId;
  things: SWAbstractThing[];
  pending: boolean;
  isError: boolean;
  isSuccess: boolean;
};
const Content = ({route, things, pending, isError, isSuccess}: ContentProps) => {
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
              <Link to={getThingRoute(route, id)}>{thing.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};

type ConnectedThingsProps = {
  title: string;
  route: RouteId;
  urlOrUrls: string | string[];
};

const ConnectedThings = ({title, route, urlOrUrls}: ConnectedThingsProps) => {
  const {data: things, pending, isSuccess, isError} = useThingsQueries(urlOrUrls);

  return (
    <section className={styles.connectedThings}>
      <h3>{title}</h3>
      <Content route={route} things={things} pending={pending} isSuccess={isSuccess} isError={isError} />
    </section>
  );
};

export default ConnectedThings;
