export interface Matches {
  id: number
  opponents: Opponent[]
  winner_id: number
  results: Result[]
}

export interface Result {
  team_id: number
  score: number
}

export interface Opponent {
  opponent: {
    id: number;
    name: string;
    image_url: string;
    acronym: string;
    players?: Player[];
  }
}

export interface Player {
  id: number
  role: string
  name: string
  first_name: string
  last_name: string
  image_url: string
  hometown: string
}

export interface Match {
  id: number
  winner: Winner
  tournament_id: number
  number_of_games: number
  begin_at: string
  results: Result[]
  opponents: Opponent[]
}

export interface Winner {
  id: number
  name: string
  image_url: string
  acronym: string
}

export interface Game {
  id: number
  winner: Winner
  begin_at: string
  teams: Team[]
  draw: boolean
}

export interface Team {
  id: number
  baron_kills: number
  dragon_kills: number
  tower_kills: number
  gold_earned: number
  team: {
    id: number;
  }
}
