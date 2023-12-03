'use client';

import Link from 'next/link';
import {useParams} from 'next/navigation';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
// !!! and we have to repeat it on every level when we call `notFound();`

export default function NotFound() {
  // const domainPath = usePathname().split('/')[1]; // no :)
  const params = useParams();

  return (
    <article>
      <h1>404 - Thing not found</h1>
      <Link href={`/${params.domain}`}>Go back to {params.domain}</Link>
    </article>
  );
}
