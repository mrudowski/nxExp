import Link from 'next/link';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
// !!! and we have to repeat it on every level when we call `notFound();`

export default function NotFound() {
  return (
    <article>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </article>
  );
}
