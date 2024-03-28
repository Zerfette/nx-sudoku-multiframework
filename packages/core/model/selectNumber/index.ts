import { when } from 'fns'
import { map } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/function'
import {
  boardIsValid,
  highlight,
  select,
  valueIs,
} from '../../interface/toolkit'
import type { Board, Digit, Mutation } from '../../interface/types'
import { isValidPlacement } from '../isValidPlacement'
import { decorateConflicts } from '../decorateConflicts'
import type { Payload } from './types'

const highlightIfValueIs = (value: Digit) =>
  when(valueIs(value), highlight)

const selectIfValidPlacement = (board: Board, value: Digit) =>
  when(isValidPlacement(board)(value), select)

type selectNumber = Mutation<Board, Payload>
export const selectNumber: selectNumber =
  ({ value }) =>
  (board) =>
    boardIsValid(board)
      ? pipe(
          board,
          map(
            flow(
              highlightIfValueIs(value),
              selectIfValidPlacement(board, value)
            )
          )
        )
      : pipe(board, map(highlightIfValueIs(value)), decorateConflicts)
