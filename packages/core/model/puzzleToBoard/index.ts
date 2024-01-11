import { isNonZero } from 'fns'
import { chainWithIndex, mapWithIndex } from 'fp-ts/Array'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { indLens } from '../../interface/optics'
import { Board, Cell, Puzzle } from '../../interface/types'

const op: Endomorphism<number> = (x) => Math.floor(x / 3)

type getRegion = (r: number, c: number) => number
const getRegion: getRegion = (r, c) => 3 * op(r) + op(c)

type toCell = (
  row: number
) => (col: number, value: number) => Cell
const toCell: toCell = (row) => (col, value) => ({
  ind: 0,
  value,
  row,
  col,
  reg: getRegion(row, col),
  selected: false,
  highlighted: false,
  locked: isNonZero(value),
  corner: [],
  middle: [],
})

type toCells = (rowIndex: number, row: number[]) => Cell[]
const toCells: toCells = (rowIndex, row) =>
  mapWithIndex(toCell(rowIndex))(row)

type setIndex = (i: number, cell: Cell) => Cell
const setIndex: setIndex = (i, cell) => indLens.set(i)(cell)

type puzzleToBoard = (puzzle: Puzzle) => Board
export const puzzleToBoard: puzzleToBoard = flow(
  chainWithIndex(toCells),
  mapWithIndex(setIndex)
)
