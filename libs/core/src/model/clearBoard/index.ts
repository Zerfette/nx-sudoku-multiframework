import { map, replicate } from 'fp-ts/Array'
import { constant } from 'fp-ts/function'
import { puzzleToBoard } from '../puzzleToBoard'
import { Board, Digit } from '../../interface/types'

const emptyRow = replicate(9, 0) as Digit[]
const emptyPuzzle = map(constant(emptyRow))(emptyRow)

export const clearBoard: Board = puzzleToBoard(emptyPuzzle)
