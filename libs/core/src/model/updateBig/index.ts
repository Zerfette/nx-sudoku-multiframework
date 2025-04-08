import { Endomorphism } from 'fp-ts/Endomorphism'
import { pipe } from 'fp-ts/function'
import { mapWhen } from 'fns'
import { isSelected, setValue } from '../../interface/toolkit'
import { Board, Digit, Mutation } from '../../interface/types'
import { decorateConflicts } from '../decorateConflicts'

type fillSelected = (value: Digit) => Endomorphism<Board>
const fillSelected: fillSelected = (value) =>
  mapWhen(isSelected, setValue(value))

type updateBig = Mutation<Board, { value: Digit }>
export const updateBig: updateBig =
  ({ value }) =>
  (board) =>
    pipe(board, fillSelected(value), decorateConflicts)
