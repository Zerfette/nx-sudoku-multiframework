import {
  clearSelection,
  selectNumber,
  selectAll,
  setToggle,
  updateBig,
  updateSmall,
} from 'core/actions'
import {
  cornerLens,
  middleLens,
  mouseDownLens,
} from 'core/interface/optics'
import { equals } from 'fns'
import { fold as bFold } from 'fp-ts/boolean'
import { IO } from 'fp-ts/IO'
import { fold as oFold, isNone } from 'fp-ts/Option'
import { Predicate } from 'fp-ts/Predicate'
import { Eq as sEq } from 'fp-ts/string'
import { state, dispatch } from '~/store'
import { Digit } from 'core/interface/types'
import { getKeyMod, isNumericKey, Mod } from '~/lib/hooks/useKeydown'

type setMouseDown = (value: boolean) => void
const setMouseDown: setMouseDown = (value) =>
  dispatch(setToggle({ lens: mouseDownLens, value }))

export const onMouseDown: IO<void> = () => {
  setMouseDown(true)
  if (isNone(state.selection)) return
  if (!state.toggles.mouseOutside) return
  dispatch(clearSelection)
}

export const onMouseUp: IO<void> = () => setMouseDown(false)


export const keyDownCallback = (event: KeyboardEvent): void => {
  const { key, ctrlKey } = event
  const keyIs: Predicate<string> = equals(sEq)(key)
  if (keyIs('F12')) return
  event.stopPropagation()
  event.preventDefault()
  const onFalse = () => {
    if (keyIs('Enter')) dispatch(clearSelection)
    if (keyIs('Delete') || keyIs('Backspace'))
      dispatch(updateBig({ value: 0 }))
    if (ctrlKey && keyIs('a')) dispatch(selectAll)
  }
  const onTrue = () => {
    const value = +key as Digit
    const onNone = () => dispatch(selectNumber({ value }))
    const onSome = () => {
      switch (getKeyMod(event)) {
        case Mod.NONE:
          return dispatch(updateBig({ value }))
        case Mod.CTRL:
          return dispatch(updateSmall({ lens: cornerLens, value }))
        case Mod.ALT:
          return dispatch(updateSmall({ lens: middleLens, value }))
      }
    }
    oFold(onNone, onSome)(state.selection)
  }
  bFold(onFalse, onTrue)(isNumericKey(key))
}
