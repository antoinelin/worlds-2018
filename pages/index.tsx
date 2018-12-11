import * as React from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query luke {
    champion @rest(type: "Champion", path: "lol/champions/1") {
      name
    }
  }
`

const Home = () => (
  <Query query={ query }>
    {({ data }) => {
      console.log(data)
      return (
        <React.Fragment>
          <h1>Worlds 2018 scoreboard</h1>
          <p><Link href="/about"><a>About</a></Link></p>
          <p>This is a paragraph text</p>
          <small>This is a small text</small>
        </React.Fragment>
      )
    }}
  </Query>
)

export default Home
