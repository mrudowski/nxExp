import '@/styles/index.scss';

import {ReactNode} from 'react';

import JotaiProvider from '@/providers/JotaiProvider.tsx';
import QueryClientProvider from '@/providers/QueryClientProvider.tsx';

type RootLayoutProps = {
  children: ReactNode;
};

// https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/layout.tsx#L8C20-L8C20
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout = ({children}: RootLayoutProps) => {
  return (
    <JotaiProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </JotaiProvider>
  );
};

export default RootLayout;
