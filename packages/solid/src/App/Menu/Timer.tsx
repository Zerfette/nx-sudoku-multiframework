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
