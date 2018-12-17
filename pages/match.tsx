import * as React from 'react'
import styled from 'styled-components'
import redirect from '@src/lib/redirect'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import Head from 'next/head'
import anime from 'animejs'

import OrbitSpinner from '@components/OrbitSpinner'
import Opponent from '@src/components/Opponent/Opponent'
import Games from '@src/components/Games/Games'
import Composition from '@src/components/Composition/Composition'

import { ResultType, OpponentType } from '@src/@types/app.type'

import {
  FlexRowCentered,
  FlexRowSpaceBetweenAlignCentered,
  FlexRowAlignCentered,
  FlexColumnCentered,
} from '@components/styles/FlexMixins'

const StyledMatchPage = styled.section`
  width: 100%;

  .MatchPage__Link {
    ${ FlexRowAlignCentered }
    color: ${ props => props.theme.mediumGrey };
    transition: 200ms ease-out;

    &:hover {
      color: ${ props => props.theme.white };
    }
  }
`

const NumberOfGames = styled.span`
  width: 8rem;
  height: 4rem;
  border-radius: 0.3rem;
  background: #292B2F;
  ${ FlexRowCentered }
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: ${ props => props.theme.white };
  font-size: 2rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  margin: 0 auto;
`

const MatchHero = styled.div`
  width: 100%;
  margin: 8rem 0;

  @media (max-width: 640px) {
    margin: 8rem 0 0 0;
  }
`

const Versus = styled.div`
  max-width: 100%;
  ${ FlexRowSpaceBetweenAlignCentered }

  @media (max-width: 640px) {
    ${ FlexColumnCentered }
  }
`

const Divider = styled.span`
  background: ${ props => props.theme.darkGrey };
  height: 20rem;
  width: 0.2rem;
  transform: rotate(30deg);

  @media (max-width: 640px) {
    height: 2px;
    width: 50%;
    transform: rotate(0deg);
  }
`

// Query
const GET_MATCH = gql`
  query GET_MATCH($id: ID!) {
    match(id: $id) @rest(type: "Match", path: "match?id={args.id}") {
      id
      winner {
        id
        name
        image_url
        acronym
      }
      tournament_id @export(as: "tournament_id")
      number_of_games
      begin_at
      results
      opponents {
        opponent {
          id  @export(as: "opponent_id")
          name
          image_url
          acronym
          players @rest(type: "Players", path: "players?teamId={exportVariables.opponent_id}") {
            id
            role
            name
            first_name
            last_name
            image_url
            hometown
          }
        }
      }
      games(id: $id) @rest(type: "Games", path: "games?id={args.id}") {
        id
        winner {
          id
          name
          image_url
          acronym
        }
        begin_at
        teams {
          id
          baron_kills
          dragon_kills
          gold_earned
          tower_kills
          team {
            id
          }
        }
        draw
      }
    }
  }
`

class MatchPage extends React.Component<MatchPageProps, MatchPageStates> {
  static getInitialProps(ctx: any) {
    const pageProps: any = {}

    if (!ctx.query.id) {
      return redirect(ctx, '/')
    }

    pageProps.query = ctx.query

    return { pageProps }
  }

  /**
   * Games tables showing animation
   */
  public displayGames = () => {
    return anime({
      targets: '#MatchPage__Games',
      duration: 500,
      easing: 'easeInOutQuart',
      opacity: [0, 1],
      translateX: [-10, 0],
    })
  }

  /**
   * Composition tables showing animation
   */
  public displayComposition = () => {
    return anime({
      targets: '#MatchPage__Composition',
      duration: 500,
      delay: 200,
      easing: 'easeInOutQuart',
      opacity: [0, 1],
      translateX: [-10, 0],
    })
  }

  public render() {
    const { query: { id } } = this.props

    return (
      <StyledMatchPage>
        <Link prefetch href="/">
          <a className="MatchPage__Link">Return to scoreboard</a>
        </Link>
        <Query
          query={ GET_MATCH }
          variables={{ id }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <OrbitSpinner color="#9013FE" />
            }

            if (error) {
              return <p>Error: { error.message }</p>
            }

            const match = data.match[0]

            match.opponents.sort((a: OpponentType, b: OpponentType) => {
              return a.opponent.id - b.opponent.id
            })

            const firstOpponent = match.opponents[0].opponent
            const secondOpponent = match.opponents[1].opponent

            return (
              <React.Fragment>
                <Head>
                  <title>{ `${ firstOpponent.acronym } VS ${ secondOpponent.acronym }` } - Worlds 2018</title>
                </Head>
                <MatchHero>
                  <NumberOfGames>{ `BO${ match.number_of_games }` }</NumberOfGames>
                  <h3>{ match.begin_at.split('T')[0] }</h3>
                  <Versus>
                    <Opponent
                      result={{
                        score: match.results.find((result: ResultType) => result.team_id === firstOpponent.id).score,
                        isWinner: match.winner.id ===  firstOpponent.id,
                      }}
                      opponent={{
                        id: firstOpponent.id,
                        name: firstOpponent.name,
                        image_url: firstOpponent.image_url,
                      }}
                    />
                    <Divider />
                    <Opponent
                      reverse
                      result={{
                        score: match.results.find((result: ResultType) => result.team_id === secondOpponent.id).score,
                        isWinner: match.winner.id ===  secondOpponent.id,
                      }}
                      opponent={{
                        id: secondOpponent.id,
                        name: secondOpponent.name,
                        image_url: secondOpponent.image_url,
                      }}
                    />
                  </Versus>
                </MatchHero>
                <div id="MatchPage__Games">
                  <Games
                    games={ match.games }
                    onMount={ () => this.displayGames() }
                  />
                </div>
                <div id="MatchPage__Composition">
                  <Composition
                    opponents={ match.opponents }
                    onMount={ () => this.displayComposition() }
                  />
                </div>
              </React.Fragment>
            )
          }}
        </Query>
      </StyledMatchPage>
    )
  }
}

export default MatchPage

interface MatchPageProps {
  query?: {
    id: number;
  }
}

interface MatchPageStates {}
