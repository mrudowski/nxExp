'use client'; // Error components must be Client Components

import ErrorMsgWithReset from '@/components/ErrorMsgWithReset.tsx';

export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <html>
      <body>
        <ErrorMsgWithReset scope="Global" error={error} reset={reset} />;
      </body>
    </html>
  );
}
