'use client';

import {ReactNode} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import ErrorMsgWithReset from '@/components/ErrorMsgWithReset.tsx';

/**
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-third-party-packages-and-providers
 */
const ClientErrorBoundary = ({children}: {children: ReactNode}) => {
  return (
    <ErrorBoundary
      fallbackRender={({error, resetErrorBoundary}) => (
        <ErrorMsgWithReset scope="CharacterSpecies" error={error} reset={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ClientErrorBoundary;
