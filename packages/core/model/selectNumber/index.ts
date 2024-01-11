import { when } from 'fns'
import { map } from 'fp-ts/Array'
import { flow } from 'fp-ts/function'
import { Board, Mutation } from '../../interface/types'
import { isValidPlacement } from '../isValidPlacement'
import {
  deselect,
  highlight,
  removeHighlight,
  select,
  valueIs,
} from '../../interface/toolkit'

const highlightIfValueIs = (value: number) =>
  when(valueIs(value), highlight)

const selectIfValidPlacement = (
  board: Board,
  value: number
) => when(isValidPlacement(board)(value), select)

type selectNumber = Mutation<Board, { value: number }>
export const selectNumber: selectNumber = (
  board,
  { value }
) =>
  map(
    flow(
      removeHighlight,
      deselect,
      highlightIfValueIs(value),
      selectIfValidPlacement(board, value)
    )
  )(board)
