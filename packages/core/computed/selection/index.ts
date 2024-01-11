import { filter, isEmpty } from 'fp-ts/Array'
import { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { pipe } from 'fp-ts/function'
import { none, Option, some } from 'fp-ts/Option'
import { Board, Cell } from '../../interface/types'
import { isSelected } from '../../interface/toolkit'

type getSelectedOption = (board: Board) => Option<NonEmptyArray<Cell>>
export const getSelectedOption: getSelectedOption = (board) => {
  const selection = pipe(board, filter(isSelected))
  return isEmpty(selection)
    ? none
    : some(selection as NonEmptyArray<Cell>)
}
