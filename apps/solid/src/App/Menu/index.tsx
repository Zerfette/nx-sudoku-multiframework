import { style } from 'core/style'
import { Stopwatch, useStopwatch } from 'apps/solid/lib/hooks'
import { state } from 'apps/solid/store'
import Autosolve from './Autosolve'
import ColorMode from './ColorMode'
import Edit from './Edit'
import Help from './Help'
import StartOver from './StartOver'
import Timer from './Timer'
import {
  createContext,
  createEffect,
  onMount,
} from 'solid-js'

export const Context = createContext<Stopwatch>()

const _ = () => {
  const stopwatch = useStopwatch()
  onMount(stopwatch.startTimer)
  createEffect(() => {
    if (!state.isSolved) return
    if (!stopwatch.isRunning()) return
    stopwatch.stopTimer()
  })
  return (
    <Context.Provider value={stopwatch}>
      <div class={style.menu.root}>
        <Timer />
        <div class={style.menu.btns.root}>
          <StartOver />
          <Edit />
          <Autosolve />
          <ColorMode />
          <Help />
        </div>
      </div>
    </Context.Provider>
  )
}

export default _
