import styled from 'styled-components'

export const StyledOpponent = styled('div')<{ reverse?: boolean }>`
  position: relative;
  margin: 10rem 0;
  width: 45%;
  display: flex;
  flex-direction: ${ ({ reverse }) => reverse ? 'row-reverse' : 'row' };
  justify-content: space-between;
  align-items: center;

  .Opponent__Col1 {
    max-width: 230px;

    @media (max-width: 640px) {
      max-width: unset;
    }
  }

  .Opponent__Col2 {
    display: flex;
    flex-direction: ${ ({ reverse }) => reverse ? 'row-reverse' : 'row' };
    justify-content: flex-start;
    align-items: center;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    text-align: center;
    margin: 5rem 0;
  }
`

export const OpponentPosition = styled('small')<{ isWinner: boolean }>`
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: ${ ({ isWinner }) => isWinner ? '#50E360' : '#F6344C' };
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: left;
`

export const OpponentName = styled.h3`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 4rem;
  letter-spacing: 0;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: left;
  margin: 0;

  @media (max-width: 640px) {
    text-align: center;
  }
`

export const OpponentLogo = styled('img')<{ isBackground?: boolean; reverse?: boolean }>`
  width: 10rem;
  margin: 0 5rem;

  ${ ({ isBackground }) => isBackground && `
    z-index: -1;
    position: absolute;
    margin: 0;
    width: 35rem;
    opacity: 0.15;
    user-select: none;
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

export const OpponentResult = styled('h2')<{ isWinner: boolean }>`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 10rem;
  letter-spacing: 0;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: left;
  margin: 2rem 0;
  color: ${ ({ isWinner }) => isWinner ? '#9013FE' : '#525252' }
`
