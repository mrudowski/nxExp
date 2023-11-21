'use client';

import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import styles from '../app/layout.module.scss';
import {ROUTES} from '../constants/ROUTES.ts';
import {RouteId} from '../types/types.ts';

const isActive = (route: RouteId, currentPathName: string) => {
  return `/${route}` === currentPathName;
};

type NavItemProps = {
  route: RouteId; // TODO RouteId;
  active: boolean;
};
const NavItem = ({route, active}: NavItemProps) => {
  // const {t} = useTranslation();
  // isPending // TODO?

  return (
    <li>
      <Link
        href={route}
        // end={true}
        className={clsx(styles.navLink, active && styles.active)}
      >
        {/*{t(`domain.${route}`)} TODO*/}
        {route}
      </Link>
    </li>
  );
};

export default function MainNav() {
  const pathname = usePathname();
  // const router = useRouter();

  return (
    <nav>
      <ul>
        <NavItem route={ROUTES.characters} active={isActive(ROUTES.characters, pathname)} />
        <NavItem route={ROUTES.planets} active={isActive(ROUTES.planets, pathname)} />
        <NavItem route={ROUTES.vehicles} active={isActive(ROUTES.vehicles, pathname)} />
      </ul>
      {/*<DarkModeSwitch /> TODO */}
    </nav>
  );
}
