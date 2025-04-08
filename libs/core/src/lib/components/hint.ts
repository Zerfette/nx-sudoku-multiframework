import { isNonEmpty } from 'fp-ts/Array'
import { fold } from 'fp-ts/Option'
import { Digit, Hints, Selection } from '../../interface/types'

type getFallback = (selection: Selection) => string
export const getFallback: getFallback = (selection) => {
  const onNone = () => 'Make a selection to get hints.'
  const onSome = () =>
    'No valid hints. Make a new selection to get hints.'
  return fold(onNone, onSome)(selection)
}

type getHints = (hints: Hints) => Digit[]
export const getHint: getHints = (hints) =>
  isNonEmpty(hints.cell)
    ? hints.cell
    : isNonEmpty(hints.row)
    ? hints.row
    : isNonEmpty(hints.col)
    ? hints.col
    : hints.reg
