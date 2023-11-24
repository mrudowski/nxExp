import List from '@/components/List/List.tsx';
import {getDictionary} from '@/i18n/dictionaries.js';
import {SW_API_URLS} from '@/services/swApi/constants.ts';
import {getCharacterRoute} from '@/services/utils.ts';
import {RouteId} from '@/types/types.ts';

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

  return <List title={dict.domain[domain]} things={things} getRoute={getCharacterRoute} />;
}
