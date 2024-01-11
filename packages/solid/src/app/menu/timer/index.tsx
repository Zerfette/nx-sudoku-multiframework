import { Component, Show } from 'solid-js'
import style from 'style'
import {
  FaSolidPlay,
  FaSolidPause,
  FaSolidRotateLeft,
} from 'solid-icons/fa'
import { getTimerText } from 'core/model/stopwatch'
import { Stopwatch } from '~/lib/hooks'

const _: Component<{ stopwatch: Stopwatch }> = ({
  stopwatch: { elapsedTime, resetTimer, toggleTimer, isRunning },
}) => (
  <div class={style.menu.timer.root}>
    <p class={style.menu.timer.txt}>{getTimerText(elapsedTime())}</p>
    <div class={style.menu.timer.btn} onClick={toggleTimer}>
      <Show when={isRunning()} fallback={<FaSolidPlay size={12} />}>
        <FaSolidPause size={12} />
      </Show>
    </div>
    <div class={style.menu.timer.btn} onClick={resetTimer}>
      <FaSolidRotateLeft size={12} />
    </div>
  </div>
)

export default _
