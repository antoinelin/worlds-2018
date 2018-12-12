import * as React from 'react'
import initApollo from '@src/lib/initApollo'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'

export default (App) => {
  return class Apollo extends React.Component<ApolloProps, ApolloState> {
    static displayName = 'withApollo(App)'

    private _apolloClient: void

    constructor (props: ApolloProps) {
      super(props)
      this._apolloClient = initApollo(props.apolloState)
    }

    static async getInitialProps(ctx: any) {
      const { Component, router } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      const apollo = initApollo()

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              { ...appProps }
              Component={ Component }
              router={ router }
              apolloClient={ apollo }
            />
          )
        } catch (error) {
          // tslint:disable-next-line
          console.error('Error while running `getDataFromTree`', error)
        }
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState: ApolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    render () {
      return <App { ...this.props } apolloClient={ this._apolloClient } />
    }
  }
}

interface ApolloProps {
  apolloState: ApolloState
}

interface ApolloState {}
