import { mapWhen, when } from 'fns'
import { modifyAt } from 'fp-ts/Array'
import { constant, identity, flow, pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'
import { Board, Mutation } from '../../interface/types'
import {
  deselect,
  isNotConflicted,
  removeHighlight,
  select,
} from '../../interface/toolkit'
import { decorateConflicts } from '../decorateConflicts'

const decorateRest = (clear: boolean) =>
  mapWhen(
    isNotConflicted,
    flow(removeHighlight, when(constant(clear), deselect))
  )

type selectCell = Mutation<Board, { ind: number; clear: boolean }>
export const selectCell: selectCell =
  ({ ind, clear }) =>
  (board) =>
    pipe(
      board,
      decorateConflicts,
      decorateRest(clear),
      modifyAt(ind, select),
      fold(constant(board), identity)
    )
