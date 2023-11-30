'use client';

// https://tanstack.com/query/latest/docs/react/guides/advanced-ssr

import {getQueryClientInstance} from '@libs/sw-base-tools/src/services/queryClient.ts';
import {QueryClientProvider as QueryClientProviderOrg} from '@tanstack/react-query';
import {ReactNode, useState} from 'react';

// NEVER DO THIS:
// const queryClient = new QueryClient()
//
// Creating the queryClient at the file root level makes the cache shared
// between all requests and means _all_ data gets passed to _all_ users.
// Besides being bad for performance, this also leaks any sensitive data.

export default function QueryClientProvider({children}: {children: ReactNode}) {
  // Instead do this, which ensures each request has its own cache:
  // REMINDER: we only use QueryClient here because we want to check if we can

  const [queryClient] = useState(() => getQueryClientInstance());

  return <QueryClientProviderOrg client={queryClient}>{children}</QueryClientProviderOrg>;
}
