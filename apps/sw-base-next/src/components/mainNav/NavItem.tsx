'use client';

import {RouteId} from '@nx-exp/sw-base-tools';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import styles from '../../app/[locale]/layout.module.scss';

const isActive = (route: RouteId, currentPathName: string) => {
  return `/${route}` === currentPathName;
};

type NavItemProps = {
  route: RouteId;
  label: string;
};
const NavItem = ({route, label}: NavItemProps) => {
  const pathname = usePathname();
  const active = isActive(route, pathname);
  // isPending // TODO?

  return (
    <li>
      <Link
        href={`/${route}`}
        // end={true} // TODO
        className={clsx(styles.navLink, active && styles.active)}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
