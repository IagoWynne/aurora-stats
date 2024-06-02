export interface PersonType {
  id: number;
  firstName: string;
  lastName: string;
}

export interface WheelOptionType {
  id: number;
  name: string;
}

export interface WheelResultType {
  id: number;
  date: Date;
  winner: PersonType;
  prize: WheelOptionType;
}

export interface WheelStat {
  id: number;
  name: string;
  wins: number;
}

export interface WheelPersonWins {
  id: number;
  name: string;
  totalWins: number;
  winsByOption: WheelStat[];
}

export interface ChartData {
  [key: string]: string | number | null;
}
