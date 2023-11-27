'use client';

import {Provider as JotaiProvider} from 'jotai';

/**
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-third-party-packages-and-providers
 * https://vercel.com/guides/react-context-state-management-nextjs#rendering-third-party-context-providers-in-server-components
 * This is because Next.js doesn't know <Provider /> is using client-only features.
 * To fix this, create your component/context and render its provider inside a Client Component:
 */
export default JotaiProvider;
