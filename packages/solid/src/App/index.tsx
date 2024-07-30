import { pipe } from 'fp-ts/function'
import { createEffect, type Component } from 'solid-js'
import {
  autosolveEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
} from 'core/events/app'
import { style } from 'core/style'
import { useEvent } from '~/lib/hooks'
import { state, dispatchFold } from '~/store'
import Board from './Board'
import Confetti from './Confetti'
import Hint from './Hint'
import Menu from './Menu'

const App: Component = () => {
  const onMouseDown = (event: MouseEvent) => {
    const payload = {
      selection: state.selection,
      toggles: state.toggles,
    }
    const eventData = { event, payload }
    pipe(eventData, mouseDownEvent, dispatchFold)
  }

  const onMouseUp = useEvent(mouseUpEvent)({})

  const onKeyDown = (event: KeyboardEvent) => {
    const payload = { selection: state.selection }
    const eventData = { event, payload }
    pipe(eventData, keyDownEvent, dispatchFold)
  }

  createEffect(() => {
    if (!state.canAutosolve) return
    const payload = {
      hints: state.hints,
      selectedNumber: state.selectedNumber,
      selection: state.selection,
    }
    const eventData = { event: {}, payload }
    pipe(eventData, autosolveEvent, dispatchFold)
  })

  return (
    <div
      class={
        state.toggles.darkMode
          ? style.root.dark
          : style.root.light
      }
      tabIndex={0}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    >
      <Confetti />
      <Menu />
      <Board />
      <Hint />
    </div>
  )
}

export default App
