import {Details} from '@nx-exp/sw-base-tools';

import CharacterSpecies from '@/components/CharacterSpecies.tsx';
import {getDictionary} from '@/i18n/dictionaries.js';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {CharacterType} from '@/services/swApi/types.ts';
import {getThingQueryUrl} from '@/services/swApi/utils.ts';
import {RouteId} from '@/types/types.ts';

async function getData(domain: RouteId, id: string): Promise<CharacterType> {
  const res = await fetch(getThingQueryUrl(SW_API_URLS[domain], id));
  const dict = await getDictionary();
  if (!res.ok) {
    // TODO try it
    throw new Error(dict.errors.problemWhileFetching);
  }
  return res.json();
}

export default async function Thing({params: {domain, id}}: {params: {domain: RouteId; id: string}}) {
  const thing = await getData(domain, id);
  const dict = await getDictionary();

  return (
    <Details name={thing.name}>
      {domain === 'characters' && (
        <p>
          {dict.domain.species}: {thing.species.length === 0 ? '–' : <CharacterSpecies urls={thing.species} />}
        </p>
      )}
      {/*<ConnectedThings title={t('domain.vehicles')} route={ROUTES.vehicles} urlOrUrls={character.vehicles} />*/}
      {/*<ConnectedThings title={t('domain.planets')} route={ROUTES.planets} urlOrUrls={character.homeworld} />*/}
    </Details>
  );
}
