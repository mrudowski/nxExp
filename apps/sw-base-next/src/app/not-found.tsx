import Link from 'next/link';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

// html/body from
// https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/not-found.tsx

export default function NotFound() {
  return (
    <html>
      <body>
        <article>
          <h1>404 - Page Not Found</h1>
          <Link href="/">Go back home</Link>
        </article>
      </body>
    </html>
  );
}
