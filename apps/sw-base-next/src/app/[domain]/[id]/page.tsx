import ConnectedThings from '@libs/sw-base-tools/src/components/ConnectedThings/ConnectedThings.tsx';
import {Details} from '@nx-exp/sw-base-tools';
import {notFound} from 'next/navigation';

import ConnectedThingsWrapper from '@/app/[domain]/[id]/ConnectedThingsWrapper.tsx';
import CharacterSpecies from '@/components/CharacterSpecies.tsx';
import ClientErrorBoundary from '@/components/ClientErrorBoundary.tsx';
import {ROUTES} from '@/constants/ROUTES.ts';
import {getDictionary} from '@/i18n/dictionaries.js';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {CharacterType} from '@/services/swApi/types.ts';
import {getThingQueryUrl} from '@/services/swApi/utils.ts';
import {RouteId} from '@/types/types.ts';

async function getData(domain: RouteId, id: string): Promise<CharacterType> {
  const res = await fetch(getThingQueryUrl(SW_API_URLS[domain], id));
  if (!res.ok) {
    notFound();
    // const dict = await getDictionary();
    // throw new Error(dict.errors.problemWhileFetching);
  }
  return res.json();
}

/**
 * !!! Props passed from the Server Components to Client components need to be serializable. This means that values such as functions, Dates, etc, cannot be passed directly to client components.
 * https://github.com/vercel/next.js/discussions/47846
 * So... we pass it from client to client
 */
// const getLink: ConnectedThingsProps['getLink'] = async ({href, label}) => {
//   'use server';
//   return <Link href={href}>{label}</Link>;
// };

export default async function Thing({params: {domain, id}}: {params: {domain: RouteId; id: string}}) {
  const thing = await getData(domain, id);
  const dict = await getDictionary();

  return (
    <Details name={thing.name}>
      {domain === 'characters' && (
        <>
          <ClientErrorBoundary>
            <p>
              {dict.domain.species}: {thing.species.length === 0 ? '–' : <CharacterSpecies urls={thing.species} />}
            </p>
          </ClientErrorBoundary>
          <ConnectedThingsWrapper>
            <ConnectedThings title={dict.domain.vehicles} route={ROUTES.vehicles} urlOrUrls={thing.vehicles} />
            <ConnectedThings title={dict.domain.planets} route={ROUTES.planets} urlOrUrls={thing.homeworld} />
          </ConnectedThingsWrapper>
        </>
      )}
    </Details>
  );
}
