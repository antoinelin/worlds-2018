import * as React from 'react'
import Link from 'next/link'

import {
  StyledTable,
  TableHead,
  TableTitle,
  TableBody,
  TableRow,
} from '@components/styles/Table'

import {
  Opponent,
  OpponentName,
  OpponentAcronym,
  Score,
  Versus,
  OpponentScore,
} from './StyledTournament'

class Tournament extends React.Component<TournamentProps, TournamentStates> {
  public componentDidMount() {
    const { onMount } = this.props

    if (typeof onMount !== undefined) {
      onMount()
    }
  }

  public render() {
    const { props: { data: { name, matches } } } = this

    return (
      <StyledTable className="table">
        <thead>
          <tr>
            <TableHead>
              <TableTitle>{ name }</TableTitle>
            </TableHead>
          </tr>
        </thead>
        <TableBody>
          {
            matches.map(match => {
              match.opponents.sort((a, b) => {
                return a.opponent.id - b.opponent.id
              })

              return (
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
                  <OpponentScore isWinner={ match.winner_id === match.opponents[0].opponent.id }>
                    { match.results.find(result => result.team_id === match.opponents[0].opponent.id).score }
                  </OpponentScore>
                  <Versus>
                    VS
                  </Versus>
                  <OpponentScore isWinner={ match.winner_id === match.opponents[1].opponent.id }>
                    { match.results.find(result => result.team_id === match.opponents[1].opponent.id).score }
                  </OpponentScore>
                </Score>
                <Opponent variant="space-between">
                  <td className="Table__Opponent-wrapper">
                    <tr>
                      <OpponentName>{ match.opponents[1].opponent.name }</OpponentName>
                    </tr>
                    <tr>
                      <OpponentAcronym>{ match.opponents[1].opponent.acronym }</OpponentAcronym>
                    </tr>
                  </td>
                  <td className="Table__DetailsButton-wrapper">
                    <Link href={ `/match?id=${ match.id }` }>
                      <a className="Table__DetailsButton-link">details</a>
                    </Link>
                  </td>
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

export default Tournament

interface TournamentProps {
  index: number
  onMount?: any
  data: {
    id: number;
    name: string;
    matches: any;
  }
}

interface TournamentStates {}
