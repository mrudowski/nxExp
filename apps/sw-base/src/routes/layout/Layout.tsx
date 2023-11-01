import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {NavLink, Outlet, useNavigation} from 'react-router-dom';

import {ROUTES} from '../../router/ROUTES';
import {RouteId} from '../../router/types';
// import {ROUTES} from '@/router/ROUTES.ts';
// import {RouteId} from '@/router/types.ts';
import styles from './Layout.module.scss';

type NavItemProps = {
  route: RouteId;
};
const NavItem = ({route}: NavItemProps) => {
  const {t} = useTranslation();
  return (
    <li>
      <NavLink
        to={route}
        end={true}
        className={({isActive, isPending}) =>
          classNames(styles.navLink, isActive ? styles.active : isPending ? styles.pending : '')
        }
      >
        {t(`domain.${route}`)}
      </NavLink>
    </li>
  );
};

const Layout = () => {
  const navigation = useNavigation();

  return (
    <div className={styles.appLayout}>
      <header className={classNames(styles.appHeader, navigation.state === 'loading' && styles.appLoading)}>
        <h1>SW BaseExp</h1>
        <nav>
          <ul>
            <NavItem route={ROUTES.characters} />
            <NavItem route={ROUTES.planets} />
            <NavItem route={ROUTES.vehicles} />
          </ul>
        </nav>
      </header>
      <main className={styles.appMain}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
