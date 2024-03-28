
import {
  arrayOptionMonoid,
  getPrevTotal,
  getTimerText,
  Laps,
} from 'core/lib/hooks/stopwatch'
import { IO } from 'fp-ts/IO'
import { fold as oFold, none, some } from 'fp-ts/Option'
import { computed, onUnmounted, ref, type Ref } from 'vue'

export type Stopwatch = {
  time: Ref<string>
  laps: Ref<Laps>
  addLap: IO<void>
  resetTimer: IO<void>
  startTimer: IO<void>
  stopTimer: IO<void>
  toggleTimer: IO<void>
  isRunning: Ref<boolean>
}

export const useStopwatch: IO<Stopwatch> = () => {
  const laps = ref<Laps>(none)
  const isRunning = ref(false)
  const elapsedTime = ref(0)
  const increment = () => {
    elapsedTime.value = elapsedTime.value + 0.1
  }

  let interval: NodeJS.Timeout
  // onUnmounted(() => clearInterval(interval))

  const resetTimer = () => {
    isRunning.value = false
    elapsedTime.value = 0
    laps.value = none
    clearInterval(interval)
  }

  const addLap = () => {
    if (!isRunning.value) return
    const onNone = () => elapsedTime.value
    const onSome = () => elapsedTime.value - getPrevTotal(laps.value)
    const currentLap = oFold(onNone, onSome)(laps.value)
    laps.value = arrayOptionMonoid.concat(
      laps.value,
      some([currentLap])
    )
  }

  const time = computed(() =>
    getTimerText(+elapsedTime.value.toFixed(1))
  )

  const startTimer = () => {
    isRunning.value = true
    interval = setInterval(increment, 100)
  }

  const stopTimer = () => {
    isRunning.value = false
    clearInterval(interval)
  }

  const toggleTimer = () =>
    isRunning.value ? stopTimer() : startTimer()

  return {
    time,
    laps,
    addLap,
    resetTimer,
    startTimer,
    stopTimer,
    toggleTimer,
    isRunning,
  }
}
