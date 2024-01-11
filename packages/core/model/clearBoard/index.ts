import { map, replicate } from 'fp-ts/Array'
import { constant, pipe } from 'fp-ts/function'
import { puzzleToBoard } from '../puzzleToBoard'
import { Board } from '../../interface/types'

const emptyRow = replicate(9, 0)

export const clearBoard: Board = pipe(
  emptyRow,
  map(constant(emptyRow)),
  puzzleToBoard
)