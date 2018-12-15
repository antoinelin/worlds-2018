import styled from 'styled-components'

export const PlayerInfos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  tr {
    display: inline-flex;
  }
`

export const PlayerImage = styled.img`
  width: 5rem;
  margin: 0 2rem;
`

export const PlayerName = styled.p`
  font-family: 'Arial', sans-serif;
  color: #D1D1D1;
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 1;
  text-align: left;
  margin: 0.5rem 0;
`

export const PlayerNickname = styled.p`
  font-family: 'Futura-CondensedMedium', sans-serif;
  text-transform: uppercase;
  color: #9013FE;
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 1;
  text-align: left;
  margin: 0.5rem 0.8rem;
`

export const PlayerHometown = styled.small`
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: #525252;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: left;
`

export const PlayerRole = styled.div`
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
  margin: 0 2rem;
`
