import * as React from 'react'
import styled from 'styled-components'
import redirect from '@src/lib/redirect'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'

import OrbitSpinner from '@components/OrbitSpinner'
import Opponent from '@components/Opponent'
import Games from '@components/Games'

const StyledMatchPage = styled.section`
  width: 100%;

  .MatchPage__Link {
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
`

const Versus = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Divider = styled.span`
  background: ${ props => props.theme.darkGrey };
  height: 20rem;
  width: 0.2rem;
  transform: rotate(30deg);
`

const GET_MATCH = gql`
  query GET_MATCH($id: ID!) {
    match(id: $id) @rest(type: "Match", path: "match?id={args.id}") {
      id
      winner
      tournament_id @export(as: "tournament_id")
      number_of_games
      begin_at
      results
      opponents {
        opponent {
          id  @export(as: "opponent_id")
          slug
          name
          image_url
          acronym
          players @rest(type: "Players", path: "players?teamId={exportVariables.opponent_id}") {
            id
            slug
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
        winner
        begin_at
        teams
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

  public render() {
    const { query: { id } } = this.props

    return (
      <StyledMatchPage>
        <Link href="/">
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

            data.match[0].opponents.sort((a, b) => {
              return a.opponent.id - b.opponent.id
            })

            const firstOpponent = data.match[0].opponents[0].opponent
            const secondOpponent = data.match[0].opponents[1].opponent

            return (
              <React.Fragment>
                <MatchHero>
                  <NumberOfGames>{ `BO${ match.number_of_games }` }</NumberOfGames>
                  <h3>{ match.begin_at.split('T')[0] }</h3>
                  <Versus>
                    <Opponent
                      result={{
                        score: match.results.find(result => result.team_id === firstOpponent.id).score,
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
                        score: match.results.find(result => result.team_id === secondOpponent.id).score,
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
                <Games
                  games={ match.games }
                />
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
