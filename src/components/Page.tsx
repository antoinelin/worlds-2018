import React, { Component } from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Meta from '@components/Meta'

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

// Theme variables
const theme = {
  black: '#151618',
  white: '#D1D1D1',
  violet: '#9013FE',
  darkGrey: '#292B2F',
  mediumGrey: '#525252',
  gridWidth: '800px',
  gridColumnWidth: '180px',
  gridGutterWidth: '20px',
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Futura-CondensedMedium';
    src: url('/static/futura-condensedmedium.woff') format('woff'),
         url('/static/futura-condensedmedium.woff2') format('woff2');
    font-weight: medium;
    font-style: condensed;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    background: ${ theme.black };
  }

  h1 {
    font-family: 'Futura-CondensedMedium', sans-serif;
    font-size: 4rem;
    letter-spacing: 0;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: left;
    margin: 2rem 0;
  }

  h2 {
    font-family: 'Futura-CondensedMedium', sans-serif;
    font-size: 3rem;
    letter-spacing: 0;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: left;
  }

  h3 {
    font-family: 'Futura-CondensedMedium', sans-serif;
    font-size: 1.6rem;
    letter-spacing: 0;
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
  }

  small {
    font-family: 'Futura-CondensedMedium', sans-serif;
    color: ${ theme.mediumGrey };
    font-size: 1.1rem;
    letter-spacing: 0;
    line-height: 1;
    text-transform: uppercase;
    text-decoration: none;
    text-align: left;
  }

  p {
    font-family: 'Arial', sans-serif;
    font-size: 1.6rem;
    letter-spacing: 0;
    line-height: 1;
    text-align: left;
    margin: 1rem 0;
  }

  a {
    font-family: 'Futura-CondensedMedium', sans-serif;
    color: ${ theme.white };
    font-size: 1.8rem;
    letter-spacing: 0;
    line-height: 1;
    text-transform: uppercase;
    text-decoration: none;
    text-align: left;
  }
`

const StylePage = styled.div`
  width: 100vw;
  margin: 10rem 0;
  color: ${props => props.theme.white};
`

const Inner = styled.div`
  max-width: ${props => props.theme.gridWidth};
  margin: 0 auto;
  padding: 0 1rem;
`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={ theme }>
        <React.Fragment>
          <GlobalStyle />
          <StylePage>
            <Meta />
            <Inner>{ this.props.children }</Inner>
          </StylePage>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

export default Page
