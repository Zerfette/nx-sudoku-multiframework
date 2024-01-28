import { style } from 'core/style'
import { useStopwatch } from '~/lib/hooks'
import { state } from '~/store'
import Autosolve from './Autosolve'
import ColorMode from './ColorMode'
import Edit from './Edit'
import Help from './Help'
import StartOver from './StartOver'
import Timer from './Timer'
import { createEffect, onMount } from 'solid-js'

const _ = () => {
  const stopwatch = useStopwatch()
  onMount(stopwatch.startTimer)
  createEffect(() => {
    if (!state.isSolved) return
    if (!stopwatch.isRunning()) return
    stopwatch.stopTimer()
  })
  return (
    <div class={style.menu.root}>
      <Timer stopwatch={stopwatch} />
      <div class={style.menu.btns.root}>
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
