import {ROUTES} from '@nx-exp/sw-base-tools';

import {getDictionary} from '@/i18n/dictionaries.js';

import NavItem from './NavItem.tsx';

export default async function MainNav() {
  const dict = await getDictionary();
  return (
    <nav>
      <ul>
        <NavItem route={ROUTES.characters} label={dict.domain.characters} />
        <NavItem route={ROUTES.planets} label={dict.domain.planets} />
        <NavItem route={ROUTES.vehicles} label={dict.domain.vehicles} />
      </ul>
      {/*<DarkModeSwitch /> TODO */}
    </nav>
  );
}
