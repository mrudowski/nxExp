'use client'; // Error components must be Client Components

import {useEffect} from 'react';

export default function ErrorMsgWithReset({
  scope,
  error,
  reset,
}: {
  scope: string;
  error: Error & {digest?: string};
  reset: () => void;
}) {
  // TODO how?
  //const dict = getDictionary();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <article>
      <h2>{'dict.errorPage.sorry'}</h2>
      <p>
        {scope}: {error?.message}
      </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </article>
  );
}
