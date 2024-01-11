import type { Component } from 'solid-js'
import style from 'style'
import Confetti from './confetti'
import Hint from './hint'
import Board from './board'
import Menu from './menu'
import { keyDownCallback, onMouseDown, onMouseUp } from './model'
import { state } from '~/store'
import { useAutosolve, useKeyDown } from '~/lib/hooks'

const App: Component = () => {
  useKeyDown(keyDownCallback)
  useAutosolve()

  return (
    <div
      class={
        state.toggles.darkMode ? style.root.dark : style.root.light
      }
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Confetti />
      <Menu />
      <Board />
      <Hint />
    </div>
  )
}

export default App
