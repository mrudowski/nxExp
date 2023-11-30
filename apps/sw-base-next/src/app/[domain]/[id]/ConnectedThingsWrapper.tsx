'use client';

import {ConnectedThingsProps} from '@libs/sw-base-tools/src/components/ConnectedThings/ConnectedThings.tsx';
import Link from 'next/link';
import {Children, cloneElement, ReactNode} from 'react';

/**
 * !!! Props passed from the Server Components to Client components need to be serializable. This means that values such as functions, Dates, etc, cannot be passed directly to client components.
 * https://github.com/vercel/next.js/discussions/47846
 * So... we pass it from client to client
 */
const getLink: ConnectedThingsProps['getLink'] = async ({href, label}) => {
  return <Link href={href}>{label}</Link>;
};

type ConnectedThingsWrapperProps = {
  children: ReactNode;
};

export default function ConnectedThingsWrapper({children}: ConnectedThingsWrapperProps) {
  // Pitfall - Using Children is uncommon and can lead to fragile code
  // but it's only because we want to use two different Links in our expamples
  // https://react.dev/reference/react/Children#alternatives
  return Children.map(children, (child: any) => {
    return cloneElement(child, {
      getLink,
    });
  });
}
