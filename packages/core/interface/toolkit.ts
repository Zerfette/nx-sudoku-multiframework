
import { lensEq } from 'fns'
import { Eq as bEq } from 'fp-ts/boolean'
import { Eq as nEq } from 'fp-ts/number'
import { not } from 'fp-ts/Predicate'
import { colLens, cornerLens, highlightedLens, lockedLens, middleLens, regLens, rowLens, selectedLens, valueLens } from './optics'
import { Lens } from "monocle-ts";
import { Cell, Digit, Dimension, Smalls } from "./types"

type getDimensionLens = (dimension: Dimension) => Lens<Cell, number>
export const getDimensionLens: getDimensionLens = (dimension) => {
  switch (dimension) {
    case Dimension.COL:
      return colLens
    case Dimension.ROW:
      return rowLens
    case Dimension.REG:
      return regLens
  }
}

export const lock = lockedLens.set(true)
export const unlock = lockedLens.set(false)
export const isUnlocked = lensEq(lockedLens, false)(bEq)

export const select = selectedLens.set(true)
export const deselect = selectedLens.set(false)
export const isSelected = lensEq(selectedLens, true)(bEq)

export const highlight = highlightedLens.set(true)
export const removeHighlight = highlightedLens.set(false)
export const isHighlighted = lensEq(highlightedLens, true)(bEq)

export const valueIs = (value: Digit) => lensEq(valueLens, value)(nEq)
export const valueIsNonZero = not(valueIs(0))
export const clearValue = valueLens.set(0)
export const setValue = valueLens.set

export const clearSmall = (lens: Lens<Cell, Smalls>) => lens.set([])
export const clearCorner = clearSmall(cornerLens)
export const clearMiddle = clearSmall(middleLens)