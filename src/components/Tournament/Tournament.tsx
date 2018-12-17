import * as React from 'react'
import Link from 'next/link'
import MediaQuery from 'react-responsive'

import { MatchesType } from '@src/@types/app.type'

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
  Play,
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
          <TableHead>
            <TableTitle>{ name }</TableTitle>
          </TableHead>
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
                  <MediaQuery minWidth={ 640 } value={{ width: 640 }}>
                    <Versus>
                      VS
                    </Versus>
                  </MediaQuery>
                  <MediaQuery maxWidth={ 639 } value={{ width: 0 }}>
                    <Link href={ `/match?id=${ match.id }` } prefetch>
                      <Play>
                        <a>
                          <svg width={13} height={16}>
                            <path
                              d="M0 13.47V2.72A2.31 2.31 0 0 1 3.59.88L12
                                6.25a2.19 2.19 0 0 1 0 3.69l-8.4 5.38A2.32 2.32 0 0 1 0 13.47z"
                              fill="#D1D1D1"
                              fillRule="evenodd"
                            />
                          </svg>
                        </a>
                      </Play>
                    </Link>
                  </MediaQuery>
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
                  <MediaQuery minWidth={ 640 } value={{ width: 640 }}>
                    <td className="Table__DetailsButton-wrapper">
                      <Link href={ `/match?id=${ match.id }` } prefetch>
                        <a className="Table__DetailsButton-link">details</a>
                      </Link>
                    </td>
                  </MediaQuery>
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
    matches: MatchesType[];
  }
}

interface TournamentStates {}
