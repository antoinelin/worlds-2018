import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Router from 'next/router'

import withApollo from '@src/lib/withApollo'
import Page from '@src/components/Page'
import { initGA, logPageView } from '@src/lib/analytics'

class WorldsScoreboardApp extends App<WorldsScoreboardAppProps> {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps: PageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // this exposes the query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }

  componentDidMount () {
    initGA()
    logPageView()
    Router.router.events.on('routeChangeComplete', logPageView)
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <ApolloProvider client={ apolloClient }>
          <Page>
            <Component { ...pageProps } />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(WorldsScoreboardApp)

interface WorldsScoreboardAppProps {
  Component: JSX.Element
  apolloClient: any
}

interface PageProps {
  query?: any
}
