import * as React from 'react'
import MediaQuery from 'react-responsive'

import {
  OpponentLogo,
  OpponentName,
  PlayerInfos,
  PlayerImage,
  PlayerName,
  PlayerNickname,
  PlayerHometown,
  PlayerRole,
} from './StyledComposition'

import {
  StyledTable,
  TableHead,
  TableTitle,
  TableBody,
  TableRow,
  TableColumn,
  ColumnHead,
} from '@components/styles/Table'

class Composition extends React.Component<CompositionProps, CompositionStates> {
  public componentDidMount() {
    const { onMount } = this.props

    if (typeof onMount !== undefined) {
      onMount()
    }
  }

  public render() {
    const { opponents } = this.props

    return (
      <StyledTable className="table">
        <thead>
          <TableHead>
            <TableTitle>Composition</TableTitle>
          </TableHead>
        </thead>
        <TableBody withColumns>
          {
            opponents.map(opponent => {
              const { id, players, image_url, name } = opponent.opponent

              return (
                <TableColumn key={ id }>
                  <ColumnHead>
                    <div className="Table__ColumnHead-wrapper">
                      <OpponentLogo src={ image_url } alt={ `${ name } logotype` } />
                      <OpponentName>{ name }</OpponentName>
                    </div>
                  </ColumnHead>
                  {
                    players.map(player => (
                      <TableRow>
                        <PlayerImage src={ player.image_url } alt={ `${ player.name } profile picture` } />
                        <PlayerInfos>
                          <tr>
                            <PlayerName>
                              { player.first_name }
                            </PlayerName>
                            <PlayerNickname>
                              { player.name }
                            </PlayerNickname>
                            <PlayerName>
                              { player.last_name }
                            </PlayerName>
                          </tr>
                          <tr>
                            <PlayerHometown>
                              { player.hometown ? player.hometown : 'N/A' }
                            </PlayerHometown>
                          </tr>
                        </PlayerInfos>
                        <PlayerRole>{ player.role ? player.role : 'N/A' }</PlayerRole>
                      </TableRow>
                    ))
                  }
                </TableColumn>
              )
            })
          }
        </TableBody>
      </StyledTable>
    )
  }
}

export default Composition

interface CompositionProps {
  opponents: any
  onMount?: any
}

interface CompositionStates {}
