import { isNonZero } from 'fns'
import { chainWithIndex, mapWithIndex } from 'fp-ts/Array'
import type { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { indLens, locationLens } from '../../interface/optics'
import {
  type Board,
  type Cell,
  Decoration,
  type Digit,
  Editable,
  type Puzzle,
} from '../../interface/types'

const op: Endomorphism<number> = (x) => Math.floor(x / 3)

type getRegion = (r: number, c: number) => number
const getRegion: getRegion = (r, c) => 3 * op(r) + op(c)

type toCell = (row: number) => (col: number, value: Digit) => Cell
const toCell: toCell = (row) => (col, value) => ({
  value,
  location: {
    ind: 0,
    row,
    col,
    reg: getRegion(row, col),
  },
  decoration: Decoration.NONE,
  editable: isNonZero(value) ? Editable.LOCKED : Editable.UNLOCKED,
  corner: [],
  middle: [],
})

type toCells = (rowIndex: number, row: Digit[]) => Cell[]
const toCells: toCells = (rowIndex, row) =>
  mapWithIndex(toCell(rowIndex))(row)

type setIndex = (i: number, cell: Cell) => Cell
const setIndex: setIndex = (i, cell) =>
  locationLens.compose(indLens).set(i)(cell)

type puzzleToBoard = (puzzle: Puzzle) => Board
export const puzzleToBoard: puzzleToBoard = flow(
  chainWithIndex(toCells),
  mapWithIndex(setIndex)
)
