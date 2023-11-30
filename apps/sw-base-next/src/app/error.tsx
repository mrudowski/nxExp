'use client'; // Error components must be Client Components

import ErrorMsgWithReset from '@/components/ErrorMsgWithReset.tsx';

export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return <ErrorMsgWithReset scope="App" error={error} reset={reset} />;
}
