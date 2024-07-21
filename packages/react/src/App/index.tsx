import { useEffect } from 'react'
import {
  autosolveEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
} from 'core/events/app'
import {
  canAutosolve,
  getHints,
  getSelectedOption,
} from 'core/computed'
import { style } from 'core/style'
import {} from '~/lib/hooks'
import { useEvent } from '~/lib/hooks'
import { useStore } from '~/store'
import Board from './Board'
import Hint from './Hint'
import Menu from './Menu'

const App = () => {
  const { state, dispatchFold } = useStore()
  const { board, selectedNumber, toggles } = state
  const selection = getSelectedOption(board)
  const className = toggles.darkMode
    ? style.root.dark
    : style.root.light
  const onMouseDown = useEvent(mouseDownEvent)({
    selection,
    toggles,
  })
  const onMouseUp = useEvent(mouseUpEvent)({})
  const onKeyDown = useEvent(keyDownEvent)({
    selection,
  })

  useEffect(() => {
    if (!canAutosolve(state)) return
    const payload = {
      hints: getHints(board),
      selectedNumber,
      selection: getSelectedOption(board),
    }
    const event = {}
    dispatchFold(autosolveEvent({ event, payload }))
  })

  return (
    <div
      tabIndex={0}
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    >
      <Menu />
      <Board />
      <Hint />
    </div>
  )
}

export default App
