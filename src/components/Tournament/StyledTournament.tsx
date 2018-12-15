import styled from 'styled-components'

export const Opponent = styled('td')<{ variant: string }>`
  width: 38%;
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: ${ ({ variant }) => variant };

  .Table__Opponent-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .Table__DetailsButton-wrapper {
    margin: 0 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .Table__DetailsButton-link {
    font-family: 'Futura-CondensedMedium', sans-serif;
    color: #D1D1D1;
    background: #9013FE;
    font-size: 2rem;
    padding: 1.2rem 2.8rem;
    border-radius: 0.2rem;
    cursor: pointer;
    text-transform: uppercase;

    &:hover {
      background: #7608DA;
    }
  }
`

export const OpponentName = styled.p`
  font-family: 'Arial', sans-serif;
  color: #D1D1D1;
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 1;
  text-align: left;
  margin: 0.5rem 0;
`

export const OpponentAcronym = styled.small`
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: #525252;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: left;
`

export const Score = styled.td`
  width: 24%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Versus = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 0.3rem;
  background: #292B2F;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: #D1D1D1;
  font-size: 2rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  margin: 0 2rem;
`

export const OpponentScore = styled('h3')<{ isWinner: boolean }>`
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: ${ ({ isWinner }) => isWinner ? '#9013FE' : '#525252' };
  font-size: 2rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
`
