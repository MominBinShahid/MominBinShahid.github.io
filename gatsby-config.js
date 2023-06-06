/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

// doing this to use .env.* during gatsby config
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = require('./config');
let plugins = require('./gatsby-config.plugins');

/* while in development some plugins do create caching and other dev server problems
so, we ignore such plugins in development (only use then in production) */
const pluginsToRemoveInNonProdEnv = ['gatsby-plugin-offline'];
if (process.env.NODE_ENV !== 'production') {
  plugins = plugins.filter(
    plugin => !pluginsToRemoveInNonProdEnv.includes(plugin.resolve || plugin)
  );
}

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    // Data used by some gatsby plugins
    siteUrl: config.siteUrl,
    title: config.siteTitle,
    description: config.siteDescription,
  },
  plugins,
};
