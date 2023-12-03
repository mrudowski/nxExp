import {redirect} from 'next/navigation';

/**
 * not needed because we have redirects inside next.config.js
 */

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect('/en/characters');
}
