import { mapWhen } from 'fns'
import { Board, Mutation } from '../../interface/types'
import { isSelected, setValue } from '../../interface/toolkit'

type updateBig = Mutation<Board, { value: number }>
export const updateBig: updateBig = (board, { value }) =>
  mapWhen(isSelected, setValue(value))(board)
