import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { RestLink } from 'apollo-link-rest'
import { setContext } from 'apollo-link-context'
import fetch, { Headers } from 'node-fetch'

let apollo

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
  global.Headers = Headers
}

function createClient(initialState?: any) {
  const authLink = setContext((_, { headers }) => {
    const token = process.env.PANDASCORE_API_TOKEN

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const restLink = new RestLink({
    uri: 'https://api.pandascore.co/',
    credentials: 'same-origin',
  })

  return new ApolloClient({
    link: authLink.concat(restLink),
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState?: any) {
  if (!process.browser) {
    return createClient(initialState)
  }

  // Reuse client on the client-side
  if (!apollo) {
    apollo = createClient(initialState)
  }

  return apollo
}
