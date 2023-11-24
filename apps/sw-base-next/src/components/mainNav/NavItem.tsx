'use client';

import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {RouteId} from '@/types/types.ts';

import styles from '../../app/layout.module.scss';

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
