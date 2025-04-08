import type { Option } from 'fp-ts/Option'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Endomorphism } from 'fp-ts/lib/Endomorphism'
import type { Action } from '../actions/types'

export enum Dimension {
  ROW = 'ROW',
  COL = 'COL',
  REG = 'REG',
}
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export enum Editable {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
}

export enum Decoration {
  CONFLICTED = 'CONFLICTED',
  HIGHLIGHTED = 'HIGHLIGHTED',
  SELECTED = 'SELECTED',
  NONE = 'NONE',
}

export type Location = {
  ind: number
  row: number
  col: number
  reg: number
}

export type Cell = {
  value: Digit
  location: Location
  editable: Editable
  decoration: Decoration
  corner: Digit[]
  middle: Digit[]
}

export type Board = Cell[]

export type Puzzle = Digit[][]

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

export type Mutation<S, P> = (payload: P) => Endomorphism<S>

export type Dispatch = (action: Action) => void
export type DispatchMap = (actions: Action[]) => void
export type DispatchFold = (actionsOptional: Option<Action[]>) => void
