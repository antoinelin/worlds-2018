import App, { Container } from 'next/app'
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
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Page>
          <Component { ...pageProps } />
        </Page>
      </Container>
    )
  }
}

export default WorldsScoreboardApp

interface WorldsScoreboardAppProps {
  Component: JSX.Element
  apolloClient: any
}

interface PageProps {
  query?: any
}
