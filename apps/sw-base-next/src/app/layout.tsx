import '@/styles/index.scss';

import {NextIntlClientProvider, useMessages} from 'next-intl';
import {ReactNode} from 'react';

import JotaiProvider from '@/providers/JotaiProvider.tsx';
import QueryClientProvider from '@/providers/QueryClientProvider.tsx';

type RootLayoutProps = {
  children: ReactNode;
};

// https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/layout.tsx#L8C20-L8C20
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.

// https://next-intl-docs.vercel.app/docs/environments/server-client-components#option-1-passing-translations-to-client-components
// The preferred approach is to pass the processed labels as props or children from a Server Component.
// But here we tru Option 3: Providing individual messages

const RootLayout = ({children}: RootLayoutProps) => {
  const messages = useMessages(); // we can use `use` when no async shared comp?

  return (
    <JotaiProvider>
      <QueryClientProvider>
        <NextIntlClientProvider
          messages={
            // Only provide the minimum of messages
            // pick(messages, 'ClientCounter') with lodash/pick
            {
              utils: messages.utils,
              errors: messages.errors,
              errorPage: {
                sorry: (messages as Messages).errorPage.sorry,
              },
            }
          }
        >
          {children}
        </NextIntlClientProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
};

export default RootLayout;
