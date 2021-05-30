const config = require('./config');

const gatsbyConfig = [
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-less',
  'gatsby-plugin-offline',
  'gatsby-plugin-dark-mode',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Momin Bin Shahid',
      short_name: 'Momin',
      description: 'Momin Bin Shahid`s website',
      start_url: '/',
      background_color: '#304CFD',
      theme_color: '#304CFD',
      display: 'standalone',
      // icon: 'src/images/icon.png', // This path is relative to the root of the site.
      icon: 'src/images/momin.png', // This path is relative to the root of the site.
      legacy: true, // this will add apple-touch-icon links to <head>. Required for
      // versions prior to iOS 11.3.
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'markdown-pages',
      path: `${__dirname}/content`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1000,
            quality: 80,
            showCaptions: true,
            linkImagesToOriginal: false,
          },
        },
        {
          resolve: 'gatsby-remark-external-links',
          options: {
            rel: 'nofollow',
          },
        },
        'gatsby-remark-prismjs',
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-i18n',
    options: {
      langKeyDefault: config.defaultLanguage,
      useLangKeyLayout: false,
    },
  },
  'gatsby-plugin-sitemap',
  'gatsby-plugin-robots-txt', /* <- convert it version inside package.json from ~^1.5.5 to ~1.5.5
  because actual version installed (from package-lock.json) was 1.6.2 and after ~ is it 1.5.6
  Reason: in version 1.6 sitemap url in robots.txt set as ../sitemap/sitemap_index.xml
  and sitemap was actually generated as /sitemap.xml on root, not inside folder
  */
  {
    resolve: 'gatsby-plugin-antd',
    options: {
      javascriptEnabled: true,
    },
  },
  {
    resolve: 'gatsby-plugin-eslint-v2',
    options: {
      test: /\.js$|\.jsx$/,
      exclude: /(node_modules|.cache|public)/,
      stages: ['develop'],
      options: {
        emitWarning: true,
        failOnError: false,
      },
    },
  },
  {
    resolve: 'gatsby-plugin-nprogress',
    options: {
      // Setting a color is optional.
      color: 'black',
      // Disable the loading spinner.
      showSpinner: true,
    },
  },
];

if (process.env.NODE_ENV === 'production' && config.googleAnalyticTrackingId) {
  // first we were using this https://www.gatsbyjs.com/plugins/gatsby-plugin-google-analytics/
  // but now, google recommends new approach so, using new v4
  // watch this for details: https://www.youtube.com/watch?v=kO_GMfC1LHA
  gatsbyConfig.unshift(
    {
      // see: https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          config.googleAnalyticTrackingId,
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
  );
}

module.exports = gatsbyConfig;
