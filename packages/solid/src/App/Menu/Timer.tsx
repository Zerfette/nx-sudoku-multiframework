import { Component, Show } from 'solid-js'
import {
  FaSolidPlay,
  FaSolidPause,
  FaSolidRotateLeft,
} from 'solid-icons/fa'
import { style } from 'core/style'
import { Stopwatch } from '~/lib/hooks'

const _: Component<{ stopwatch: Stopwatch }> = ({
  stopwatch: { time, resetTimer, toggleTimer, isRunning },
}) => (
  <div class={style.menu.timer.root}>
    <p class={style.menu.timer.txt}>{time()}</p>
    <div class={style.menu.timer.btn} onClick={toggleTimer}>
      <Show when={isRunning()} fallback={<FaSolidPlay size={14} />}>
        <FaSolidPause size={14} />
      </Show>
    </div>
    <div class={style.menu.timer.btn} onClick={resetTimer}>
      <FaSolidRotateLeft size={14} />
    </div>
  </div>
)

export default _
