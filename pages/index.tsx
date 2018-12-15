import * as React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import anime from 'animejs'

import Tabs from '@src/components/Tabs/Tabs'
import Tournament from '@src/components/Tournament/Tournament'
import OrbitSpinner from '@components/OrbitSpinner'

const StyledHomepage = styled.section`
  width: 100%;

  .Homepage__Tournaments-wrapper {
    opacity: 0;
  }

  .tab {
    opacity: 0
  }

  .Tabs__Divider {
    transform-origin: left;
    transform: scaleX(0);
  }
`

const StyledTitle = styled.h1`
  opacity: 0;
`

const stages = [
  {
    id: 0,
    label: 'Play-in groups',
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
    label: 'Play-in elimination',
    slug: 'play-in-elimination',
    tournaments_ids: [
      1671,
    ],
  },
  {
    id: 2,
    label: 'Group stage',
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
    label: 'Finals',
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
        winner_id
        results
      }
    }
  }
`

class Home extends React.Component<HomeProps, HomeStates> {
  public componentDidMount = () => {
    const timeline = anime.timeline()
    timeline
      .add({
        targets: '#Homepage__Title',
        duration: 300,
        delay: 200,
        easing: 'easeInOutQuart',
        opacity: [0, 1],
        translateX: [-10, 0],
      })
      .add({
        targets: '.tab',
        duration: 300,
        delay: (element, index) => index * 100,
        easing: 'easeInOutQuart',
        opacity: [0, 1],
        translateX: [-10, 0],
      })
      .add({
        targets: '.Tabs__Divider',
        duration: 300,
        offset: '-=300',
        easing: 'easeInOutQuart',
        scaleX: [0, 1],
      })
  }

  public displayTournament = (id: number, index: number) => {
    return anime({
      targets: `#table-${ id }`,
      duration: 500,
      delay: index * 200,
      easing: 'easeInOutQuart',
      opacity: [0, 1],
      translateX: [-10, 0],
    })
  }

  public onTabClick = (slug: string) => {
    return new Promise(resolve => {
      this.props.router.push(`/?slug=${ slug }`)

      const timeline = anime.timeline({
        complete: () => resolve(),
      })
      timeline
        .add({
          targets: '.Homepage__Tournaments-wrapper',
          duration: 500,
          delay:(element, index) => index * 200,
          easing: 'easeInOutQuart',
          opacity: [1, 0],
          translateX: [0, 10],
        })
    })
  }

  public render() {
    const { props: { router } } = this
    return (
      <StyledHomepage>
        <StyledTitle id="Homepage__Title">League of Legends Worlds 2018 scoreboard</StyledTitle>
        <Tabs
          activeTabIndex={ router.query.slug ? stages.find(stage => stage.slug === router.query.slug ).id : undefined }
          activeTabSlug={ router.query.slug ? router.query.slug : undefined }
          onTabClick={ (slug: string) => this.onTabClick(slug) }
        >
          {
            stages.map(stage => (
              <div
                key={ stage.id }
                data-label={ stage.label }
                data-slug={ stage.slug }
              >
                <Query
                  query={ GET_TOURNAMENTS }
                  variables={{ ids: stage.tournaments_ids.join(',') }}
                >
                  {({ data, error, loading }) => {
                    if (loading) {
                      return <OrbitSpinner color="#9013FE" />
                    }

                    if (error) {
                      return <p>Error: { error.message }</p>
                    }

                    return data.tournaments.map((tournament, index) => (
                      <div
                        key={ tournament.id }
                        className="Homepage__Tournaments-wrapper"
                        id={ `table-${ tournament.id }` }
                      >
                        <Tournament
                          index={ index }
                          data={ tournament }
                          onMount={ () => this.displayTournament(tournament.id, index) }
                        />
                      </div>
                    ))
                  }}
                </Query>
              </div>
            ))
          }
        </Tabs>
      </StyledHomepage>
    )
  }
}

export default withRouter(Home)

interface HomeProps {
  router: any
  query?: {
    slug: string;
  }
}

interface HomeStates {}
