import { ifElse, isZero, mapWhen } from 'fns'
import { Board, Cell, Mutation } from '../../interface/types'
import {
  addSmall,
  clearSmall,
  isSelected,
  isSmall,
  removeSmall,
} from '../../interface/toolkit'
import { Payload } from './types'
import { Endomorphism } from 'fp-ts/lib/Endomorphism'

type modify = (payload: Payload) => Endomorphism<Cell>
const modify: modify = (payload) =>
  ifElse(isSmall(payload), removeSmall(payload), addSmall(payload))

type updateSmall = Mutation<Board, Payload>
export const updateSmall: updateSmall =
  ({ lens, value }) =>
  (board) => {
    const onTrue = clearSmall(lens)
    const onFalse = modify({ lens, value })
    return mapWhen(
      isSelected,
      ifElse(() => isZero(value), onTrue, onFalse)
    )(board)
  }
