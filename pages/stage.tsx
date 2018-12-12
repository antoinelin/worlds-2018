import * as React from 'react'
import styled from 'styled-components'

import Header from '@src/components/Header'

const StyledStagePage = styled.section`
  width: 100%;
`

const stages = [
  {
    id: 0,
    slug: 'play-in-groups',
    tournaments_ids: [
      1674,
      1669,
      1678,
      1675,
    ],
  },
  {
    id: 1,
    slug: 'play-in-elimination',
    tournaments_ids: [
      1671,
    ],
  },
  {
    id: 2,
    slug: 'group-stage',
    tournaments_ids: [
      1670,
      1672,
      1676,
      1673,
    ],
  },
  {
    id: 3,
    slug: 'finals',
    tournaments_ids: [
      1677,
    ],
  },
]

// const GET_TOURNAMENTS = gql`
//   query GET_TOURNAMENTS($ids: String) {
//     tournaments(ids: $ids) @rest(type: "Tournaments", path: "series/1605/tournaments?filter[id]={args.ids}") {
//       id @export(as: "id")
//       name
//       matches @rest(type: "Matches", path: "tournaments/{exportVariables.id}/matches/") {
//         id
//         opponents
//       }
//     }
//   }
// `

const StagePage: React.SFC<StagePageProps> = ({ query }) => {
  const currentStage = stages.find(stage => stage.slug === query.slug)

  return (
    <React.Fragment>
      <Header queryId={ currentStage.id }/>
      <StyledStagePage>
        <h2>Toto</h2>
      </StyledStagePage>
    </React.Fragment>
  )
}

export default StagePage

interface StagePageProps {
  query: any
}
