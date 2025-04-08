import { elem } from 'fp-ts/Array'
import { fold as bFold } from 'fp-ts/boolean'
import { Eq as nEq } from 'fp-ts/number'
import { fold as oFold, none, Option, some } from 'fp-ts/Option'
import { Predicate } from 'fp-ts/Predicate'
import { Eq as sEq } from 'fp-ts/string'
import {
  clearSelection,
  selectNumber,
  selectAll,
  updateBig,
  updateSmall,
} from '../../actions'
import { Action } from '../../actions/types'
import { cornerLens, middleLens } from '../../interface/optics'
import { equals } from 'fns'
import { Digit, Selection } from '../../interface/types'
import { digits } from '../../interface/toolkit'
import type {CoreEvent} from '../types'

enum Mod {
  CTRL,
  ALT,
  BOTH,
  NONE,
}

type getKeyMod = (ev: KeyboardEvent) => Mod
const getKeyMod: getKeyMod = ({ altKey, ctrlKey }) => {
  if (altKey && ctrlKey) return Mod.BOTH
  if (ctrlKey) return Mod.CTRL
  if (altKey) return Mod.ALT
  return Mod.NONE
}

const isNumericKey: Predicate<string> = (x) =>
  elem(nEq)(+x)(digits)

type Payload = {
  selection: Selection
}

export const keyDownEvent: CoreEvent<KeyboardEvent,Payload> = ({
  event,
  payload: { selection },
}) => {
  const { key, ctrlKey } = event
  const keyIs: Predicate<string> = equals(sEq)(key)

  if (keyIs('F12')) return none

  event.stopPropagation()
  event.preventDefault()

  // key is not numeric
  const onFalse = () => {
    if (keyIs('Enter')) return some([clearSelection])
    if (keyIs('Delete') || keyIs('Backspace'))
      return some([updateBig({ value: 0 })])
    if (ctrlKey && keyIs('a')) return some([selectAll])
    return none
  }

  // key is numeric
  const onTrue = () => {
    const value = +key as Digit
    // selection is none
    const onNone = (): Option<Action[]> => some([selectNumber({ value })])
    // selection is some
    const onSome = (): Option<Action[]> => {
      switch (getKeyMod(event)) {
        case Mod.NONE:
          return some([updateBig({ value })])
        case Mod.CTRL:
          return some([updateSmall({ lens: cornerLens, value })])
        case Mod.ALT:
          return some([updateSmall({ lens: middleLens, value })])
        default:
          return none
      }
    }
    return oFold(onNone, onSome)(selection)
  }

  return bFold(onFalse, onTrue)(isNumericKey(key))
}
