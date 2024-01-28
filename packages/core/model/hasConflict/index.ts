import { allPass } from 'fns'
import { elem, filter, map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { Eq } from 'fp-ts/number'
import {
  getValue,
  indIsNot,
  intersects,
  valueIsNonZero,
} from '../../interface/toolkit'
import { Board, Cell, Digit } from '../../interface/types'

type hasConflict = (board: Board, cell: Cell, value: Digit) => boolean
export const hasConflict: hasConflict = (board, cell, value) => {
  const isSignificant = allPass([
    indIsNot(cell.location.ind),
    valueIsNonZero,
    intersects(cell.location),
  ])
  return pipe(
    board,
    filter(isSignificant),
    map(getValue),
    elem(Eq)(value)
  )
}
