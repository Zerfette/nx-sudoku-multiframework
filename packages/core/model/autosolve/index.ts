import { mapWhen } from 'fns'
import { modifyAt } from 'fp-ts/Array'
import { constant, flow, pipe } from 'fp-ts/function'
import { fold as optFold } from 'fp-ts/Option'
import {
  boardIsValid,
  deselect,
  highlight,
  intersects,
  setValue,
} from '../../interface/toolkit'
import { Board, Mutation } from '../../interface/types'
import { Payload } from './types'

type autosolve = Mutation<Board, Payload>
export const autosolve: autosolve =
  ({ location, value }) =>
  (board) => {
    if (!boardIsValid(board)) return board
    const onNone = constant(board)
    const onSome = mapWhen(intersects(location), deselect)
    return pipe(
      board,
      modifyAt(location.ind, flow(setValue(value), highlight)),
      optFold(onNone, onSome)
    )
  }
