import {RouteId, ROUTES} from '@nx-exp/sw-base-tools';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {NavLink, Outlet, useNavigation} from 'react-router-dom';

import DarkModeSwitch from '@/components/DarkModeSwitch/DarkModeSwitch.tsx';

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
          clsx(styles.navLink, isActive ? styles.active : isPending ? styles.pending : '')
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
      <header className={clsx(styles.appHeader, navigation.state === 'loading' && styles.appLoading)}>
        <h1>SW BaseExp</h1>
        <nav>
          <ul>
            <NavItem route={ROUTES.characters} />
            <NavItem route={ROUTES.planets} />
            <NavItem route={ROUTES.vehicles} />
          </ul>
          <DarkModeSwitch />
        </nav>
      </header>
      <main className={styles.appMain}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
