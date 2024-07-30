import { style } from 'core/style'
import { elem, isNonEmpty } from 'fp-ts/Array'
import { Eq as nEq } from 'fp-ts/number'
import { StateEvent } from '../store'
import {
  getFallback,
  getHint,
} from 'core/lib/components/hint'
import { getHints, getSelectedOption } from 'core/computed'

export const setupFallback = (element: HTMLDivElement) => {
  element.innerHTML = 'Make a selection to get hints.'
  document.addEventListener('state', (event) => {
    const { board } = (event as StateEvent).detail
    const hints = getHint(getHints(board))
    element.innerHTML = isNonEmpty(hints)
      ? ''
      : getFallback(getSelectedOption(board))
  })
}

export const setupHints = (
  elements: NodeListOf<HTMLDivElement>
) => {
  elements.forEach((element) => {
    const { key } = Object.assign(element.dataset)
    element.innerHTML = key
    const remove = () =>
      element.classList.remove(...element.classList)
    const off = () =>
      element.classList.add(
        ...style.hint.number.off.split(' ')
      )
    const on = () =>
      element.classList.add(
        ...style.hint.number.on.split(' ')
      )
    off()
    document.addEventListener('state', (event) => {
      const { board } = (event as StateEvent).detail
      remove()
      elem(nEq)(+key)(getHint(getHints(board)))
        ? on()
        : off()
    })
  })
}
