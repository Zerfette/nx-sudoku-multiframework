import { anyPass, lensEq, mapWhen } from 'fns'
import { lookup, modifyAt } from 'fp-ts/Array'
import {
  constant,
  identity,
  flow,
  pipe,
} from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
import { fold as optFold } from 'fp-ts/Option'
import {
  valueLens,
  rowLens,
  colLens,
  regLens,
  selectedLens,
  highlightedLens,
} from '../../interface/optics'
import { Board, Mutation } from '../../interface/types'
import { Payload, Position } from './types'

type getPosition = (board: Board, ind: number) => Position
const getPosition: getPosition = (board, ind) => {
  const onNone = constant({ row: 0, col: 0, reg: 0 })
  const onSome = identity
  return pipe(board, lookup(ind), optFold(onNone, onSome))
}

type autosolve = Mutation<Board, Payload>
export const autosolve: autosolve = (
  board,
  { ind, value }
) => {
  const { row, col, reg } = getPosition(board, ind)

  const modification = flow(
    valueLens.set(value),
    highlightedLens.set(true),
    selectedLens.set(false)
  )

  const intersects = anyPass([
    lensEq(rowLens, row)(nEq),
    lensEq(colLens, col)(nEq),
    lensEq(regLens, reg)(nEq),
  ])
  const onNone = constant(board)
  const onSome = mapWhen(
    intersects,
    selectedLens.set(false)
  )

  return pipe(
    board,
    modifyAt(ind, modification),
    optFold(onNone, onSome)
  )
}
