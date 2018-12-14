import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { RestLink } from 'apollo-link-rest'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { Headers } from 'node-fetch'

let apollo = null

if (!process.browser) {
  global.fetch = fetch
}

if (global.Headers == null) {
  global.Headers = Headers
}

function createClient(initialState?: any) {
  const requestLink = setContext((_, { headers }) => {
    const token = process.env.PANDASCORE_API_TOKEN

    return {
      headers: {
        ...headers,
        Authorization: token ? token : '',
      },
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        // tslint:disable-next-line
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })
    }
    // tslint:disable-next-line
    if (networkError) { console.log(`[Network error]: ${networkError}`) }
  })

  const restLink = new RestLink({
    uri: 'http://localhost:3000/api/',
    credentials: 'same-origin',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
  })

  return new ApolloClient({
    link: ApolloLink.from([ errorLink, requestLink, restLink ]),
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache({
      addTypename: false,
    }).restore(initialState || {}),
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
