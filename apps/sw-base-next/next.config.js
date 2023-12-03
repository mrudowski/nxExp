//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {composePlugins, withNx} = require('@nx/next');
const withNextIntl = require('next-intl/plugin')();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
  // experimental: {
  //   typedRoutes: true,
  // },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // we cannot `export` when we have redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/characters',
        permanent: true,
      },
    ];
  },
  // SGG
  // output: 'export',
  // distDir: 'out',
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withNextIntl,
];

module.exports = composePlugins(...plugins)(nextConfig);
