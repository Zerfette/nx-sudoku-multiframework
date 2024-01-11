import { when } from 'fns'
import { map, modifyAt } from 'fp-ts/Array'
import { constant, identity, flow, pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Option'
import { Board, Mutation } from '../../interface/types'
import {
  deselect,
  removeHighlight,
  select,
} from '../../interface/toolkit'

const clearFormatting = (clear: boolean) =>
  map(flow(removeHighlight, when(constant(clear), deselect)))

type selectCell = Mutation<Board, { ind: number; clear: boolean }>
export const selectCell: selectCell = (board, { ind, clear }) =>
  pipe(
    board,
    clearFormatting(clear),
    modifyAt(ind, select),
    fold(constant(board), identity)
  )
