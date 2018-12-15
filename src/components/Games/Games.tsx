import * as React from 'react'

import {
  StyledTable,
  TableHead,
  TableTitle,
  TableBody,
  TableRow,
} from '@components/styles/Table'

import {
  Opponent,
  OpponentPosition,
  OpponentStats,
  GameNumber,
} from './StyledGames'

class Games extends React.Component<GamesProps, GamesStates> {
  public componentDidMount() {
    const { onMount } = this.props

    if (typeof onMount !== undefined) {
      onMount()
    }
  }

  public render() {
    const { games } = this.props

    return (
      <StyledTable className="table">
        <thead>
          <tr>
            <TableHead>
              <TableTitle>Games</TableTitle>
            </TableHead>
          </tr>
        </thead>
        <TableBody>
          {
            games.map((game, index) => {
              game.teams.sort((a, b) => {
                return a.team.id - b.team.id
              })

              const firstOpponent = game.teams[0]
              const secondOpponent = game.teams[1]

              return (
                <TableRow key={ game.id }>
                  <Opponent reverse>
                    <div className="Table__Opponent-wrapper">
                      <tr>
                        <OpponentPosition isWinner={ firstOpponent.team.id === game.winner.id }>
                          {
                            firstOpponent.team.id === game.winner.id
                              ? 'Victory'
                              : 'Defeat'
                          }
                        </OpponentPosition>
                      </tr>
                      <tr>
                        <OpponentStats>
                          {
                            `${ firstOpponent.gold_earned } Golds - `
                          }
                          {
                            firstOpponent.dragon_kills > 1
                              ? `${ firstOpponent.dragon_kills } Dragons - `
                              : `${ firstOpponent.dragon_kills } Dragon - `
                          }
                          {
                            firstOpponent.baron_kills > 1
                              ? `${ firstOpponent.baron_kills } Barons - `
                              : `${ firstOpponent.baron_kills } Baron - `
                          }
                          {
                            firstOpponent.tower_kills > 1
                              ? `${ firstOpponent.tower_kills } Towers`
                              : `${ firstOpponent.tower_kills } Tower`
                          }
                        </OpponentStats>
                      </tr>
                    </div>
                  </Opponent>
                  <GameNumber>
                    { `Game ${ index + 1 }` }
                  </GameNumber>
                  <Opponent>
                    <div className="Table__Opponent-wrapper">
                      <tr>
                        <OpponentPosition isWinner={ secondOpponent.team.id === game.winner.id }>
                          {
                            secondOpponent.team.id === game.winner.id
                              ? 'Victory'
                              : 'Defeat'
                          }
                        </OpponentPosition>
                      </tr>
                      <tr>
                        <OpponentStats>
                          {
                            `${ secondOpponent.gold_earned } Golds - `
                          }
                          {
                            secondOpponent.dragon_kills > 1
                              ? `${ secondOpponent.dragon_kills } Dragons - `
                              : `${ secondOpponent.dragon_kills } Dragon - `
                          }
                          {
                            secondOpponent.baron_kills > 1
                              ? `${ secondOpponent.baron_kills } Barons - `
                              : `${ secondOpponent.baron_kills } Baron - `
                          }
                          {
                            secondOpponent.tower_kills > 1
                              ? `${ secondOpponent.tower_kills } Towers`
                              : `${ secondOpponent.tower_kills } Tower`
                          }
                        </OpponentStats>
                      </tr>
                    </div>
                  </Opponent>
                </TableRow>
              )
            })
          }
        </TableBody>
      </StyledTable>
    )
  }
}

export default Games

interface GamesProps {
  games: any
  onMount?: any
}

interface GamesStates {}
