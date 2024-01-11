import { ifElse, isZero, mapWhen } from 'fns'
import {
  difference,
  elem,
  getMonoid,
  sort,
} from 'fp-ts/Array'
import { constant, flow, pipe } from 'fp-ts/function'
import { Eq as nEq, Ord as nOrd } from 'fp-ts/number'
import { Board, Cell, Mutation } from '../../interface/types'
import { clearSmall, isSelected } from '../../interface/toolkit'
import { Payload } from './types'
import { Endomorphism } from 'fp-ts/lib/Endomorphism'

const valueIsZero = flow(isZero, constant)
const { concat } = getMonoid<number>()

type modify = (payload: Payload) => Endomorphism<Cell>
const modify: modify =
  ({ lens, value }) =>
  (cell) => {
    const smalls = lens.get(cell)
    const valueIsElement = elem(nEq)(value)(smalls)
    const addSmall = pipe(
      concat(smalls, [value]),
      sort(nOrd),
      lens.set
    )
    const removeSmall = lens.set(
      difference(nEq)([value])(smalls)
    )
    return valueIsElement
      ? removeSmall(cell)
      : addSmall(cell)
  }

type updateSmall = Mutation<Board, Payload>
export const updateSmall: updateSmall = (
  board,
  { lens, value }
) => {
  const onTrue = clearSmall(lens)
  const onFalse = modify({ lens, value })
  return pipe(
    board,
    mapWhen(
      isSelected,
      ifElse(valueIsZero(value), onTrue, onFalse)
    )
  )
}
