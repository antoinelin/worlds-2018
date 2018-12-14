import * as React from 'react'
import styled from 'styled-components'

const StyledOpponent = styled('div')<{ reverse?: boolean }>`
  position: relative;
  margin: 10rem 0;
  width: 45%;
  display: flex;
  flex-direction: ${ ({ reverse }) => reverse ? 'row-reverse' : 'row' };
  justify-content: space-between;
  align-items: center;

  .Opponent__Col1 {
    max-width: 230px;
  }

  .Opponent__Col2 {
    display: flex;
    flex-direction: ${ ({ reverse }) => reverse ? 'row-reverse' : 'row' };
    justify-content: flex-start;
    align-items: center;
  }
`

const OpponentPosition = styled('small')<{ isWinner: boolean }>`
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: ${ ({ isWinner }) => isWinner ? '#50E360' : '#F6344C' };
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: left;
`

const OpponentName = styled.h3`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 4rem;
  letter-spacing: 0;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: left;
  margin: 0;
`

const OpponentLogo = styled('img')<{ isBackground?: boolean; reverse?: boolean }>`
  width: 10rem;
  margin: 0 5rem;

  ${ ({ isBackground }) => isBackground && `
    z-index: -1;
    position: absolute;
    margin: 0;
    width: 35rem;
    opacity: 0.15;
  `}

  ${ ({ isBackground, reverse }) => isBackground && reverse && `
    right: 0;
    transform: translateX(40%);
  `}

  ${ ({ isBackground, reverse }) => isBackground && !reverse && `
    left: 0;
    transform: translateX(-40%);
  `}
`

const OpponentResult = styled('h2')<{ isWinner: boolean }>`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 10rem;
  letter-spacing: 0;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: left;
  margin: 2rem 0;
  color: ${ ({ isWinner }) => isWinner ? '#9013FE' : '#525252' }
`

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
