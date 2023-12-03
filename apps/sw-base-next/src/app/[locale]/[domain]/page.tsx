import {RouteId, ROUTES, routesToDetails, SW_API_URLS} from '@nx-exp/sw-base-tools';
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';

import List from '@/components/List/List.tsx';
import {getDictionary} from '@/i18n/dictionaries.js';

// for SGG and more
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
export async function generateStaticParams() {
  return [{domain: ROUTES.characters}, {domain: ROUTES.planets}, {domain: ROUTES.vehicles}];
}

async function getData(domain: RouteId) {
  if (!Object.keys(ROUTES).includes(domain)) {
    notFound();
  }
  const res = await fetch(SW_API_URLS[domain]);
  const dict = await getDictionary();
  if (!res.ok) {
    throw new Error(dict.errors.problemWhileFetching);
  }
  return res.json();
}
export default async function DomainList({params: {domain}}: {params: {domain: RouteId}}) {
  const things = await getData(domain);
  // const t = useTranslations('domain');
  const t = await getTranslations('domain');

  return <List title={t(domain)} things={things} getRoute={routesToDetails[domain]} />;
}
