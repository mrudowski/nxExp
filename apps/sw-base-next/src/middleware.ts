import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en'],

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',

    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

    // https://next-intl-docs.vercel.app/docs/routing/middleware#matcher-no-prefix
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_vercel|.*\\..*).*)',
    // Match all pathnames within `/users`, optionally with a locale prefix
    // '/([\\w-]+)?/users/(.+)'

    // Match only internationalized pathnames
    '/',
    '/(en)/:path*',
  ],
};
