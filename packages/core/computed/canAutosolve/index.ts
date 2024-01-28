import { getDimensionLens } from '../../interface/toolkit'
import { State, Cell, Dimension } from '../../interface/types'
import { anyPass, isZero, lengthIs, lensEq } from 'fns'
import { filter, isNonEmpty } from 'fp-ts/Array'
import { constFalse, pipe } from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
import { fold } from 'fp-ts/Option'
import { Predicate } from 'fp-ts/Predicate'
import { getHints } from '../getHints'
import { getSelectedOption } from '../selection'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

type canSolveDimension = (
  dimension: Dimension,
  selection: NonEmptyArray<Cell>
) => Predicate<Cell>
const canSolveDimension: canSolveDimension =
  (dimension, selection) => (cell) => {
    const lens = getDimensionLens(dimension)
    const i = lens.get(cell)
    const intersects = lensEq(lens, i)(nEq)
    return pipe(selection, filter(intersects), lengthIs(1))
  }

type canSolve = (selection: NonEmptyArray<Cell>) => Predicate<Cell>
export const canSolve: canSolve = (selection) =>
  anyPass([
    canSolveDimension(Dimension.ROW, selection),
    canSolveDimension(Dimension.COL, selection),
    canSolveDimension(Dimension.REG, selection),
  ])

export const canAutosolve: Predicate<State> = (state) => {
  if (!state.toggles.autosolve) return false
  const hints = getHints(state.board)
  const selection = getSelectedOption(state.board)
  const onSome = (selection: NonEmptyArray<Cell>) => {
    // when single cell is selected and has a single hint
    if (lengthIs(1)(hints.cell)) return true
    // when multiple cells are selected and a number is not selected
    if (isZero(state.selectedNumber)) return false
    // when multiple cells are selected and a number is selected
    return pipe(selection, filter(canSolve(selection)), isNonEmpty)
  }
  return fold(constFalse, onSome)(selection)
}
