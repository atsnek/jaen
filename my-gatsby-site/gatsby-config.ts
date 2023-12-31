import type {GatsbyConfig} from 'gatsby'

require('dotenv').config()

console.log('ENV', process.env.GATSBY_LENS_API_URL)

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true
  },
  plugins: [
    {
      resolve: `gatsby-jaen-lens`,
      options: {
        roles: ['7aaaa527-d959-477d-b90f-4ae9da60e115']
      }
    },
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        // The folder where the page templates are located
        pageTemplateFolder: `src/templates`,
        snekResourceId: `63571eee-f41c-4745-9130-d746c2cb97a3`,
        googleAnalytics: {
          trackingIds: ['G-M58K75M9PG']
        }
      }
    },
    'gatsby-plugin-webpack-bundle-analyser-v2'
  ]
}

export default config
