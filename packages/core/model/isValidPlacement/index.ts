import { Predicate } from 'fp-ts/Predicate'
import { valueIs } from '../../interface/toolkit'
import { Board, Cell, Digit } from '../../interface/types'
import { hasConflict } from '../hasConflict'

type IsValidPlacement = (
  board: Board
) => (value: Digit) => Predicate<Cell>
export const isValidPlacement: IsValidPlacement =
  (board) => (value) => (cell) =>
    valueIs(0)(cell) && !hasConflict(board, cell, value)
