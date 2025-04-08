import { Lens } from 'monocle-ts'
import {
  Board,
  Cell,
  Editable,
  Decoration,
  Digit,
  Location,
  State,
  Toggles,
} from './types'

export const boardLens: Lens<State, Board> =
  Lens.fromProp<State>()('board')
export const locationLens: Lens<Cell, Location> =
  Lens.fromProp<Cell>()('location')
export const indLens: Lens<Location, number> =
  Lens.fromProp<Location>()('ind')
export const rowLens: Lens<Location, number> =
  Lens.fromProp<Location>()('row')
export const colLens: Lens<Location, number> =
  Lens.fromProp<Location>()('col')
export const regLens: Lens<Location, number> =
  Lens.fromProp<Location>()('reg')
export const valueLens: Lens<Cell, Digit> =
  Lens.fromProp<Cell>()('value')
export const decorationLens: Lens<Cell, Decoration> =
  Lens.fromProp<Cell>()('decoration')
export const editableLens: Lens<Cell, Editable> =
  Lens.fromProp<Cell>()('editable')
export const cornerLens: Lens<Cell, Digit[]> =
  Lens.fromProp<Cell>()('corner')
export const middleLens: Lens<Cell, Digit[]> =
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
