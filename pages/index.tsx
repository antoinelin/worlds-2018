import * as React from 'react'
// import gql from 'graphql-tag'
import styled from 'styled-components'
import Link from 'next/link'

const StyledHomepage = styled.section`
  width: 100%;
`

// const GET_PLAY_IN_GROUPS_TOURNAMENTS = gql`
//   query GET_PLAY_IN_GROUPS_TOURNAMENTS {
//     tournaments @rest(type: "Tournaments", path: "series/1605/tournaments?filter[id]=1674,1669,1678,1675") {
//       id @export(as: "id")
//       name
//       matches @rest(type: "Matches", path: "tournaments/{exportVariables.id}/matches/") {
//         id
//         opponents
//       }
//     }
//   }
// `

// const GET_PLAY_IN_ELIMINATION_TOURNAMENTS = gql`
//   query GET_PLAY_IN_ELIMINATION_TOURNAMENTS {
//     tournaments @rest(type: "Tournaments", path: "tournaments/1671") {
//       id
//       name
//       matches @rest(type: "Matches", path: "tournaments/1671/matches/") {
//         id
//         opponents
//       }
//     }
//   }
// `

// const GET_GROUP_STAGE_TOURNAMENTS = gql`
//   query GET_GROUP_STAGE_TOURNAMENTS {
//     tournaments @rest(type: "Tournaments", path: "series/1605/tournaments?filter[id]=1670,1672,1676,1673") {
//       id @export(as: "id")
//       name
//       matches @rest(type: "Matches", path: "tournaments/{exportVariables.id}/matches/") {
//         id
//         opponents
//       }
//     }
//   }
// `

// const GET_FINALS_TOURNAMENTS = gql`
//   query GET_FINALS_TOURNAMENTS {
//     tournaments @rest(type: "Tournaments", path: "tournaments/1677") {
//       id
//       name
//       matches @rest(type: "Matches", path: "tournaments/1677/matches/") {
//         id
//         opponents
//       }
//     }
//   }
// `

const Home: React.SFC<HomeProps> = () => (
  <React.Fragment>
    <StyledHomepage>
      <Link href="/stage/finals"><a>Finals</a></Link>
      <img src="/static/worlds-logo.png" alt="Worlds Logotype"/>
    </StyledHomepage>
  </React.Fragment>
)

export default Home

interface HomeProps {}
