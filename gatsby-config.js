/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  pathPrefix: `/web_projects`,
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    'gatsby-plugin-root-import',
  ],
}
