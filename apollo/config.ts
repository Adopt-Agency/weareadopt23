import { defineApolloClient } from '@nuxtjs/apollo'

export default defineApolloClient({
  httpEndpoint: 'https://adopt-agency.myshopify.com/api/2023-01/graphql.json',
  httpLinkOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'e98b99bf7f5051614563f4d0ee904c70',
      'Accept-Language': 'en-US',
      'Content-Type': 'application/json',
    },
  },
  connectToDevTools: true,
})
