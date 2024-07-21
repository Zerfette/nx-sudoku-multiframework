import { style } from 'core/style'
import { isSolved } from 'core/computed'
import { useStopwatch } from '~/lib/hooks'
import { useStore } from '~/store'
import Autosolve from './Autosolve'
import ColorMode from './ColorMode'
import Edit from './Edit'
import Help from './Help'
import StartOver from './StartOver'
import Timer from './Timer'
import { useEffect } from 'react'

const _ = () => {
  const {state} = useStore()
  const stopwatch = useStopwatch()
  useEffect(stopwatch.startTimer, [])
  useEffect(() => {
    if (!isSolved(state.board)) return
    if (!stopwatch.isRunning) return
    stopwatch.stopTimer()
  }, [state.board, stopwatch.isRunning])
  return (
    <div className={style.menu.root}>
      <Timer stopwatch={stopwatch} />
      <div className={style.menu.btns.root}>
        <StartOver />
        <Edit />
        <Autosolve />
        <ColorMode />
        <Help />
      </div>
    </div>
  )
}

export default _
