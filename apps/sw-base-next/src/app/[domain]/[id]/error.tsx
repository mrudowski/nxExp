'use client'; // Error components must be Client Components

import ErrorMsgWithReset from '@/components/ErrorMsgWithReset.tsx';

export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return <ErrorMsgWithReset scope="Details" error={error} reset={reset} />;
}
