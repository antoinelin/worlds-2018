import * as React from 'react'
import MediaQuery from 'react-responsive'

import { GameType } from '@src/@types/app.type'

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
          <TableHead>
            <TableTitle>Games</TableTitle>
          </TableHead>
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
                            `${ Math.floor( firstOpponent.gold_earned / 1000 ) + 'K' } Golds`
                          }
                          {
                            firstOpponent.tower_kills > 1
                              ? ` - ${ firstOpponent.tower_kills } Towers`
                              : ` - ${ firstOpponent.tower_kills } Tower`
                          }
                          <MediaQuery minWidth={ 640 } value={{ width: 640 }}>
                            {
                              firstOpponent.dragon_kills > 1
                                ? ` - ${ firstOpponent.dragon_kills } Dragons`
                                : ` - ${ firstOpponent.dragon_kills } Dragon`
                            }
                            {
                              firstOpponent.baron_kills > 1
                                ? ` - ${ firstOpponent.baron_kills } Barons`
                                : ` - ${ firstOpponent.baron_kills } Baron`
                            }
                          </MediaQuery>
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
                            `${ Math.floor( secondOpponent.gold_earned / 1000 ) + 'K' } Golds`
                          }
                          {
                            secondOpponent.tower_kills > 1
                              ? ` - ${ secondOpponent.tower_kills } Towers`
                              : ` - ${ secondOpponent.tower_kills } Tower`
                          }
                          <MediaQuery minWidth={ 640 } value={{ width: 640 }}>
                            {
                              secondOpponent.dragon_kills > 1
                                ? ` - ${ secondOpponent.dragon_kills } Dragons`
                                : ` - ${ secondOpponent.dragon_kills } Dragon`
                            }
                            {
                              secondOpponent.baron_kills > 1
                                ? ` - ${ secondOpponent.baron_kills } Barons`
                                : ` - ${ secondOpponent.baron_kills } Baron`
                            }
                          </MediaQuery>
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
  games: GameType[]
  onMount?: any
}

interface GamesStates {}
