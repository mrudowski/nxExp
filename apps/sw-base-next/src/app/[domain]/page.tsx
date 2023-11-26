import List from '@/components/List/List.tsx';
import {getDictionary} from '@/i18n/dictionaries.js';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {routesToDetails} from '@/services/utils.ts';
import {RouteId} from '@/types/types.ts';

// SGG
// export async function generateStaticParams() {
//   return [{domain: ROUTES.characters}, {domain: ROUTES.planets}, {domain: ROUTES.vehicles}];
// }

async function getData(domain: RouteId) {
  const res = await fetch(SW_API_URLS[domain]);
  const dict = await getDictionary();
  if (!res.ok) {
    throw new Error(dict.errors.problemWhileFetching);
  }
  return res.json();
}
export default async function DomainList({params: {domain}}: {params: {domain: RouteId}}) {
  const things = await getData(domain);
  const dict = await getDictionary();

  return <List title={dict.domain[domain]} things={things} getRoute={routesToDetails[domain]} />;
}
