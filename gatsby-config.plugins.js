const config = require('./config');

const gatsbyConfig = [
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-less',
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
      description:
        'Momin Bin Shahid`s home on web. Momin Bin Shahid is a curious software engineer 👨‍💻, let`s connect 🤙 @MominBinShahid',
      start_url: '/',
      lang: 'en',
      background_color: '#EEEEEE', // '#304CFD', // @theme-color
      theme_color: '#333333', // '#304CFD', // @theme-color
      display: 'standalone',
      // icon: 'src/images/icon.png', // This path is relative to the root of the site.
      icon: 'src/images/logo.png', // This path is relative to the root of the site.
      legacy: true, // this will add apple-touch-icon links to <head>. Required for
      // versions prior to iOS 11.3.
    },
  },
  'gatsby-plugin-offline', // read plugin placement. ref: https://www.gatsbyjs.com/docs/how-to/performance/add-offline-support-with-a-service-worker/#using-service-workers-in-gatsby-with-gatsby-plugin-offline
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'markdown-pages',
      path: `${__dirname}/content`,
    },
  },
  {
    resolve: 'gatsby-omni-font-loader',
    options: {
      enableListener: true,
      preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
      // preconnect: ['https://github.com/ryanoasis/nerd-fonts'],
      web: [
        // {
        //   name: 'Fira Code',
        //   file:
        //     'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap',
        // },
        // {
        //   name: 'Roboto Mono',
        //   file:
        //     'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap',
        // },
        {
          name: 'JetBrains Mono',
          file:
            'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
        },
        // {
        //   name: 'Cascadia Code',
        //   file:
        //     'https://github.com/ryanoasis/nerd-fonts/raw/HEAD/patched-fonts/CascadiaCode/Regular/CaskaydiaCoveNerdFont-Regular.ttf',
        // },
      ],
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
  'gatsby-plugin-robots-txt',
  /* ^ <- convert it version inside package.json from ^1.5.5 to ~1.5.5
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
    resolve: 'gatsby-plugin-nprogress',
    options: {
      // Setting a color is optional.
      color: 'tomato',
      // Disable the loading spinner.
      showSpinner: true,
    },
  },
];

if (process.env.NODE_ENV !== 'production') {
  // before this is installed in dev-deps (ref: https://www.gatsbyjs.com/plugins/gatsby-plugin-eslint-v2/)
  gatsbyConfig.push(
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
  );
}

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
