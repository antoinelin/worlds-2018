import * as React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { withRouter } from 'next/router'
import anime from 'animejs'

import OrbitSpinner from '@components/OrbitSpinner'
import Header from '@src/components/Header'
import Table from '@src/components/Table'

const StyledStagePage = styled.section`
  width: 100%;

  .StagePage__Table-wrapper {
    opacity: 0;
    transform: translateY(50px);
  }
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

const GET_TOURNAMENTS = gql`
  query GET_TOURNAMENTS($ids: String) {
    tournaments(ids: $ids) @rest(type: "Tournaments", path: "tournaments?ids={args.ids}") {
      id @export(as: "id")
      name
      matches @rest(type: "Matches", path: "matches?tournamentId={exportVariables.id}") {
        id
        opponents
      }
    }
  }
`
class StagePage extends React.Component<StagePageProps, StagePageStates> {
  public changeRoute(event:any, href: string, as: string) {
    event.preventDefault()

    this.hide(() => {
      this.props.router.push(as)
    })
  }

  public show(id: number, index: number) {
    anime({
      targets: `#table-${ id }`,
      duration: 500,
      delay: 200 + index * 300,
      easing: 'easeInOutQuart',
      opacity: [0, 1],
      translateY: [50, 0],
    })
  }

  public hide(callback: any) {
    const timeline = anime.timeline({
      complete: () => callback(),
    })

    timeline.add({
      targets: '.StagePage__Table-wrapper',
      duration: 200,
      delay: (element, index) => index * 200,
      easing: 'easeInOutQuart',
      opacity: [1, 0],
      translateY: [0, 50],
    })
  }

  public render() {
    const { props: { query } } = this
    const currentStage = stages.find(stage => stage.slug === query.slug)

    return (
      <React.Fragment>
        <Header
          push={ (event, href, as) => this.changeRoute(event, href, as) }
          queryId={ currentStage.id }
        />
        <StyledStagePage>
          <Query
            query={ GET_TOURNAMENTS }
            variables={{ ids: currentStage.tournaments_ids.join(',') }}
          >
            {({ data, error, loading }) => {
              if (loading) {
                return <OrbitSpinner color="#9013FE" />
              }

              if (error) {
                return <p>Error: { error.message }</p>
              }

              return data.tournaments.map((tournament, index) => (
                <div className="StagePage__Table-wrapper" id={ `table-${ tournament.id }` }>
                  <Table
                    index={ index }
                    key={ tournament.id }
                    data={ tournament }
                    onMount={ () => this.show(tournament.id, index) }
                  />
                </div>
              ))
            }}
          </Query>
        </StyledStagePage>
      </React.Fragment>
    )
  }
}

export default withRouter(StagePage)

interface StagePageProps {
  query: any
  router: any
}

interface StagePageStates {
  isComponentMounted: boolean
}
