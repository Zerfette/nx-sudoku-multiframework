import { noConflicts } from 'core/model/isValidPlacement'
import { every, filter, isEmpty, map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { valueLens } from '../../interface/optics'
import { Board, Cell } from '../../interface/types'
import { isFalse, isNonZero } from 'fns'

type isSolved = (board: Board) => boolean
export const isSolved: isSolved = (board) => {
  const isFilled = pipe(board, map(valueLens.get), every(isNonZero))
  const hasConflict = (cell: Cell) =>
    noConflicts(board, cell, cell.value)
  const isValid: boolean = pipe(
    board,
    map(hasConflict),
    filter(isFalse),
    isEmpty
  )
  return isFilled && isValid
}
