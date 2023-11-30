'use client';

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
  // getLink: (props: {href: string; label: string}) => ReactNode;
  framework?: 'next';
  pending: boolean;
  isError: boolean;
  isSuccess: boolean;
};
const Content = ({route, things, framework, pending, isError, isSuccess}: ContentProps) => {
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
              {framework === 'next' ? (
                <div>test</div>
              ) : (
                // <NextLink href={getThingRoute(route, id)}>{thing.name}</NextLink>
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
  // getLink: ContentProps['getLink'];
  framework?: ContentProps['framework'];
};

const ConnectedThings = ({title, route, urlOrUrls, framework}: ConnectedThingsProps) => {
  const {data: things, pending, isSuccess, isError} = useThingsQueries(urlOrUrls);

  return (
    <section className={styles.connectedThings}>
      <h3>{title}</h3>
      <Content
        route={route}
        things={things}
        framework={framework}
        pending={pending}
        isSuccess={isSuccess}
        isError={isError}
      />
    </section>
  );
};

export default ConnectedThings;
