import * as React from 'react'

import {
  StyledOpponent,
  OpponentPosition,
  OpponentName,
  OpponentLogo,
  OpponentResult,
} from './StyledOpponent'

const Opponent: React.SFC<OpponentProps> = props => {
  const { reverse, result: { score, isWinner }, opponent: { name, image_url } } = props

  return (
    <StyledOpponent reverse={ reverse }>
      <OpponentLogo isBackground reverse={ reverse } src={ image_url } alt={`${ name } logotype`} />
      <div className="Opponent__Col1">
        <OpponentPosition isWinner={ isWinner }>
          { isWinner ? 'Victory' : 'Defeat' }
        </OpponentPosition>
        <OpponentName>{ name }</OpponentName>
      </div>
      <div className="Opponent__Col2">
        <OpponentLogo src={ image_url } alt={`${ name } logotype`} />
        <OpponentResult isWinner={ isWinner }>{ score }</OpponentResult>
      </div>
    </StyledOpponent>
  )
}

export default Opponent

interface OpponentProps {
  reverse?: boolean
  result: {
    score: number;
    isWinner: boolean;
  }
  opponent: {
    id: number;
    name: string;
    image_url: string;
  }
}
