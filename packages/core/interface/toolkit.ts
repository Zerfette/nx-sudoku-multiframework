import { anyPass, concat, isTrue, isNonZero, lensEq, when } from 'fns'
import {
  difference,
  elem,
  every,
  filter,
  getMonoid,
  isEmpty,
  map,
  sort,
} from 'fp-ts/Array'
import { Eq as sEq } from 'fp-ts/string'
import { flow, pipe } from 'fp-ts/function'
import { NonEmptyArray, range } from 'fp-ts/NonEmptyArray'
import { Eq as nEq, Ord as nOrd } from 'fp-ts/number'
import { not } from 'fp-ts/Predicate'
import {
  colLens,
  cornerLens,
  decorationLens,
  indLens,
  locationLens,
  editableLens,
  middleLens,
  regLens,
  rowLens,
  valueLens,
} from './optics'
import { Lens } from 'monocle-ts'
import { Cell, Decoration, Digit, Dimension, Editable, Location } from './types'
import { Payload } from '../model/updateSmall/types'

export const digits = range(1, 9) as NonEmptyArray<Digit>

export const regionIndicies = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
]

export const lock = editableLens.set(Editable.LOCKED)
export const unlock = editableLens.set(Editable.UNLOCKED)
export const isUnlocked = lensEq(editableLens, Editable.UNLOCKED)(sEq)
export const isLocked = lensEq(editableLens, Editable.LOCKED)(sEq)

export const setDecoration = decorationLens.set
export const removeDecoration = decorationLens.set(Decoration.NONE)
export const decorationIs = (decoration: Decoration) =>
lensEq(decorationLens, decoration)(sEq)

export const addConflict = setDecoration(Decoration.CONFLICTED)
export const isConflicted = decorationIs(Decoration.CONFLICTED)
export const isNotConflicted = not(isConflicted)
export const removeConflict = when(isConflicted, removeDecoration)

export const highlight = setDecoration(Decoration.HIGHLIGHTED)
export const isHighlighted = decorationIs(Decoration.HIGHLIGHTED)
export const removeHighlight = when(isHighlighted, removeDecoration)

export const select = setDecoration(Decoration.SELECTED)
export const isSelected = decorationIs(Decoration.SELECTED)
export const deselect = when(isSelected, removeDecoration)

export const valueIs = (value: Digit) => lensEq(valueLens, value)(nEq)
export const valueIsNonZero = not(valueIs(0))
export const clearValue = valueLens.set(0)
export const getValue = valueLens.get
export const setValue = valueLens.set

type getDimensionLens = (dimension: Dimension) => Lens<Cell, number>
export const getDimensionLens: getDimensionLens = (dimension) => {
  switch (dimension) {
    case Dimension.COL:
      return locationLens.compose(colLens)
    case Dimension.ROW:
      return locationLens.compose(rowLens)
    case Dimension.REG:
      return locationLens.compose(regLens)
  }
}

export const indIs = (ind: number) =>
lensEq(locationLens.compose(indLens), ind)(nEq)
export const indIsNot = (ind: number) => not(indIs(ind))
export const rowIs = (row: number) =>
lensEq(locationLens.compose(rowLens), row)(nEq)
export const colIs = (col: number) =>
lensEq(locationLens.compose(colLens), col)(nEq)
export const regIs = (reg: number) =>
lensEq(locationLens.compose(regLens), reg)(nEq)
export const intersects = ({ row, col, reg }: Location) =>
anyPass([rowIs(row), colIs(col), regIs(reg)])

const digitMonoid = getMonoid<Digit>()
export const clearSmall = (lens: Lens<Cell, Digit[]>) => lens.set([])
export const clearCorner = clearSmall(cornerLens)
export const clearMiddle = clearSmall(middleLens)
export const isSmall = ({ lens, value }: Payload) =>
flow(lens.get, elem(nEq)(value))
export const addSmall =
({ lens, value }: Payload) =>
(cell: Cell) => {
  const smalls = pipe(
    lens.get(cell),
    concat(digitMonoid)([value]),
    sort(nOrd)
    )
    return lens.set(smalls)(cell)
  }
  export const removeSmall =
  ({ lens, value }: Payload) =>
  (cell: Cell) => {
    const smalls = pipe(
      lens.get(cell),
      difference<Digit>(nEq)([value])
    )
    return lens.set(smalls)(cell)
  }

export const boardIsValid = flow(
  map(isConflicted),
  filter(isTrue),
  isEmpty
)

export const boardIsFilled = flow(
  map(valueLens.get),
  every(isNonZero)
)
