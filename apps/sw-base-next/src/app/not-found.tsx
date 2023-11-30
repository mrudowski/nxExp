import Link from 'next/link';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
export default function NotFound() {
  return (
    <article>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </article>
  );
}
