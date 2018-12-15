import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  border: 0.1rem solid #292B2F;
  border-radius: 0.5rem;
  margin-bottom: 4.5rem;
  table-layout: fixed;
  display:block;
`

export const TableHead = styled.th`
  width: 100rem;
  background: #9013FE;
  border-radius: 0.5rem;
`

export const TableTitle = styled.h3`
  font-family: 'Futura-CondensedMedium', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
  margin: 1.5rem 0;
`

export const TableBody = styled('tbody')<{ withColumns?: boolean }>`
  width: 100%;
  max-width: 100%;

  ${ ({ withColumns }) => withColumns && `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  `}
`

export const TableRow = styled.tr`
  width: 100%;
  height: 8rem;
  display: inline-flex;
  align-items: center;
  border-bottom: 0.1rem solid #292B2F;

  &:last-of-type {
    border-bottom: 0;
  }
`

export const TableColumn = styled.td`
  width: 50%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 0.1rem solid #292B2F;
  border-radius: 0.5rem;
  margin: 0.4rem;


  &:first-of-type {
    margin-right: 0.2rem;
  }

  &:last-of-type {
    margin-left: 0.2rem;
  }
`
