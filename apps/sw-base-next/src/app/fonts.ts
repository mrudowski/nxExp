import {Lato} from 'next/font/google';

/**
 * from docs:
 * https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 *
 * Automatically self-host any Google Font. Fonts are included in the
 * deployment and served from the same domain as your deployment.
 * No requests are sent to Google by the browser.
 */
export const latoFont = Lato({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
