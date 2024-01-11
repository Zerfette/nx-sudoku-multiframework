import { Option } from 'fp-ts/Option'
import { NonEmptyArray } from 'fp-ts/NonEmptyArray'

export enum Dimension {
  ROW,
  COL,
  REG,
}
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Smalls = Digit[]

export type Cell = {
  ind: number
  value: Digit
  row: number
  col: number
  reg: number
  selected: boolean
  locked: boolean
  highlighted: boolean
  corner: Smalls
  middle: Smalls
}

export type Board = Cell[]

export type Puzzle = number[][]

export type Toggles = Record<string, boolean>

export type Hints = {
  cell: Digit[]
  row: Digit[]
  col: Digit[]
  reg: Digit[]
}

export type Selection = Option<NonEmptyArray<Cell>>

export type State = {
  board: Board
  toggles: Toggles
  selectedNumber: Digit
}

export type Mutation<S, P> = (state: S, payload: P) => S
