import {
  CharacterType,
  ConnectedThings,
  Details,
  getThingQueryUrl,
  PlanetType,
  RouteId,
  ROUTES,
  SW_API_URLS,
  VehicleType,
} from '@nx-exp/sw-base-tools';
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {Suspense} from 'react';

import CharacterSpecies from '@/components/CharacterSpecies.tsx';
import ClientErrorBoundary from '@/components/ClientErrorBoundary.tsx';
import ConnectedThingsWrapper from '@/components/ConnectedThingsWrapper.tsx';

// testing Discriminated Unions
// https://github.com/gibbok/typescript-book#discriminated-unions
interface CharacterTypeExt extends CharacterType {
  domain: 'characters'; // have to be string - RouteId won't work!
}
type PlanetTypeExt = PlanetType & {
  domain: 'planets';
};
type VehicleTypeExt = VehicleType & {
  domain: 'vehicles';
};

async function getData(domain: RouteId, id: string): Promise<CharacterTypeExt | PlanetTypeExt | VehicleTypeExt> {
  const res = await fetch(getThingQueryUrl(SW_API_URLS[domain], id));
  if (!res.ok) {
    notFound();
    // throw new Error('problemWhileFetching');
  }
  const data = await res.json();
  return {
    ...data,
    domain,
  };
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
  const t = await getTranslations('domain');
  const tUtils = await getTranslations('utils');

  return (
    <Details name={thing.name}>
      {thing.domain === 'characters' && (
        <>
          <ClientErrorBoundary>
            <p>
              {/*Without Suspense whole page will wait for it, pageLoader handle be used*/}
              <Suspense fallback={tUtils('loading')}>
                {t('species')}: {thing.species.length === 0 ? '–' : <CharacterSpecies urls={thing.species} />}
              </Suspense>
            </p>
          </ClientErrorBoundary>
          <ConnectedThingsWrapper>
            <ConnectedThings title={t('vehicles')} route={ROUTES.vehicles} urlOrUrls={thing.vehicles} />
            <ConnectedThings title={t('planets')} route={ROUTES.planets} urlOrUrls={thing.homeworld} />
          </ConnectedThingsWrapper>
        </>
      )}
      {thing.domain === 'planets' && (
        <>
          <p>
            {t('population')}: {thing.population}
          </p>
          <ConnectedThingsWrapper>
            <ConnectedThings title={t('residents')} route={ROUTES.characters} urlOrUrls={thing.residents} />
          </ConnectedThingsWrapper>
        </>
      )}
      {thing.domain === 'vehicles' && (
        <>
          <p>
            {t('vehicleType')}: {thing.vehicle_class}
          </p>
          <ConnectedThingsWrapper>
            <ConnectedThings title={t('pilots')} route={ROUTES.characters} urlOrUrls={thing.pilots} />
          </ConnectedThingsWrapper>
        </>
      )}
    </Details>
  );
}
