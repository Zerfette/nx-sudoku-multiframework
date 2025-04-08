import { style } from 'core/style'
import { isSolved } from 'core/computed'
import { Stopwatch, useStopwatch } from 'apps/react/lib/hooks'
import { useStore } from 'apps/react/store'
import Autosolve from './Autosolve'
import ColorMode from './ColorMode'
import Edit from './Edit'
import Help from './Help'
import StartOver from './StartOver'
import Timer from './Timer'
import { createContext, useEffect } from 'react'
import { none } from 'fp-ts/lib/Option'

export const Context = createContext<Stopwatch>({
  time: '00:00:00',
  laps: none,
  addLap: () => {},
  resetTimer: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  toggleTimer: () => {},
  isRunning: false,
})

const _ = () => {
  const { state } = useStore()
  const stopwatch = useStopwatch()
  useEffect(stopwatch.startTimer, [])
  useEffect(() => {
    if (!isSolved(state.board)) return
    if (!stopwatch.isRunning) return
    stopwatch.stopTimer()
  }, [state.board, stopwatch.isRunning])
  return (
    <Context.Provider value={stopwatch}>
      <div className={style.menu.root}>
        <Timer />
        <div className={style.menu.btns.root}>
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
