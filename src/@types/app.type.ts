export interface MatchesType {
  id: number
  opponents: OpponentType[]
  winner_id: number
  results: ResultType[]
}

export interface ResultType {
  team_id: number
  score: number
}

export interface OpponentType {
  opponent: {
    id: number;
    name: string;
    image_url: string;
    acronym: string;
    players?: PlayerType[];
  }
}

export interface PlayerType {
  id: number
  role: string
  name: string
  first_name: string
  last_name: string
  image_url: string
  hometown: string
}

export interface MatchType {
  id: number
  winner: WinnerType
  tournament_id: number
  number_of_games: number
  begin_at: string
  results: ResultType[]
  opponents: OpponentType[]
}

export interface WinnerType {
  id: number
  name: string
  image_url: string
  acronym: string
}

export interface GameType {
  id: number
  winner: WinnerType
  begin_at: string
  teams: TeamType[]
  draw: boolean
}

export interface TeamType {
  id: number
  baron_kills: number
  dragon_kills: number
  tower_kills: number
  gold_earned: number
  team: {
    id: number;
  }
}

export interface TournamentType {
  id: number
  name: string
  matches: MatchesType[]
}
