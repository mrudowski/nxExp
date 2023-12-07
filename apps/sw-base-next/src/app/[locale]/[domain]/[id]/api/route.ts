// from docs:
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

// export const dynamic = 'force-dynamic'; // defaults to force-static

import {getThingQueryUrl, RouteId, SW_API_URLS} from '@nx-exp/sw-base-tools';
import {Request} from 'next/dist/compiled/@edge-runtime/primitives';
import {NextResponse} from 'next/server';

// Route Handlers are cached by default when using the `GET` method
// with the `Response` object.
// - BUT we opt out of caching when we use request: Request
// - etc
export async function GET(request: Request, {params}: {params: {domain: string; id: string}}) {
  // bad
  const {pathname} = new URL(request.url);
  const [, domainAlt, idAlt] = pathname.split('/');
  // good
  const {domain, id} = params;
  console.log('📘 [log]:', domain, domainAlt, id, idAlt);
  const res = await fetch(getThingQueryUrl(SW_API_URLS[domain as RouteId], id), {
    // headers: {
    //   'Content-Type': 'application/json',
    //   'API-Key': process.env.DATA_API_KEY,
    // },
  });
  const thing = await res.json();

  // TypeScript Warning: Response.json() is only valid from TypeScript 5.2.
  // If you use a lower TypeScript version, you can use NextResponse.json()
  // for typed responses instead.
  // return Response.json({data});
  return NextResponse.json({thing});
}
