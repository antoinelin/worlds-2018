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
  width: 100%;
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
  border-bottom: 0.1rem solid #292B2F;

  &:last-of-type {
    border-bottom: 0;
  }
`

const Opponent = styled('td')<{ variant: string }>`
  width: 38%;
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: ${ props => props.variant };

  .Table__Opponent-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`

const OpponentName = styled.p`
  font-family: 'Arial', sans-serif;
  color: #D1D1D1;
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 1;
  text-align: left;
  margin: 0.5rem 0;
`

const OpponentAcronym = styled.small`
  font-family: 'Futura-CondensedMedium', sans-serif;
  color: #525252;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: left;
`

const Score = styled.td`
  width: 24%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Versus = styled.div`
  width: 3.5rem;
  height: 3.5rem;
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
`

class Table extends React.Component<TableProps, TableStates> {
  state = { isMounted: false }

  public componentDidMount() {
    const { onMount } = this.props

    if (typeof onMount !== undefined) {
      this.setState({ isMounted: true }, () => onMount())
    }
  }

  public render() {
    const { props: { data: { name, matches } } } = this

    return (
      <StyledTable className="table">
        <thead>
          <tr>
            <TableHead>
              <TableTitle className="Styled__Table-title">{ name }</TableTitle>
            </TableHead>
          </tr>
        </thead>
        <TableBody>
          {
            matches.map(match => (
              <TableRow key={ match.id }>
                <Opponent variant="flex-end">
                  <div className="Table__Opponent-wrapper">
                    <tr>
                      <OpponentName>{ match.opponents[0].opponent.name }</OpponentName>
                    </tr>
                    <tr>
                      <OpponentAcronym>{ match.opponents[0].opponent.acronym }</OpponentAcronym>
                    </tr>
                  </div>
                </Opponent>
                <Score>
                  <Versus>
                    VS
                  </Versus>
                </Score>
                <Opponent variant="space-between">
                  <div className="Table__Opponent-wrapper">
                    <tr>
                      <OpponentName>{ match.opponents[1].opponent.name }</OpponentName>
                    </tr>
                    <tr>
                      <OpponentAcronym>{ match.opponents[1].opponent.acronym }</OpponentAcronym>
                    </tr>
                  </div>
                </Opponent>
              </TableRow>
            ))
          }
        </TableBody>
      </StyledTable>
    )
  }
}

export default Table

interface TableProps {
  index: number
  onMount?: any
  data: {
    id: number;
    name: string;
    matches: any;
  }
}

interface TableStates {}
