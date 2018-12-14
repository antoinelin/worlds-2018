import * as React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  border: 0.1rem solid #292B2F;
  border-radius: 0.5rem;
  margin-bottom: 4.5rem;
  table-layout: fixed;
  display:block;
`

const TableHead = styled.th`
  width: 100rem;
  background: #9013FE;
  border-radius: 0.5rem;
`

const TableTitle = styled.h3`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
  margin: 1.5rem 0;
`

const TableBody = styled.tbody`
  width: 100%;
  max-width: 100%;
`

const TableRow = styled.tr`
  width: 100%;
  height: 8rem;
  display: inline-flex;
  align-items: center;
  border-bottom: 0.1rem solid #292B2F;

  &:last-of-type {
    border-bottom: 0;
  }
`

const Opponent = styled('td')<{ reverse?: boolean }>`
  width: calc((100% / 2) - 4.5rem);
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: flex-start;

  .Table__Opponent-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${ ({ reverse }) => reverse ? 'flex-end' : 'flex-start' };
  }
`

const OpponentPosition = styled('p')<{ isWinner: boolean }>`
  margin: 0.5rem 0;
  color: ${ ({ isWinner }) => isWinner ? '#50E360' : '#F6344C' };
`

const OpponentStats = styled.span`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1;
`

const GameNumber = styled.div`
  width: 9rem;
  height: 4rem;
  border-radius: 0.3rem;
  background: #292B2F;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: #D1D1D1;
  font-size: 1.8rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  margin: 0 4rem;
`

class Games extends React.Component<GamesProps, GamesStates> {
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
                    { `Games ${ index + 1 }` }
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
}

interface GamesStates {}
