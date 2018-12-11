import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withApollo from '@src/lib/withApollo'
import Page from '@src/components/Page'

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
