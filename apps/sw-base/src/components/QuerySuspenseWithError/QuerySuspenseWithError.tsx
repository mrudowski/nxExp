import {QueryErrorResetBoundary} from '@tanstack/react-query';
import {ReactNode, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useTranslation} from 'react-i18next';

import PageLoading from '@/components/PageLoading/PageLoading.tsx';

/**
 * ErrorBoundary
 *
 * There is no direct equivalent for componentDidCatch in function components yet.
 * If you’d like to avoid creating class components, write a single
 * ErrorBoundary component like above and use it throughout your app.
 * Alternatively, you can use the react-error-boundary package which does
 * that for you.
 *
 * https://react.dev/reference/react/use#displaying-an-error-to-users-with-error-boundary
 * https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */

type QuerySuspenseWithErrorProps = {
  children: ReactNode;
};

const QuerySuspenseWithError = ({children}: QuerySuspenseWithErrorProps) => {
  const {t} = useTranslation();
  return (
    <QueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({error, resetErrorBoundary}) => (
            <>
              <h2>
                {t('errorPage.sorry')} <small>(custom ErrorBoundary with reset)</small>
              </h2>
              <p>{t('errors.problemWhileFetching')}</p>
              <p>
                {error?.status} {error?.statusText || error?.message}
              </p>
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </>
          )}
        >
          <Suspense fallback={<PageLoading />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
export default QuerySuspenseWithError;
