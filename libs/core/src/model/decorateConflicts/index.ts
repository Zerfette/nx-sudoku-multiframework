import { mapIfElse } from 'fns'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { Board } from '../../interface/types'
import { removeConflict, addConflict } from '../../interface/toolkit'
import { hasConflict } from '../hasConflict'

type decorateConflicts = Endomorphism<Board>
export const decorateConflicts: decorateConflicts = (board) =>
  mapIfElse(
    (cell) => hasConflict(board, cell, cell.value),
    addConflict,
    removeConflict
  )(board)
