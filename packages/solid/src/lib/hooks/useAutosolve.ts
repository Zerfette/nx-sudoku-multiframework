import { createEffect } from 'solid-js'
import { getDimensionLens } from 'core/interface/toolkit'
import { Board, Cell, Digit, Dimension } from 'core/interface/types'
import { anyPass, isZero, lengthIs, lensEq } from 'fns'
import { filter, map } from 'fp-ts/Array'
import { constFalse, constVoid as onNone, flow } from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
import { fold } from 'fp-ts/Option'
import { Predicate } from 'fp-ts/Predicate'
import { state } from '~/store'
import { dispatch } from '~/store'
import { autosolve } from 'core/actions'

type dispatchAutosolve = (value: Digit) => (cell: Cell) => void
export const dispatchAutosolve: dispatchAutosolve =
  (value) =>
  ({ ind }) =>
    dispatch(autosolve({ ind, value }))


type canSolveDimension = (dimension: Dimension) => Predicate<Cell>
const canSolveDimension: canSolveDimension =
  (dimension) => (cell) => {
    const lens = getDimensionLens(dimension)
    const i = lens.get(cell)
    const intersects = lensEq(lens, i)(nEq)
    const onSome = flow(filter(intersects), lengthIs(1))
    return fold(constFalse, onSome)(state.selection)
  }

const canSolve: Predicate<Cell> = anyPass([
  canSolveDimension(Dimension.ROW),
  canSolveDimension(Dimension.COL),
  canSolveDimension(Dimension.REG),
])

export const useAutosolve = (): void => {
  //When number is selected check if any selected cells can autosolve
  createEffect(() => {
    if (!state.toggles.autosolve) return
    if (isZero(state.selectedNumber)) return
    const solve = dispatchAutosolve(state.selectedNumber)
    const onSome: (selection: Board) => void = flow(
      filter(canSolve),
      map(solve)
    )
    fold(onNone, onSome)(state.selection)
  })

  //When there is only one selected try to autosolve
  createEffect(() => {
    if (!state.toggles.autosolve) return
    if (!lengthIs(1)(state.hints.cell)) return
    const onSome = ([cell]: Board) =>
      dispatchAutosolve(state.hints.cell[0])(cell)
    fold(onNone, onSome)(state.selection)
  })
}
