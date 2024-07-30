import {
  canAutosolve,
  getHints,
  getSelectedOption,
} from 'core/computed'
import {
  autosolveEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
} from 'core/events/app'
import {
  digits,
  regionIndicies,
} from 'core/interface/toolkit.ts'

import { style } from 'core/style'
import { map } from 'fp-ts/lib/Array'

import { StateEvent, state, useEvent } from '../store.ts'
import { Digit } from 'core/interface/types.ts'

const toCell = (index: number) =>
  `<div class="cell" data-key="${index}"></div>`

const toRegion = (region: number[]) => `
    <div class="${style.board.region}">
      ${map(toCell)(region).join('\n')}
    </div>
  `
const toDigit = (digit: Digit) =>
  `<div class="hintDigit" data-key="${digit}"></div>`

export const setupApp = (element: HTMLDivElement) => {
  let className = style.root.dark
  document.addEventListener('state', (event) => {
    const { toggles } = (event as StateEvent).detail
    toggles.darkMode
      ? (className = style.root.dark)
      : (className = style.root.light)
    element.classList.remove(...element.classList)
    element.classList.add(...className.split(' '))
  })
  element.classList.add(...className.split(' '))
  element.innerHTML = `
    <div id="canvas" class="${style.menu.confetti}"></div>
    <div class="${style.menu.root}">
      <div id="timer" class="${style.menu.timer.root}">
        <p id="stopwatchText" class="${
          style.menu.timer.txt
        }"></p>
        <div id="stopwatchToggle" class="${
          style.menu.timer.btn
        }"></div>
        <div id="stopwatchReset" class="${
          style.menu.timer.btn
        }"></div>
      </div>
      <div class=${style.menu.btns.root}>
        <div id="startOver"></div>
        <div id="edit"></div>
        <div id="autosolve"></div>
        <div id="colorMode"></div>
        <div id="help"></div>
      </div>
    </div>
    <div class="${style.board.root}" id="board">
      ${map(toRegion)(regionIndicies).join('\n')}
    </div>
    <div class="${style.hint.root}">
    <div class="${style.hint.numbers}">
      ${map(toDigit)(digits).join('\n')}
    </div>
    <div id="hintFallback" class="${style.hint.fallback}"></div>
    </div>
`
  const onMouseDown = useEvent(mouseDownEvent)

  const payload = {
    selection: getSelectedOption(state.board),
    toggles: state.toggles,
  }
  element.addEventListener(
    'mousedown',
    onMouseDown(payload)
  )

  const onMouseUp = useEvent(mouseUpEvent)
  element.addEventListener('mouseup', onMouseUp({}))

  const onKeyDown = useEvent(keyDownEvent)
  document.addEventListener('keydown', onKeyDown(payload))

  document.addEventListener('state', (event) => {
    const state = (event as StateEvent).detail
    const { board, selectedNumber, toggles } = state
    payload.selection = getSelectedOption(board)
    payload.toggles = toggles
    if (canAutosolve(state))
      useEvent(autosolveEvent)({
        hints: getHints(board),
        selectedNumber,
        selection: getSelectedOption(board),
      })({})
  })
}
