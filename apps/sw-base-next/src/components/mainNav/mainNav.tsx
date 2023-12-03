import {ROUTES} from '@nx-exp/sw-base-tools';
import {getTranslations} from 'next-intl/server';

import NavItem from './NavItem.tsx';

export default async function MainNav() {
  const t = await getTranslations('domain');
  return (
    <nav>
      <ul>
        <NavItem route={ROUTES.characters} label={t('characters')} />
        <NavItem route={ROUTES.planets} label={t('planets')} />
        <NavItem route={ROUTES.vehicles} label={t('vehicles')} />
      </ul>
      {/*<DarkModeSwitch /> TODO */}
    </nav>
  );
}
