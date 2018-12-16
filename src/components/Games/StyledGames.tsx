import styled from 'styled-components'

export const Opponent = styled('td')<{ reverse?: boolean }>`
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

  ${ ({ reverse }) => reverse && `
    text-align: right;
  `}
`

export const OpponentPosition = styled('p')<{ isWinner: boolean }>`
  font-family: 'Arial', sans-serif;
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 1;
  margin: 0 0 0.5rem 0;
  color: ${ ({ isWinner }) => isWinner ? '#50E360' : '#F6344C' };
`

export const OpponentStats = styled.span`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1;

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }
`

export const GameNumber = styled.div`
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

  @media (max-width: 640px) {
    margin: 0 2rem;
  }
`
