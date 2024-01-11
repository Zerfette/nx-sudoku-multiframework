import { Lens } from 'monocle-ts'
import { Board, Cell, Digit, Smalls, State, Toggles } from './types'

export const boardLens: Lens<State, Board> =
  Lens.fromProp<State>()('board')

export const indLens: Lens<Cell, number> =
  Lens.fromProp<Cell>()('ind')
export const valueLens: Lens<Cell, Digit> =
  Lens.fromProp<Cell>()('value')
export const rowLens: Lens<Cell, number> =
  Lens.fromProp<Cell>()('row')
export const colLens: Lens<Cell, number> =
  Lens.fromProp<Cell>()('col')
export const regLens: Lens<Cell, number> =
  Lens.fromProp<Cell>()('reg')
export const selectedLens: Lens<Cell, boolean> =
  Lens.fromProp<Cell>()('selected')
export const highlightedLens: Lens<Cell, boolean> =
  Lens.fromProp<Cell>()('highlighted')
export const lockedLens: Lens<Cell, boolean> =
  Lens.fromProp<Cell>()('locked')
export const cornerLens: Lens<Cell, Smalls> =
  Lens.fromProp<Cell>()('corner')
export const middleLens: Lens<Cell, Smalls> =
  Lens.fromProp<Cell>()('middle')

export const selectedNumberLens: Lens<State, Digit> =
  Lens.fromProp<State>()('selectedNumber')

export const togglesLens: Lens<State, Toggles> =
  Lens.fromProp<State>()('toggles')

export const autosolveLens: Lens<Toggles, boolean> =
  Lens.fromProp<Toggles>()('autosolve')

export const darkModeLens: Lens<Toggles, boolean> =
  Lens.fromProp<Toggles>()('darkMode')

export const mouseDownLens: Lens<Toggles, boolean> =
  Lens.fromProp<Toggles>()('mouseDown')

export const mouseOutsideLens: Lens<Toggles, boolean> =
  Lens.fromProp<Toggles>()('mouseOutside')
